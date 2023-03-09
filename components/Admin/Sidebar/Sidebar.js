import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import DropDown from './DropDown';
import logo from 'public/spiderwolf-newlogo.png';
import { FaHome, FaUserFriends } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="bg-gray-900 h-screen w-64 text-white flex flex-col">
      <div className="p-4">
        <Link href="/">
          <span className='flex justify-center items-center'>
            <Image src={logo.src} width={80} height={80} alt="Admin logo" className="mr-2" />
            <span className="text-3xl font-bold tracking-widest">SPIDER WOLF</span>
          </span>
        </Link>
      </div>
      <ul className="flex flex-col items-stretch">
        <li className="px-4 py-2 hover:bg-gray-700 border-t border-gray-700">
          <Link href="/admin/dashboard">
            <span className="flex items-center">
              <span className="mr-2">
                <FaHome/>
              </span>
              <span>Dashboard</span>
            </span>
          </Link>
        </li>
        <li className="px-4 py-2 hover:bg-gray-700 border-t border-gray-700">
          <Link href="/admin/users">
            <span className="flex items-center">
              <span className="mr-2">
                <FaUserFriends/>
              </span>
              <span>Users</span>
            </span>
          </Link>
        </li>
        <DropDown
          label="Games"
          items={[
            { label: 'All Games', href: '/games' },
            { label: 'New Games', href: '/games/new' },
          ]}
        />
      </ul>
      <div className="flex-grow"></div>
      <div className="p-4 text-center">
        <Link href="/admin/settings">
          <span className="settings-link">Settings</span>
        </Link>
        <div className="border-t border-gray-700 mt-2"></div>
        <p className="text-gray-500 mt-2">© 2023 Spiderwolf. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Sidebar;
