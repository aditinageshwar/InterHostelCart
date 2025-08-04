import { useState, useEffect } from 'react';
import axios from 'axios';
import ReportList from "../AdminComponents/ReportList.jsx";
import UserList from "../AdminComponents/UserList.jsx";
import CapacityCircle from '../AdminComponents/CapacityCircle.jsx';
import ItemList from '../AdminComponents/ItemList.jsx';
import { FaShoppingCart } from "react-icons/fa";

function AdminDashboard() {
  const [reports, setReports] = useState([]);
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [sec,setsec] = useState(0);
  const maxCapacity = 100; 

  useEffect(() => {
    fetchReports();
    fetchUsers();
    fetchItems();
    fetchBlockedUsers();
  }, []);

  useEffect(()=>{displaySection},[sec]);
 
  const fetchReports = async () => {                                    
    const response = await axios.get('http://localhost:3001/api/items');
    const items = response.data || [];
    const reporteditem = items.filter(item => item.reportflag)
    setReports(reporteditem);
  };

  const fetchUsers = async () => {                                       
    const response = await axios.get('http://localhost:3001/api/user/alluser');
    setUsers(response.data|| []);
  };

  const fetchBlockedUsers = async () => {                                       
    const response = await axios.get('http://localhost:3001/api/user/blockuser');
    setBlockedUsers(response.data|| []);
  };

  const fetchItems = async () => {                                      
    const response = await axios.get('http://localhost:3001/api/items');
    setItems(response.data|| []);
  };

  const verifyReport = async (itemNO) => {                         
    const response = await axios.post(`http://localhost:3001/api/items/markSafe/${itemNO}`);
    if (response.status === 200) {
      fetchReports(); 
    } else {
      console.warn(`Unexpected status: ${response.status}`);
    }
  };

  const deleteReport = async (itemNO) => {  
    const itemResponse = await axios.get(`http://localhost:3001/api/items/item/${itemNO}`);
    await blockUser(itemResponse.data[0].userID);                                                  //set reported = true (prevent from login)

    const response = await axios.put(`http://localhost:3001/api/items/item/${itemNO}`);            //delete that item
    if (response.status === 200) {
      fetchReports(); 
    } else {
      console.warn(`Unexpected status: ${response.status}`);
    }
  };
  
  const blockUser = async (userID) => {                               
    const response = await axios.put(`http://localhost:3001/api/user/report/${userID}`);
    if (response.data.message) {
      console.log(`Success: ${response.data.message}`);
    } else {
      console.warn('Unexpected response format:', response.data);
    }
  };

  function displaySection() {
    switch (sec) {
      case 1: return <UserList users={users} /> 
      case 2: return <ReportList reports={reports} onVerify={verifyReport} onDelete={deleteReport}/>
      case 3: return <UserList users={blockedUsers}/> 
      case 4: return <ItemList items={items} />   
      default: return;
    }
 }

  return (
   <div className="min-h-screen bg-gray-100 p-8">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center bg-[url('https://tse2.mm.bing.net/th/id/OIP.lu34wOfmqsZNgVqOPIYrJAHaFS?pid=Api&P=0&h=180')] bg-clip-text text-transparent mb-8">
        ~ Admin Dashboard ~
      </h1>

      <div className="flex justify-center gap-10">
        <section className="w-64 bg-gradient-to-t from-emerald-300 via-emerald-200 to-emerald-200 p-6 rounded-lg shadow-lg h-[12rem] hover:scale-105 transform transition duration-300"onClick={()=>setsec(1)} >
          <CapacityCircle capacity={users.length} maxCapacity={maxCapacity} label="user" />
        </section>
  
        <section className="w-64 bg-gradient-to-t from-orange-300 via-orange-200 to-orange-200 p-6 rounded-lg shadow-lg h-[12rem] hover:scale-105 transform transition duration-300" onClick={()=>setsec(2)}>
          <CapacityCircle capacity={reports.length} maxCapacity="100" label="report"/>
        </section>

        <section className="w-64 bg-gradient-to-t from-red-300 via-red-200 to-red-200 p-6 rounded-lg shadow-lg h-[12rem] hover:scale-105 transform transition duration-300" onClick={()=>setsec(3)}>
          <CapacityCircle capacity={blockedUsers.length} maxCapacity={maxCapacity} label="blocked-user" />
        </section>

        <section className="w-64 bg-gradient-to-t from-sky-300 via-sky-200 to-sky-200 p-6 rounded-lg shadow-lg h-[12rem] hover:scale-105 transform transition duration-300"onClick={()=>setsec(4)}>
        <FaShoppingCart className="text-white text-6xl mx-auto mt-4" />  
          <h3 className="font-semibold mb-2 text-center text-white mt-3 ml-2">Items List</h3>
          <p className="text-white font-semibold text-lg text-center ml-2">{items.length}</p>
        </section>
      </div>
      {displaySection()}
    </div>
   </div>
);
}

export default AdminDashboard;