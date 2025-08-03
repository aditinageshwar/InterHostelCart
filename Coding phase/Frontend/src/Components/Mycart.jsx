import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const Mycart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotal] = useState(0);
  const token = Cookies.get('token');
  
  useEffect(() => {    
    const fetchCartItems = async () => {
      if (!token) {
        setError('Please sign in to fetch cart items');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3001/api/cart`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const res = response.data;
        setCartItems(res);
        const totalPrice = res.reduce((sum, item) => sum + item.itemPrice, 0);
        setTotal(totalPrice);
      } 
      catch (error) {
        console.error('Error fetching cart items:', error);
      }
    }; 

    fetchCartItems();
  }, []);

  const handleRemoveItem = async (itemNO) => {
    try {
      await axios.delete('http://localhost:3001/api/cart/remove', {
        data: { itemNO },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedCart = cartItems.filter(item => item.itemNO !== itemNO);
      setCartItems(updatedCart);

      const updatedTotal = updatedCart.reduce((sum, item) => sum + item.itemPrice, 0);
      setTotal(updatedTotal);

      alert('Item removed from cart successfully');
    } catch (error) {
      console.error('Error removing item from cart:', error);
      alert('Failed to remove item from cart');
    }
  };

  const handleBuyNow = (itemNO) => {
    navigate('/auction', { state: { itemNO } });
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">

    {cartItems.length === 0 ? (
      <div className="mt-14 text-center mb-40">
        <p className="text-lg text-rose-500">Your cart is empty.</p>
        <Link to="/" className="text-cyan-600 text-xl underline hover:no-underline">
          Continue Shopping
        </Link>
      </div>
      ) : (
      <div className=''>
        <h2 className="text-2xl text-center font-semibold mt-4 bg-[url('https://tse2.mm.bing.net/th/id/OIP.lu34wOfmqsZNgVqOPIYrJAHaFS?pid=Api&P=0&h=180')] bg-clip-text text-transparent">
          Shopping Cart
        </h2>
        <div className="mb-14 mt-6 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
            {cartItems.map(item => (
              <div key={item.itemNO} className="rounded-lg border border-gray-200 p-4 shadow-xl md:p-6">
                <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                  <img className="h-32 w-32" src={item.itemPhotoURL} alt={item.itemName} />
                  <div className="flex items-center md:order-3 md:justify-end">  
                    <p className="font-bold text-gray-800">MRP: ₹{item.itemPrice}</p>       
                  </div>
                  <div className="w-full flex-1 md:order-2 md:max-w-md">
                    <p className="text-lg font-semibold text-gray-800">{item.itemName}</p>
                    <p className="text-sm text-gray-600">{item.itemDescription}</p>
                    <p className="text-sm font-semibold text-gray-600">{new Date(item.listingDate).toLocaleDateString("en-CA")}</p>
                    <div className="flex items-center">
                      <button
                        type="button"
                        className="py-2 inline-flex items-center text-md font-medium text-rose-600 hover:underline"
                        onClick={() => handleRemoveItem(item.itemNO)}
                      >
                        <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                        </svg>
                          Remove
                      </button>
                      <button
                        type="button"
                        className="py-2 inline-flex items-center text-md font-medium text-cyan-600 hover:underline ml-6"
                        onClick={() => handleBuyNow(item.itemNO)}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
             ))}
            </div>
          </div>
              
          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full shadow-2xl">
            <div className="space-y-4 rounded-md border border-gray-200 p-4 shadow-sm sm:p-6">
              <p className="text-xl font-semibold text-gray-800">Order summary</p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="font-normal text-gray-600">Original price</dt>
                    <dd className="font-medium text-gray-800">₹{totalAmount}</dd>
                  </dl>
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="font-normal text-gray-600">Discount</dt>
                    <dd className="font-medium text-rose-600">₹0</dd>
                  </dl>
                </div>
                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                  <dt className="font-semibold text-gray-700">Total</dt>
                  <dd className="font-semibold text-green-600">₹{totalAmount}</dd>
                </dl>
              </div>

              <Link to="/payment" className="flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-gray-700 border border-gray-400 hover:bg-stone-100">
                Go to Payment
              </Link>
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-normal text-gray-500"> or </span>
                <Link to="/" className="inline-flex items-center gap-2 text-md font-medium text-cyan-600 underline hover:no-underline">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
      )}
    </div>
  );
};

export default Mycart;