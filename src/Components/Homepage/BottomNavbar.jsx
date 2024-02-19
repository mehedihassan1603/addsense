import { Link } from 'react-router-dom';
import { FaHome, FaCoins, FaUser, FaSms } from 'react-icons/fa';

const BottomNavbar = () => {
  return (
    <footer className="fixed bottom-0 w-full bg-gray-800 py-2 px-6 flex justify-between items-center sm:hidden">
      <Link to="/" className="text-white">
        <FaHome size={24} />
      </Link>
      <Link to="/ads" className="text-white">
        <FaCoins size={24} />
      </Link>
      <Link to="/sms" className="text-white">
        <FaSms size={24} />
      </Link>
      <Link to="/profile/profile" className="text-white">
        <FaUser size={24} />
      </Link>
    </footer>
  );
};

export default BottomNavbar;
