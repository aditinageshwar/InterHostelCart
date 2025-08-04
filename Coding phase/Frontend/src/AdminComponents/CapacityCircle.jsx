import { FaUser } from 'react-icons/fa'; 
import { FaRegFileAlt } from 'react-icons/fa';
import { FaUserSlash } from 'react-icons/fa';

const CapacityCircle = ({ capacity, maxCapacity,label }) => 
{
  const radius = 30;
  const circumference = 2 * Math.PI * radius;  
  const progress = (capacity / maxCapacity) * 100;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-30 h-20">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            r={radius}
            className="text-white"
            strokeWidth="6"
            fill="none"
            stroke="currentColor"
          />
        
          <circle
            cx="40"
            cy="40"
            r={radius}
            className="text-cyan-500 transition-all duration-[1500ms] ease-out" 
            strokeWidth="6"
            fill="none"
            stroke="currentColor"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          {label === "user" ? (
            <FaUser className="text-white text-3xl" />
          ) : label === "report"? (
            <FaRegFileAlt className="text-white text-3xl" />
          ) : (
            <FaUserSlash className="text-white text-3xl" />
          )}
        </div>

        <div className="text-center mt-2">
          {label === "user" ? (
            <p className="font-semibold text-white">Registered User</p>
          ) : label === "report"? (
            <p className="font-semibold text-white">Reports</p>
          ) : (
            <p className="font-semibold text-white">Blocked User</p>
          )} 
          <p className="text-white font-semibold text-lg">{capacity}</p>
        </div>
      </div>
    </div>
  );
};
export default CapacityCircle;