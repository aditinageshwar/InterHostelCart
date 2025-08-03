import { useState } from 'react';
import { AiOutlineCreditCard } from 'react-icons/ai';
import { SiGooglepay, SiPhonepe } from 'react-icons/si';
import { RiPaypalLine } from 'react-icons/ri';

const Payment = () => {
  const [activePaymentMethod, setActivePaymentMethod] = useState(null);
  const [otp, setOtp] = useState('');
  const [saveDetails, setSaveDetails] = useState(false);

  // Handle OTP submission
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    alert('OTP submitted: ' + otp);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 bg-[url('https://tse2.mm.bing.net/th/id/OIP.lu34wOfmqsZNgVqOPIYrJAHaFS?pid=Api&P=0&h=180')] bg-clip-text text-transparent">
        Payment Methods
      </h2>
      
      {/* List of Payment Methods */}
      <div className="mb-6">
        <ul className="list-disc list-inside mb-4 list-none">
          <li className="mb-4">
            <button onClick={() => setActivePaymentMethod('upi')} className="flex items-center text-blue-500">
              <SiGooglepay className="text-2xl mr-2" /> Google Pay / <SiPhonepe className="text-2xl ml-2 mr-2" /> PhonePe
            </button>
          </li>
          <li className="mb-4">
            <button onClick={() => setActivePaymentMethod('razorpay')} className="flex items-center text-blue-500">
              <RiPaypalLine className="text-2xl mr-2" /> Razorpay
            </button>
          </li>
          <li className="mb-16">
            <button onClick={() => setActivePaymentMethod('cards')} className="flex items-center text-blue-500">
              <AiOutlineCreditCard className="text-2xl mr-2" /> Cards (Debit/Credit)
            </button>
          </li>
        </ul>
      </div>

      {/* Payment Method Forms */}
      {activePaymentMethod === 'upi' && (
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">UPI Payment</h3>
          <p className="mb-4">Select your UPI app and enter your UPI ID.</p>
          <input type="text" placeholder="UPI ID" className="w-full px-4 py-2 border rounded-lg mb-4" />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Save UPI ID</button>
          <div className="mt-4">
            <label className="inline-flex items-center">
              <input type="checkbox" checked={saveDetails} onChange={() => setSaveDetails(!saveDetails)} className="form-checkbox" />
              <span className="ml-2">Save details for future use</span>
            </label>
          </div>
        </div>
      )}

      {activePaymentMethod === 'razorpay' && (
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Razorpay</h3>
          <p className="mb-4">To integrate Razorpay, you'll need to follow their documentation for the setup.</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Save Razorpay Account</button>
          <div className="mt-4">
            <label className="inline-flex items-center">
              <input type="checkbox" checked={saveDetails} onChange={() => setSaveDetails(!saveDetails)} className="form-checkbox" />
              <span className="ml-2">Save details for future use</span>
            </label>
          </div>
        </div>
      )}

      {activePaymentMethod === 'cards' && (
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Card Details</h3>
          <form onSubmit={handleOtpSubmit}>
            <div className="mb-4">
              <label className="block text-sm mb-1">Card Number</label>
              <input type="text" placeholder="Enter card number" className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">Expiry Date</label>
              <input type="text" placeholder="MM/YY" className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">CVV</label>
              <input type="text" placeholder="Enter CVV" className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">Account Holder Name</label>
              <input type="text" placeholder="Enter your name" className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">OTP Verification</label>
              <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Verify OTP</button>
            <div className="mt-4">
              <label className="inline-flex items-center">
                <input type="checkbox" checked={saveDetails} onChange={() => setSaveDetails(!saveDetails)} className="form-checkbox" />
                <span className="ml-2">Save details for future use</span>
              </label>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Payment;