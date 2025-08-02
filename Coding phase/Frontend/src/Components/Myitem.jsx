import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Myitem = () => {
  const [items, setItems] = useState([]);
  const [userid, setUserid] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = Cookies.get('token');
      if (!token) {
        setError('Please sign in to view your added items');
        setLoading(false);
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
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    if (userid) {
      fetchItems();
    }
  }, [userid]);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/items');
      const allItems = response.data || [];
      const myItems = allItems.filter(item => item.sellerId === userid);
      setItems(myItems);
      setLoading(false);
    } 
    catch (error) {
      console.error('Error fetching items:', error);
      setError('Failed to fetch items');
      setLoading(false);
    }
  };

  const remove = async (itemNO) => {
    try {
      await axios.put(`http://localhost:3001/api/items/item/${itemNO}`);
      fetchItems();
    } 
    catch (error) {
      console.error('Error removing item:', error);
      setError('Failed to remove item');
    }
  };

  const goToAuction = (itemNO) => {
    navigate('/auction', { state: { itemNO } });
  };

  if (loading) {
    return <div className="text-center mt-20 mb-40 text-xl text-semibold text-emerald-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-20 mb-40 text-xl text-semibold text-red-400">{error}</div>;
  }

  if (items.length === 0) {
    return <div className="text-center mt-20 mb-40 text-xl text-semibold text-emerald-500">No Items</div>;
  }

  return (
  <div className="space-y-6 mt-6">
    <h2 className="text-2xl text-center font-bold bg-[url('https://tse2.mm.bing.net/th/id/OIP.lu34wOfmqsZNgVqOPIYrJAHaFS?pid=Api&P=0&h=180')] bg-clip-text text-transparent mb-4">Your Sale Listings</h2>
    <ul>
      {items.map((item) => (
        <li key={item.itemNO} className="grid grid-cols-1 md:grid-cols-5 gap-10 items-center border-b py-4 bg-stone-50 rounded-lg px-4 mb-2"
          style={{ boxShadow: '0 4px 6px -1px shadow-gray-500/70' }}
        >
          <img
            className="ml-4 w-[300px] h-auto max-h-[150px] object-cover rounded-md"
            src={item.itemPhotoURL}
            alt={item.itemName}
          />
          <div className="flex flex-col space-y-1">
            <p className="text-lg font-semibold text-gray-800">{item.itemName}</p>
            <p className="text-sm text-gray-600">{item.itemDescription}</p>
          </div>
          <div className="flex flex-col space-y-1 px-10">
            <p className="text-sm text-gray-500">MRP:</p>
            <p className="text-lg font-bold text-gray-700">₹{item.itemPrice}</p>
          </div>
          <div className="flex flex-col space-y-1">
            <p className="text-sm text-gray-500">Listing Date:</p>
            <p className="text-lg font-bold text-gray-700"> {item.listingDate.slice(0, 10)} </p>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0">
            <button
              onClick={() => remove(item.itemNO)}
              className="px-4 py-2 bg-rose-500 text-white rounded-md hover:bg-rose-600"
            >
              Remove
            </button>
            <button
              onClick={() => goToAuction(item.itemNO)}
              className="px-4 py-2 bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-400 hover:from-sky-600 hover:via-cyan-500 hover:to-teal-500 shadow-lg text-white rounded-md"
            >
              Go for Auction
            </button>
          </div>
        </li>
      ))}
    </ul>
  </div>
)};

export default Myitem;