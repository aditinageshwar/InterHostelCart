import React, { useState, useEffect } from 'react';
import { FaCamera } from 'react-icons/fa';
import axios from 'axios';
import Cookies from 'js-cookie';

const Profile = () => {
  let base = 'https://tse2.mm.bing.net/th/id/OIP.b-VXMyLRKFeTc9B0RNFAXwHaHa?pid=Api&P=0&h=180';
  const [profileImage, setProfileImage] = useState(base);
  const [email, setEmail] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [hostelNumber, setHostelNumber] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try 
      {
        const token = Cookies.get('token');
        const response = await axios.get('http://localhost:3001/api/user/profile', {
          headers: {
            authorization: `Bearer ${token}`
          }
        });
        
        const { user } = response.data;
        setEmail(user.emailID);
        setHostelNumber(user.hostelNo);
        setRoomNumber(user.roomNo);
        setMobileNumber(user.userPhoneNo);
        setProfileImage(user.profileImage || base);
      } 
      catch (error) {
        setError('Failed to fetch profile data');
      }
    };

    fetchProfile();
  }, []);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) 
    {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setProfileImage(reader.result);
        try 
        {
          const token = Cookies.get('token');
          await axios.post('http://localhost:3001/api/user/profile/image', { image: reader.result }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          alert('Profile Image updated successfully');
        } 
        catch (error) {
          setError('Failed to upload profile image');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    try 
    {
      const token = Cookies.get('token');
      await axios.put('http://localhost:3001/api/user/profile', {mobileNumber, hostelNumber, roomNumber}, 
        {
        headers: {Authorization: `Bearer ${token}`}
        });
      alert('Profile updated successfully');
    } 
    catch (error) {
      setError('Failed to save profile changes');
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg shadow-gray-500/70 max-w-lg mx-auto mt-10 mb-10">
      <h2 className="text-3xl font-semibold mb-6 text-center bg-[url('https://tse2.mm.bing.net/th/id/OIP.lu34wOfmqsZNgVqOPIYrJAHaFS?pid=Api&P=0&h=180')] bg-clip-text text-transparent">Profile</h2>
      <div className="flex flex-col items-center mb-6">
        <div className="relative mb-4">
          <img
            src={profileImage}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-sky-600"
          />
          <label className="absolute bottom-0 right-0 bg-sky-600 text-white p-2 rounded-full cursor-pointer flex items-center justify-center">
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            <FaCamera size={20} />
          </label>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          value={email}
          className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          readOnly
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Hostel Number</label>
        <input
          type="text"
          value={hostelNumber}
          onChange={(e) => setHostelNumber(e.target.value)}
          className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Room Number</label>
        <input
          type="text"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
          className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Mobile Number</label>
        <input
          type="text"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button onClick={handleSaveChanges} className="bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-400 hover:from-sky-600 hover:via-cyan-500 hover:to-teal-500 shadow-lg text-white px-6 py-2 rounded-lg font-semibold w-full">Save Changes</button>
    </div>
  );
};

export default Profile;