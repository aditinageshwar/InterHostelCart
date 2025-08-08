require('dotenv').config();

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');

const cors = require('cors');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const chatRoutes = require('./routes/chatRoutes');
const auctionRoutes = require('./routes/auctionRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

// Ensure 'uploads' folder exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/uploads', express.static(uploadsDir));

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/user', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api', uploadRoutes);
app.use('/api/auctions', auctionRoutes(io)); 

app.get('/', (req, res) => {
  res.send('From backend');
});

const userSocketMap = {};

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('registerUser', (userId) => {
    userSocketMap[userId] = socket.id;
    socket.userId = userId;
  });

  socket.on('chatRequest', ({ itemNO, senderId, receiverId}) => {
    const receiverSocketId = userSocketMap[receiverId];
    io.to(receiverSocketId).emit('incomingChatRequest', {itemNO, senderId, receiverId, message: 'Someone wants to chat with you!'});
  });

  socket.on('joinRoom', (room) => {
    socket.join(room);
  });

  socket.on('sendMessage', (newMessage) => {
    socket.to(newMessage.room).emit('receiveMessage', newMessage);
  });
  
  socket.on('auctionEnded', ({ winnerId, bidAmount }) => {
    const receiverSocketId = userSocketMap[winnerId];
    io.to(receiverSocketId).emit('auctionWin', {bidAmount, message: `🎉 Congratulations! You won the auction with a bid of ₹${bidAmount}`});
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = io; 