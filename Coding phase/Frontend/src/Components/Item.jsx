import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faFlag } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { socket } from './Socket';

const Item = () => {
  let navigate = useNavigate();
  const [item, setItem] = useState({});
  const [userid, setUserid] = useState('');
  const { itemNO } = useParams();
  const token = Cookies.get('token');

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setError('Please sign in to report item or add to cart');
        return;
      }

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
        setError('Failed to fetch user profile');
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchItem = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/items/item/${itemNO}`);
      setItem(response.data[0]);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
   };
    fetchItem();
  }, [itemNO]);

  const handleChatClick = () => {
    alert('Chat with user say: Hii');
    socket.emit('chatRequest', {itemNO: itemNO, senderId: userid, receiverId: item.userID });
    navigate('/chat', {state: { itemNO: itemNO, senderId: userid, receiverId: item.userID }});
  };

  const handleReportClick = async () => { 
    try {
      const response = await axios.post('http://localhost:3001/api/items/report', { itemNO: item.itemNO },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message);
    } catch (error) {
      console.error('Error reporting item:', error);
      alert('Failed to report item');
    }
  };

  const handleAddToCart = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/cart/add', { itemNO: item.itemNO, userID: userid },
        {
          headers: {Authorization: `Bearer ${token}`},
        }
      );
      alert(response.data.message);
    } catch (error) {
      console.error('Error adding item to cart:', error);
      alert('Failed to add item to cart');
    }
  };

    return (
      <div className="container mx-12 px-1 py-12">
        <div className="flex flex-wrap -mx-4">
          <div className="md:w-1/3 mb-8">
            <img
              src={item.itemPhotoURL}
              alt="Product"
              className="w-[70%] h-[70%] rounded-lg shadow-lg ml-24 mt-4"
              id="mainImage"
            />
          </div>

          <div className="w-full md:w-1/2 px-14">
            <h2 className="text-2xl font-semibold text-gray-700">{item.itemName}</h2>
            <p className="text-gray-700 mb-2"> {item.itemDescription}</p>
            <p className="text-xl font-semibold text-gray-700"> MRP: ₹ {item.itemPrice}</p>
            <p className="text-md font-semibold text-gray-700">Listing Date: {new Date(item.listingDate).toLocaleDateString("en-CA")}</p>
           
            <div className="flex space-x-4 mb-6">
              <button
                className="flex gap-2 items-center text-white mt-4 px-6 py-2 rounded-md bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-400 hover:from-sky-600 hover:via-cyan-500 hover:to-teal-500 shadow-lg"
                onClick={handleAddToCart}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                 <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                 />
                </svg>
                Add to Cart
              </button>
            </div>

            {/* Seller Details Section */}
            <div className="pt-1">
              <p className="underline text-2xl text-bold text-cyan-800">Seller Details</p>
              <p className="text-xl font-semibold text-gray-700 mt-2">{item.userName}</p>
              <p className="text-gray-700">
                <span className="font-semibold">Mobile No: </span> 
                {item.userPhoneNo}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Hostel No: </span> 
                {item.hostelNo}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Room No: </span> 
                {item.roomNo}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Dept: </span> 
                {item.userDept}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Course: </span> 
                {item.userCourse}
              </p>

              <div className="mt-4 flex space-x-4">
                <button
                  onClick={handleChatClick}
                  className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                >
                  <FontAwesomeIcon icon={faComments} className="mr-2" />
                  Chat
                </button>
                <button
                  onClick={handleReportClick}
                  className="flex items-center px-3 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700"
                >
                  <FontAwesomeIcon icon={faFlag} className="mr-2" />
                  Report
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  };

export default Item;