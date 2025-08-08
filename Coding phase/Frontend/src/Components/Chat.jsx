import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import EmojiPicker from 'emoji-picker-react';
import axios from 'axios';
import { socket } from './Socket';

const Chat = () => {
  const location = useLocation();
  const { itemNO, senderId, receiverId } = location.state || {};
  
  const sortedIds = [senderId, receiverId].sort(); 
  const room = `${itemNO}_${sortedIds[0]}_${sortedIds[1]}`;

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiRef = useRef(null);

  useEffect(() => {
    socket.emit('joinRoom', room);
    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/chat/message/${room}`);
        setMessages(response.data.messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
    return () => {
      socket.off('receiveMessage');
    };
  }, [room]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const handleSendMessage = () => {
    const newMessage = {
      room,
      messageContent: message,
      itemNO : itemNO,
      senderId: senderId,
      receiverId: receiverId,
    };
    socket.emit('sendMessage', newMessage);
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage('');
    setShowEmojiPicker(false);

    axios.post('http://localhost:3001/api/chat', newMessage)
      .catch(error => console.error('Error saving message:', error));
  };

  const handleEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  return (
   <div className="flex items-center justify-center min-h-screen">
    <div className="w-1/3 h-[600px] shadow-2xl rounded-lg flex flex-col border border-gray-300">
      <div className="bg-teal-600 text-white px-4 py-3 rounded-t-lg">
        <h2 className="text-lg font-semibold">Chat Room : {room}</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 bg-stone-100">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`max-w-[45%] px-2 py-1 rounded-md text-md ${
            msg.senderId === senderId
              ? "bg-teal-500 text-white self-end ml-auto"
              : "bg-indigo-100 text-gray-600 self-start mr-auto"
          }`}
        >
          <span>{msg.messageContent}</span>
        </div>
      ))}
      </div>

      <div className="flex items-center px-3 py-3 bg-stone-100 border-t rounded-b-lg relative">
        <div className="relative w-full">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message ...."
            className="w-full px-3 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            className="absolute right-3 top-4 transform -translate-y-1/2 text-xl"
          >
            😊
          </button>
          {showEmojiPicker && (
            <div ref={emojiRef} className="absolute bottom-[80px] z-10">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>

        <button
          onClick={handleSendMessage}
          className="ml-2 px-3 py-2 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition text-sm"
        >
          Send
        </button>
      </div>
    </div>
  </div>
  );
};

export default Chat;