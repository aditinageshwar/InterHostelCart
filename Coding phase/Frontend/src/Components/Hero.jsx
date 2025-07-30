import React, { useEffect, useRef, useState } from 'react';
import Carousel from "./Carousel";
import { gsap } from "gsap";
import { getItems } from '../api';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';

const Hero = () => {
  const textRef = useRef(null);
  const searchRef = useRef(null);
  const placeholderRef = useRef(null);
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [userid, setUserid] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const timeout = setTimeout(() => {
    if (!textRef.current) return;
    const letters = textRef.current.querySelectorAll(".letter");

    gsap.fromTo(
      letters,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "power2.out"
      }
    );
  }, 0); 
  return () => clearTimeout(timeout);
}, []);

  // Fetch user profile
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
            authorization: `Bearer ${token}`
          }
        });
        setUserid(response.data.user.userid);
      } catch (error) {
        console.error('Error fetching user:', error);
        setError('Failed to fetch user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Fetch all items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getItems();
        console.log("Fetched items:", data);

        setItems(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching items:', error);
        setError('Failed to fetch items');
      }
    };

    fetchItems();
  }, []);

  // Animate search and placeholder text
  useEffect(() => {
    if (!searchRef.current || !placeholderRef.current) return;

    gsap.fromTo(
      searchRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 3, ease: "back.out(1.7)" }
    );

    const letters = placeholderRef.current.querySelectorAll(".letter");
    gsap.fromTo(
      letters,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.05,
        ease: "power2.out",
      }
    );
  }, []);

  // Filter items based on search and user
  const filteredItems = Array.isArray(items)
    ? items.filter(item =>
        item.itemname?.toLowerCase().includes(searchQuery.toLowerCase()) &&
        item.sellerid !== userid
      )
    : [];

  const handleDivClick = (itemid) => {
    navigate(`/item/${itemid}`);
  };

  return (
    <div>
      {/* Always show Hero section */}
      <div className="w-11/12 xl:w-4/5 h-[350px] m-auto mt-8 bg-stone-200 rounded-xl">
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-11/12 xl:w-1/2 p-5 space-y-5">
            <h1 className="text-5xl font-semibold">
              <span ref={textRef} className="inline-block">
                {"Find the Perfect Product Online".split("").map((letter, index) => (
                  <span key={index} className="letter inline-block">
                    {letter === " " ? "\u00A0" : letter}
                  </span>
                ))}
              </span>
            </h1>
            <div className="mb-4">
              <h1 className="text-4xl font-bold text-red-500 mb-2">
                <span ref={placeholderRef} className="inline-block">
                  {"Search...".split("").map((letter, index) => (
                    <span key={index} className="letter inline-block">
                      {letter === " " ? "\u00A0" : letter}
                    </span>
                  ))}
                </span>
              </h1>
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type your search here..."
                className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
            </div>
          </div>
          <Carousel />
        </div>
      </div>

      {/* Conditional Product Section */}
      <div className="w-5/6 m-auto space-y-10 mt-12">
        <h1 className="text-2xl font-semibold text-center">Products</h1>
        {loading ? (
          <div className="text-center py-10 text-gray-500">Loading...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-500 font-semibold">{error}</div>
        ) : (
          <div className="products grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 content-center bg-gray-100 p-8 rounded-2xl shadow-lg">
            {filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <div
                  key={item.itemno}
                  className="product h-[350px] space-y-2 cursor-pointer rounded-xl shadow-2xl p-4 overflow-hidden transform transition duration-500 hover:scale-105"
                  onClick={() => handleDivClick(item.itemno)}
                >
                  <img
                    className="w-full h-4/5 object-cover"
                    loading="lazy"
                    src={item.itemphotourl}
                    alt={item.itemname}
                  />
                  <p className="font-semibold text-gray-600">{item.itemname}</p>
                  <h1 className="text-xl font-semibold">₹{item.itemprice}</h1>
                </div>
              ))
            ) : (
              <h1 className="text-2xl font-semibold text-center">No Products Found</h1>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;