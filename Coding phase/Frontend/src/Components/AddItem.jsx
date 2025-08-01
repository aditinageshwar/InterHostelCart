import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { storage } from '../Firebase/setup'; 
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Cookies from 'js-cookie';

const AddItem = () => {
  const [userid, setUserid] = useState('');
  const [formData, setFormData] = useState({
    sellerID: '', 
    itemName: '',
    itemPrice: '',
    itemDescription: '',
    itemTags: '',
    listingDate: new Date().toISOString().split('T')[0], 
    itemPhotoURL: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = Cookies.get('token');
      if (!token) {
        setError('Please sign in to add your item for selling');
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
        setFormData((prevData) => ({
          ...prevData,
          sellerID: response.data.user.userID
        }));
      } 
      catch (error) {
        console.error('Error fetching user:', error);
        setError('Failed to fetch user profile');
      }
      finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      itemPhotoURL: e.target.files[0],
    }));
  };

  const handleAddItem = async () => {
    const { sellerID, itemName, itemPrice, itemDescription, itemTags, listingDate, itemPhotoURL, gender } = formData;
    
    if (!itemName || !itemPrice || !itemDescription || !itemTags || !itemPhotoURL || !gender) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try 
    {
      const imageData = new FormData();
      imageData.append('itemPhotoURL', itemPhotoURL);
      const res = await axios.post("http://localhost:3001/api/uploadImage", imageData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const normalizedPath = res.data.path.replace(/\\/g, '/');           //replace backslashes with forward slashes
      const imageUrl = `http://localhost:3001/${normalizedPath}`;

      // const storageRef = ref(storage, `images/${itemPhotoURL.name}`);
      // console.log("storageRef: ", storageRef);
      // await uploadBytes(storageRef, itemPhotoURL);
      // console.log("Image uploaded. Fetching URL...");

      // const imageUrl = await getDownloadURL(storageRef);
      // console.log("Image URL received:", imageUrl);

     
      const urlEncodedData = new URLSearchParams();
      urlEncodedData.append('sellerID', sellerID);
      urlEncodedData.append('itemName', itemName);
      urlEncodedData.append('itemPrice', itemPrice);
      urlEncodedData.append('itemDescription', itemDescription);
      urlEncodedData.append('itemTags', itemTags);
      urlEncodedData.append('gender', gender);
      urlEncodedData.append('listingDate', listingDate);
      urlEncodedData.append('itemPhotoURL', imageUrl);

      const response = await axios.post('http://localhost:3001/api/items', urlEncodedData, {
       headers: {'Content-Type': 'application/x-www-form-urlencoded'},
     });

      setSuccess('Item added successfully');
      setFormData({
        sellerID: userid,
        itemName: '',
        itemPrice: '',
        itemDescription: '',
        itemTags: '',
        gender: '',
        listingDate: new Date().toISOString().split('T')[0],
        itemPhotoURL: ''
      });
    } 
    catch (err) {
      setError('Failed to add item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4 bg-[url('https://tse2.mm.bing.net/th/id/OIP.lu34wOfmqsZNgVqOPIYrJAHaFS?pid=Api&P=0&h=180')] bg-clip-text text-transparent">
        Add Item for Selling
      </h2>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      {success && <div className="mb-4 text-green-500">{success}</div>}
      <div className="mb-4">
        <label className="block text-sm text-gray-800">Item Name</label>
        <input
          type="text"
          name="itemName"
          value={formData.itemName}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm text-gray-800">Item Price</label>
        <input
          type="number"
          name="itemPrice"
          value={formData.itemPrice}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm text-gray-800">Item Description</label>
        <textarea
          cols = "3"
          name="itemDescription"
          value={formData.itemDescription}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm text-gray-800">Item Tags</label>
        <select
          id="options"
          name="itemTags"
          value={formData.itemTags}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="">Select a tag</option>
          <option value="Electronics">Electronics</option>
          <option value="Stationary">Stationary</option>
          <option value="Vehicle">Vehicle</option>
          <option value="Sport">Sport</option>
          <option value="Medicine">Medicine</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm text-gray-800">Item Photo</label>
        <input
          type="file"
          name="itemPhotoURL"
          onChange={handleImageChange}
          className="w-full ml-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm text-gray-800">Item recommended for</label>
        <select
          id="options2"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="">Select a gender</option>
          <option value="he">Men</option>
          <option value="she">Women</option>
          <option value="heshe">Both</option>
        </select>
      </div>  
      <div className="mb-4">
        <label className="block text-sm text-gray-800">Listing Date</label>
        <input
          type="text"
          name="listingDate"
          value={formData.listingDate}
          readOnly
          className="w-full px-4 py-2 border rounded-lg bg-gray-100"
        />
      </div>
      <button
        onClick={handleAddItem}
        className="bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-400 hover:from-sky-600 hover:via-cyan-500 hover:to-teal-500 shadow-lg 
                  text-white px-4 py-2 rounded-lg w-[150px]"
        disabled={loading}
      >
        {loading ? 'Adding...' : 'Add Item'}
      </button>
    </div>
  );
};

export default AddItem;