import { useState } from 'react';
import { FaGamepad } from "react-icons/fa";

const Dropdown = ({ label, items }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setIsOpen(false);
    };

    return (
        <>
            <li className="relative border-t border-gray-800">
                <button
                    className="w-full h-full flex items-center justify-between px-4 py-2 text-sm font-medium text-white bg-gray-900  hover:bg-gray-800 "
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="flex items-center">
                        <span className="mr-2">
                            <FaGamepad />
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
                                        <a href={item.href} className="block text-sm font-medium text-white hover:text-gray-200">
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )
                }
            </li >
        </>
    );
};

export default Dropdown;

