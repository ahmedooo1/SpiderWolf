import Link from 'next/link';
import logo from 'public/spiderwolf-newlogo.png';
import Image from 'next/image';
import DropDown from './DropDown';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 h-screen w-64 text-white flex flex-col">
      <div className="p-4 ">
        <Link className='flex justify-center items-center' href="/">
          <Image src={logo.src} width={80} height={80} alt="Admin logo" className="mr-2" />
          <span className="text-2xl font-bold">Spider Wolf</span>
        </Link>
      </div>
      <ul className="flex flex-col items-stretch">
        <li className="px-4 py-2 hover:bg-gray-700 border-t border-gray-700">
          <Link href="/admin/dashboard">
            <span>Dashboard</span>
          </Link>
        </li>
        <li className="px-4 py-2 hover:bg-gray-700 border-t border-gray-700">
          <Link href="/admin/users">
            <span>Users</span>
          </Link>
        </li>

        <li className="px-4 py-2 hover:bg-gray-700 border-t border-gray-700">
          <DropDown
            label="Games"
            items={[
              { label: 'All Games', href: '/games' },
              { label: 'New Games', href: '/games/new' },
            ]}
          />
        </li>

      </ul>
      <div className="flex-grow"></div>
      <div className="p-4 text-center">
        <Link href="/admin/settings">
          <span className="settings-link">Settings</span>
        </Link>
        <div className="border-t border-gray-700"></div>
        <p className="text-gray-500 mt-2">© 2023 Spiderwolf</p>
      </div>
    </div>
  );
};

export default Sidebar;
