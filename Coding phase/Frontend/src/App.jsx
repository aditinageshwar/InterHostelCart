import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddItem from './Components/AddItem';
import AdminDashboard from './Components/AdminDashboard';
import Auction from './Components/Auction';
import Home from './Components/Home'; 
import Item from './Components/Item';
import Layout from './Components/Layout'; 
import Login from './Components/Login';
import Mycart from './Components/Mycart';
import Myitem from './Components/Myitem';
import Orders from './Components/Orders';
import Payment from './Components/Payment'
import Profile from './Components/Profile';
import Signup from './Components/Signup';
import UnifiedSection from './Components/UnifiedSection';

function App() {
  const tagRoutes = ["electronics", "accessories", "stationary", "vehicle", "sport", "medicine"];
  const hostelRoutes = [1,2,3,4,5,6,7,8,9,10,11,12];

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/additem" element={<AddItem />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/mens" element={<UnifiedSection gender="male" />} />
          <Route path="/womens" element={<UnifiedSection gender="female" />} />
          
          {tagRoutes.map(tag => (
            <Route key={tag} path={`/${tag}`} element={<UnifiedSection tag={tag} />} />
          ))}

          {hostelRoutes.map(hostelNo => (
            <Route key={hostelNo} path={`/${hostelNo}`} element={<UnifiedSection hostelNo={hostelNo} />} />
          ))}

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mycart" element={<Mycart />} />
          <Route path="/item/:itemNO" element={<Item />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/auction" element={<Auction />} />
          <Route path="/myitem" element={<Myitem />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;