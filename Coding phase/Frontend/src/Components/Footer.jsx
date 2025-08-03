import { FaTelegramPlane, FaMobileAlt, FaLinkedin, FaInstagram, FaFacebook, FaBell, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-5 bg-cyan-700">
      <div className="container px-12 mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="mb-3">
          <h5 className="text-lg font-semibold mb-2 text-gray-100">Important Links</h5>
          <ul className="space-y-2">
            <li><Link to="/" className="text-gray-300 hover:text-gray-100">Home</Link></li>
            <li><Link to="/profile" className="text-gray-300 hover:text-gray-100">Profile</Link></li>
            <li><Link to="#" className="text-gray-300 hover:text-gray-100">Chats</Link></li>
            <li><Link to="/myitem" className="text-gray-300 hover:text-gray-100">My Listings</Link></li>
            <li><Link to="/orders" className="text-gray-300 hover:text-gray-100">Order History</Link></li>
          </ul>
        </div>

        <div className="mb-3">
          <h5 className="text-lg font-semibold mb-2 text-gray-100">Category</h5>
          <ul className="space-y-2">
            <li><a href="/sport" className="text-gray-300 hover:text-gray-100">Sport</a></li>
            <li><a href="/stationary" className="text-gray-300 hover:text-gray-100">Stationary</a></li>
            <li><a href="/electronics" className="text-gray-300 hover:text-gray-100">Electronics</a></li>
            <li><a href="/accessories" className="text-gray-300 hover:text-gray-100">Accessories</a></li>
            <li><a href="/vehicle" className="text-gray-300 hover:text-gray-100">Vehicle</a></li>
          </ul>
        </div>

        <div className="mb-3">
          <h5 className="text-lg font-semibold mb-2 text-gray-100">Contact Us</h5>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-300 hover:text-gray-100 flex items-center"><FaTelegramPlane className="mr-2" /> Manit, Bhopal</a></li>
            <li><a href="#" className="text-gray-300 hover:text-gray-100 flex items-center"><FaMobileAlt className="mr-2" /> 9340520507 </a></li>
          </ul>
          <ul className="flex space-x-4 mt-4">
            <li><a href="#" className="text-gray-300 hover:text-gray-100 text-[20px]"><FaInstagram /></a></li>
            <li><a href="#" className="text-gray-300 hover:text-gray-100 text-[20px]"><FaFacebook /></a></li>
            <li><a href="https://www.linkedin.com/in/aditinageshwar/" className="text-gray-300 hover:text-gray-100 text-[20px]"><FaLinkedin /></a></li>
            <li><a href="#" className="text-gray-300 hover:text-gray-100 text-[20px]"><FaTwitter /></a></li>
          </ul>
        </div>

        <div className="mb-3">
          <form>
            <h5 className="text-lg font-semibold mb-2 text-gray-100" >Subscribe to our page.</h5>
            <p className="text-gray-300 mb-4">Monthly digest of what's new and exciting from us.</p>
            <div className="flex flex-col sm:flex-row w-full gap-2">
              <label htmlFor="newsletter1" className="sr-only">Email address</label>
              <input id="newsletter1" type="text" className="form-input w-full sm:w-auto flex-grow p-2 border border-gray-300 rounded" placeholder="Email address" />
              <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300 flex items-center" type="button">
                Subscribe <FaBell className="ml-2" />
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="flex justify-center items-center py-4 mt-8 border-t border-gray-300">
        <p className="text-gray-100 text-center">© 2024 Company, Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;