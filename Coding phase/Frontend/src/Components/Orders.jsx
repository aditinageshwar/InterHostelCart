import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ChevronDown } from 'lucide-react';

const Card = ({ children, className }) => (
  <div className={`bg-white shadow-md rounded-lg ${className}`}>{children}</div>
);

const CardHeader = ({ children, className }) => (
  <div className={`p-4 border-b ${className}`}>{children}</div>
);

const CardContent = ({ children, className }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const Button = ({ children, variant = 'default', className, ...props }) => {
  const baseStyle = 'px-4 py-2 rounded-md font-medium';
  const variantStyles = {
    default: 'bg-cyan-600 text-white',
    ghost: '',
  };
  
  return (
    <button 
      className={`${baseStyle} ${variantStyles[variant]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

const Select = ({ value, onChange, options }) => (
  <select 
    value={value} 
    onChange={(e) => onChange(e.target.value)}
    className="border border-gray-300 rounded-md px-2 py-1"
  >
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

const Input = ({ className, ...props }) => (
  <input 
    className={`border rounded-md px-3 py-2 w-full ${className}`} 
    {...props} 
  />
);


const OrderCard = ({ order, userid }) => {
  const [isOpen, setIsOpen] = useState(false);
  return(
  <Card className="bg-zinc-50 border shadow-lg mb-3">
    <CardHeader className="flex flex-wrap justify-between items-center">
      <div className="mb-2 sm:mb-0">
        <p className="text-gray-500">ORDER PLACED</p>
        <p className="font-semibold text-gray-800"> {new Date(order.orderDate).toLocaleDateString("en-CA")} </p>      
      </div>
      <div className="mb-2 sm:mb-0">
        <p className="text-gray-500">TOTAL</p>
        <p className="font-semibold text-gray-800">₹ {Number(order.totalamount)}</p>
      </div>

      <div className="mb-2 sm:mb-0 relative">
        {userid === order.buyerId ? (
          <p className="text-gray-500">BOUGHT FROM</p>
        ) : (
          <p className="text-gray-500">SOLD TO</p> 
        )}
        <div className="font-semibold text-gray-800 flex items-center cursor-pointer"
            onClick={() => setIsOpen(prev => !prev)}
        >
          <span>{order.userName}</span>
          <ChevronDown className={`ml-2 mt-1 w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
        {isOpen && (
        <div className="absolute z-10 bg-stone-50 shadow-lg rounded-sm w-max mt-3 text-sm text-gray-600 space-y-1 p-3 border border-gray-200">
          <p><strong>Mobile No: </strong> {order.userPhoneNo}</p>
          <p><strong>Hostel No: </strong> {order.hostelNo}</p>
          <p><strong>Room No: </strong> {order.roomNo}</p>
          <p><strong>Department: </strong> {order.userDept}</p>
          <p><strong>Course: </strong> {order.userCourse}</p>
        </div>
      )}
      </div>

      <div className="">
        <Button variant="link" className="text-cyan-700">View order details</Button>
      </div>
    </CardHeader>

    <CardContent className="flex flex-wrap items-start">
      <img
        src={order.itemPhotoURL}
        alt={order.itemNO}
        className="w-24 h-24 object-cover rounded-md mb-4 sm:mb-0 sm:mr-4"
      />
      <div className="flex-grow mb-4 ml-2 sm:mb-0">
        <h3 className="font-semibold text-gray-700">{order.itemName}</h3>
        <p className="text-sm text-gray-500">{order.itemDescription}</p>
        <div className="flex mt-4 space-x-2">
          <Link to={`/item/${order.itemNO}`}>
            <Button className="bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-400 hover:from-sky-600 hover:via-cyan-500 hover:to-teal-500 shadow-lg">
              View your item
            </Button>
          </Link>
        </div>
      </div>
    </CardContent>
  </Card>
)};


const Orders = () => {
  const [selectedTab, setSelectedTab] = useState('orders');
  const [selectedYear, setSelectedYear] = useState('2024');
  const [userid, setUserId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = Cookies.get('token');

  const tabs = [
    { id: 'orders', label: 'Orders' },
    { id: 'cancelledOrders', label: 'Cancelled Orders' },
    { id: 'reportedOrders', label: 'Reported Orders' },
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        console.error('Please sign in to view your orders');
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
    const fetchOrders = async () => {
      try {
        const response1 = await axios.get('http://localhost:3001/api/orders/seller', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const response2 = await axios.get('http://localhost:3001/api/orders/buyer', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const sellerOrders = response1?.data || []; 
        const buyerOrders = response2?.data || [];
        const combinedOrders = [...sellerOrders.map(order => ({ ...order })), ...buyerOrders.map(order => ({ ...order }))];
        setOrders(combinedOrders);
        setLoading(false);
      } 
      catch (error) {
        setError('Failed to fetch orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userid]);

  const filteredOrders = orders.filter(order => {
    const orderYear = new Date(order.orderDate).getFullYear().toString();
    return orderYear === selectedYear;
  });


  if (loading) {
    return <div className='text-center mt-20 mb-40 text-xl text-semibold text-emerald-500'>Loading...</div>;
  }
  if (error) {
    return <div className="text-center mt-20 mb-40 text-xl text-semibold text-red-400">{error}</div>;
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mt-8 mb-6">Your Orders</h1>
        <div className="flex flex-wrap justify-between items-center mb-4">
          <div className="flex flex-wrap space-x-2 mb-4 sm:mb-0">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={selectedTab === tab.id ? 'default' : 'ghost'}
                onClick={() => setSelectedTab(tab.id)}
                className="mb-2 sm:mb-0 text-gray-800"
              >
                {tab.label}
              </Button>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-sm text-gray-500">
              {filteredOrders.length > 0 ? `${filteredOrders.length} orders placed in` : `No order placed in`}
            </p>
            <Select
              value={selectedYear}
              onChange={setSelectedYear}
              options={[
                { value: '2025', label: '2025' },
                { value: '2024', label: '2024' },
                { value: '2023', label: '2023' },
                { value: '2022', label: '2022' },
                { value: '2021', label: '2021' },
              ]}
            />
          </div>
        </div>
        <div className="mb-6 bg-stone-100">
          <Input
            type="text"
            placeholder="🔍 Search all orders"
            className="py-2 w-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {filteredOrders.map((order) => (
          <OrderCard key={order.itemNO} order={order} userid={userid} />
        ))}
      </div>
    </div>
  );
};

export default Orders;