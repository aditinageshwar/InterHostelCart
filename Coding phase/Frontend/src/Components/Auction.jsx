import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { socket } from './Socket';

const Auction = () => {
  const location = useLocation();
  const { itemNO } = location.state || {};
  const navigate = useNavigate();
  const [userid, setUserId] = useState(null);
  const token = Cookies.get('token');

  const [auction, setAuction] = useState({});
  const [bids, setBids] = useState([]);
  const [bidAmount, setBidAmount] = useState('');
  const [isSeller, setIsSeller] = useState(false);
  
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        console.error('Please sign in to view your added items');
        return;
      }

      try {
        const response = await axios.get('http://localhost:3001/api/user/profile', {
          headers: {
            authorization: `Bearer ${token}`
          }
        });
        setUserId(response.data.user.userID);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchProfile();
  }, [token]);

  useEffect(() => {
    const fetchAuctionId = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/auctions/item/${itemNO}`);
        const auctionId = response.data.auctionId;
        fetchAuction(auctionId);
        fetchBids(auctionId);
      } 
      catch (error) 
      {
        if (error.response && error.response.status === 404) {
          createAuction();
        } 
        else {
          console.error('Error fetching auction ID:', error);
        }
      }
    };

    const createAuction = async () => {
      try 
      {
        const response = await axios.post('http://localhost:3001/api/auctions/create', {itemNO},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAuction(response.data.auction);
        fetchBids(response.data.auction.auctionId);
      } 
      catch (error) {
        console.error('Error creating auction:', error);
      }
    };
    
    const fetchAuction = async (auctionId) => {
      try {
        const response = await axios.get(`http://localhost:3001/api/auctions/${auctionId}`);
        setAuction(response.data.auction);
      } 
      catch (error) {
        console.error('Error fetching auction:', error);
      }
    };

    const fetchBids = async (auctionId) => {
      try {
        const response = await axios.get(`http://localhost:3001/api/auctions/${auctionId}/bids`);
        setBids(response.data.bids);
      } 
      catch (error) {
        console.error('Error fetching bids:', error);
      }
    };

    const checkIfSeller = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/items/item/${itemNO}`);
        const items = response.data;

        if (Array.isArray(items) && items.length > 0) 
        {
          const item = items[0];
          if (item.sellerId === userid) {
            setIsSeller(true);
          } else {
            setIsSeller(false);
          }
        } 
        else {
          setIsSeller(false);
        }
      } catch (error) {
        console.error('Error checking if user is seller:', error);
        setIsSeller(false);
      }
    };

    if (userid) {
      fetchAuctionId();
      checkIfSeller();
    }
  }, [itemNO, token, userid, navigate]);
  
  const handleBid = async () => {
    if (!token) {
      alert('Please sign in to place a bid.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/auctions/new/bid', { auctionId: auction.auctionId, userid, bidAmount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message);
      setBidAmount('');
    } 
    catch (error) {
      console.error('Error placing bid:', error);
      alert('Failed to place bid');
    }
  };

  const handleStopAuction = async () => {
    if (!token) {
      alert('Please sign in to stop the auction.');
      return;
    }

    try 
    {
      const response = await axios.post('http://localhost:3001/api/auctions/stop', { auctionId: auction.auctionId },
        {
          headers: { Authorization: `Bearer ${token}`,},
        }
      );
      const highestBid = response.data.order;
      if (highestBid) 
      {
        const confirmSale = window.confirm(`Highest bid is ₹${highestBid.bidAmount}. Do you want to sell the item to this bidder?`);
        if (confirmSale) {
          await axios.put(`http://localhost:3001/api/items/item/${itemNO}`);
          socket.emit('auctionEnded', { winnerId: highestBid.buyerId, bidAmount: highestBid.bidAmount });
          navigate('/orders'); 
        }
        else {
          alert('Auction stopped. No sale was made.');
        }
      }
    }
    catch (error) {
      console.error('Error stopping auction:', error);
      alert('Failed to stop auction');
    }
  };

  //Aution automatically ends after endTime
  useEffect(() => {
    const checkAuctionEnd = async () => {
      if (auction.endTime && new Date(auction.endTime) < new Date()) 
      {
        const response = await axios.post('http://localhost:3001/api/auctions/stop', { auctionId: auction.auctionId },
         {
           headers: { Authorization: `Bearer ${token}`,},
         }
        );
        const highestBid = response.data.order;
        if (highestBid) 
        {
          if (highestBid.buyerId === userid) {
            alert(`Congratulations! You won the auction with a bid of ₹${highestBid.bidAmount}`);
            navigate('/orders');
          } else {
            socket.emit('auctionEnded', { winnerId: highestBid.buyerId });
          }
        }
      }
    };

    checkAuctionEnd();
  }, [auction, bids, userid, navigate, itemNO]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl text-center font-bold bg-[url('https://tse2.mm.bing.net/th/id/OIP.lu34wOfmqsZNgVqOPIYrJAHaFS?pid=Api&P=0&h=180')] bg-clip-text text-transparent mb-4">
        Your Sale Listings
      </h2>
      <h1 className="text-2xl font-semibold text-gray-700 mb-4">Auction for Item:</h1>
      <div className="bg-stone-50 shadow-lg rounded-lg p-4 mb-6 border-2 border-stone-100">
        <p className="text-md">Starting Bid: <span className="font-semibold text-gray-800">{Number(auction.startingBid)}</span></p>
        <p className="text-md">End Time: <span className="font-semibold text-gray-800">{new Date(auction.endTime).toLocaleString()}</span></p>
      </div>

      {!isSeller && (
       <div className="bg-stone-50 shadow-lg rounded-lg p-4 mb-6 border-2 border-stone-100">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Place a Bid</h2>
        <div className="flex items-center space-x-4">
          <input
            type="number"
            min={auction.startingBid}
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            placeholder={`Enter ₹${auction.startingBid} or more`}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${bidAmount && Number(bidAmount) < auction.startingBid? 
                      "focus:ring-rose-500" : "focus:ring-cyan-500"}`}
          />
          {bidAmount && Number(bidAmount) < auction.startingBid && (
            <p className="text-rose-500 text-sm mt-1"> Bid must be atleast ₹{auction.startingBid} </p>
          )}
          <button
            onClick={handleBid}
            className="bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-400 hover:from-sky-600 hover:via-cyan-500 hover:to-teal-500 shadow-lg text-white max-h-11 px-4 rounded-lg"
          >
            Place Bid
          </button>
        </div>
       </div>
      )}

      {isSeller && (
        <div className="bg-stone-50 shadow-lg rounded-lg p-4 border-2 border-stone-100 mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Seller Actions</h2>
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-600 text-sm">
              You can stop the auction if the item is no longer available or sold.
            </p>
            <button
              onClick={handleStopAuction}
              className="bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700 text-md"
            >
              Stop Auction
            </button>
          </div>
        </div>
      )}

      <div className="bg-stone-50 shadow-lg rounded-lg p-4 border-2 border-stone-100 mb-14">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Bids</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 text-gray-700">User ID</th>
              <th className="py-2 text-gray-700">Bid Amount</th>
              <th className="py-2 text-gray-700">Bid Time</th>
            </tr>
          </thead>
          <tbody>
            {bids.map((bid, index) => (
              <tr key={bid.bidId} className={`border-t ${index % 2 === 0 ? 'bg-cyan-50' : 'bg-sky-50'}`}>
                <td className="py-2 text-center">{bid.userID}</td>
                <td className="py-2 text-center">{bid.bidAmount}</td>
                <td className="py-2 text-center">{new Date(bid.bidTime).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Auction;