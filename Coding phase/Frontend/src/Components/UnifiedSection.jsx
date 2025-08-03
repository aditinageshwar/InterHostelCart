import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UnifiedSection = ({ gender, hostelNo, tag }) => {
  const [items, setItems] = useState([]);
  const [sectionTitle, setSectionTitle] = useState("");

  const navigate = useNavigate();
  const handleDivClick = (itemid) => {
    navigate(`/item/${itemid}`); 
  };

  useEffect(() => {
    const fetchItems = async () => {
      try 
      {
        let endpoints = [];
        if(gender) {
          try {
            if (gender === "male") {
              endpoints.push("http://localhost:3001/api/items/gender/he");
              endpoints.push("http://localhost:3001/api/items/gender/heshe");
            } 
            else {
              endpoints.push("http://localhost:3001/api/items/gender/she");
              endpoints.push("http://localhost:3001/api/items/gender/heshe");
            }
            const responses = await Promise.all(endpoints.map(url => axios.get(url)));
            const allItems = responses.flatMap(res => res.data);
            setItems(allItems);

            setSectionTitle(gender === "male" ? "Items for Men" : "Items for Women");
          } 
          catch (error) {
            console.error("Error fetching items:", error);
          }
        } 
        else if(hostelNo)
        {
          let endpoint = "";
          try {
            endpoint = `http://localhost:3001/api/items/hostel/${hostelNo}`;
            const response = await axios.get(endpoint);
            setItems(response.data);
            setSectionTitle(`Items of Hostel No: ${hostelNo}`);
          } 
          catch (error) {
             console.error("Error fetching items:", error);
          }
        } 
        else 
        {
          let endpoint = "";
          try {
            const validTags = ["electronics", "accessories", "stationary", "vehicle", "sport", "medicine"];
            if (validTags.includes(tag)) {
              endpoint = `http://localhost:3001/api/items/${tag}`;
              const response = await axios.get(endpoint);
              setItems(response.data);
              
              const formattedTag = tag.charAt(0).toUpperCase() + tag.slice(1);
              setSectionTitle(`${formattedTag} Items`);
            }
          } 
          catch (error) {
            console.error("Error fetching items:", error);
          }
        }
      } 
      catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, [gender, hostelNo, tag]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-12 bg-[url('https://tse2.mm.bing.net/th/id/OIP.lu34wOfmqsZNgVqOPIYrJAHaFS?pid=Api&P=0&h=180')] bg-clip-text text-transparent">
        {sectionTitle}
      </h1>
      {items.length === 0 ? (
        <p className="text-center text-gray-600">No items for sale</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {items.map((item) => (
            <div
              key={item.itemNO}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105 max-h-[500px]"
              onClick={() => handleDivClick(item.itemNO)}
            >
              <img
                src={item.itemPhotoURL}
                alt={item.itemName}
                className="w-full h-56 object-cover"
              />

              <div className="p-3 h-[42%]">
                <h2 className="text-2xl font-semibold mb-2 text-gray-800">{item.itemName}</h2>
                <p className="text-gray-600 mb-2">{item.itemDescription}</p>
                <p className="text-gray-600 mb-2">Price: ₹{item.itemPrice}</p>
                <p className="text-gray-600 mb-2">Tags: {item.itemTags}</p>
                <p className="text-gray-600 mb-2">Visits: {item.itemVisit}</p>
              </div> 
                <button className="bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-400 hover:from-sky-500 hover:via-cyan-500 hover:to-teal-500 shadow-lg
                  text-white py-2 px-4 ml-2 rounded-full hover:bg-blue-700 transition duration-300">
                  Add to Cart
                </button>
              </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UnifiedSection;
