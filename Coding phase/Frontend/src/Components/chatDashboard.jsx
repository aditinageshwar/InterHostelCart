import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const ChatDashboard = () =>
{
  const token = Cookies.get('token');
  const [userid, setUserid] = useState('');  
  const [rooms, setRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);
  const [messagesdetail, setMessagesDetail] = useState([]);
  const [otheruser, setOtherUser] = useState({});
  
   useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserid(response.data.user.userID);
      } 
      catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/chat/roomno/${userid}`);
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchRooms(); 
  }, [userid]);
  
  useEffect(() => {
    if(!activeRoom) 
      return;

    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/chat/message/${activeRoom}`);
        setMessagesDetail(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    const fetchName = async () => {
      try {
        const [itemNO, senderId, receiverId] = activeRoom.split('_');
        const otherUserId = userid === senderId ? receiverId : senderId;
        const response = await axios.get(`http://localhost:3001/api/user/username/${otherUserId}`);
        setOtherUser(response.data.user);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
    fetchName();
  }, [activeRoom, userid]);

   
  return (
    <div className="flex h-screen mb-10 border-gray-200 shadow-lg">
      {/* Room List */}
      <div className="w-1/3 border-r border-gray-300 overflow-y-auto bg-stone-100">
        <h3 className="p-4 border-b border-gray-200 text-2xl font-bold bg-[url('https://tse2.mm.bing.net/th/id/OIP.lu34wOfmqsZNgVqOPIYrJAHaFS?pid=Api&P=0&h=180')] bg-clip-text text-transparent">
          Chat Rooms
        </h3>
        {rooms.map(room => (
         <div key={room.room}
           onClick={() => setActiveRoom(room.room)}
           className={`p-4 cursor-pointer border-b border-gray-100 transition-colors ${activeRoom === room.room ? 'bg-indigo-50' : ''}`}
         >
           <strong className="block text-gray-700">Room No: {room.room}</strong>
         </div>
        ))}
      </div>

      {/* Chat Window */}
      <div className="flex-1 p-3 overflow-y-auto">
       {activeRoom ? (
        <div>
          <div className='bg-teal-300 py-5 mb-5 text-center'>
            <h3 className="text-lg text-gray-700 font-semibold"> Chat with <span className="text-indigo-500"> {otheruser.userName} </span></h3>
            <p className="text-sm text-gray-600 font-semibold"> {otheruser.userPhoneNo} | {otheruser.userDept} | {otheruser.userCourse} </p>
          </div>
          <div>
           {messagesdetail.map(msg => (
            <div key={msg.messageID} className={`mb-4 ${msg.senderId === userid ? 'text-right' : 'text-left'}`}>
              <div
                className={`inline-block text-md px-2 py-1 rounded-md max-w-[50%] break-words ${
                  msg.senderId === userid ? 'bg-teal-500 text-white' : 'bg-indigo-100 text-gray-600'
                }`}
              >
                {msg.messageContent}
              </div>
              <div className="text-xs text-gray-400">
                {new Date(msg.messageTime).toLocaleTimeString()}
              </div>
            </div>
            ))}
          </div>
        </div>
       ) : (
        <p className="text-lg text-gray-700">Select a room to start chatting..</p>
      )}
     </div>
    </div>
  );
};

export default ChatDashboard;
