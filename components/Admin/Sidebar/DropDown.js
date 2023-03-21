import { useState } from 'react';
import { FaGamepad } from "react-icons/fa";
import { UserIcon } from '@heroicons/react/24/outline'
import { signOut } from "next-auth/react"
import Link from 'next/link';

const Dropdown = ({ icone, label, items }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);


    const handleItemClick = (item, e) => {
        setSelectedItem(item);
        setIsOpen(false);
    };

    const handleSignOut = async (e) => {
        e.preventDefault();
        await signOut();
    };

    return (
        <>
            <span className="relative border-gray-800">
                <button
                    className="w-full h-full flex items-center justify-between px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 "
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="flex items-center">
                        <span className="mr-2">
                            {
                                icone === 'user' ? (
                                    <UserIcon className="h-5 w-5 text-white" />
                                ) : icone === 'game' ? (
                                    <FaGamepad className="h-5 w-5 text-white" />
                                ) : null
                            }
                        </span>
                        <span>{label}</span>
                        <svg className={`${isOpen ? 'transform rotate-180' : ''} w-4 h-4 ml-2`} viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.707a1 1 0 011.414 0L10 10.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </div>
                </button>
                {
                    isOpen && (
                        <div className="absolute z-10 w-full mt-2 bg-gray-800 rounded-md shadow-lg">
                            <ul className="py-2">
                                {items.map((item) => (
                                    <li
                                        key={item.label}
                                        className={`${selectedItem && selectedItem.label === item.label ? 'bg-gray-700' : 'hover:bg-gray-700'} px-4 py-2`}
                                        onClick={() => handleItemClick(item)}
                                    >
                                        {item.label === "Sign Out" ? (
                                            <button type="submit" onClick={handleSignOut} className="block text-sm font-medium text-white">{item.label}</button>
                                        ) : (
                                            <Link href={item.href} className={`block text-sm font-medium text-white ${selectedItem && selectedItem.label === item.label ? 'selected' : ''}`}>
                                                {item.label}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )
                }
            </span >
        </>
    );
};

export default Dropdown;