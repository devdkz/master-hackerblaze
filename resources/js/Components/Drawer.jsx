import { useState } from "react";
import Image from "next/image";

export default function Drawer() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className="relative">
            <input
                type="checkbox"
                id="EZDrawer__checkbox"
                className="hidden"
                checked={isOpen}
                readOnly
            />
            <nav
                role="navigation"
                className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-lg transform transition-transform duration-500 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
                style={{ zIndex: 101, background: "#202024" }}
            >
                <header className="p-0">
                    {/* <Image src={Logo} alt="Logo" /> */}
                </header>
                <ul className="mt-4">
                    <li className="p-4 hover:bg-gray-100 transition">
                        <a href="/" className="flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="currentColor"
                                viewBox="0 0 256 256"
                            >
                                <rect
                                    width="256"
                                    height="256"
                                    fill="none"
                                ></rect>
                                <path
                                    d="M152,208V160a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v48a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V115.5a8.3,8.3,0,0,1,2.6-5.9l80-72.7a8,8,0,0,1,10.8,0l80,72.7a8.3,8.3,0,0,1,2.6,5.9V208a8,8,0,0,1-8,8H160A8,8,0,0,1,152,208Z"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="16"
                                />
                            </svg>
                            Página Inicial
                        </a>
                    </li>
                </ul>
            </nav>
            <label
                htmlFor="EZDrawer__checkbox"
                className={`fixed inset-0 bg-black opacity-40 transition-opacity duration-500 ${
                    isOpen ? "block" : "hidden"
                }`}
                onClick={toggleDrawer}
            ></label>
            <button onClick={toggleDrawer}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                >
                    <rect width="256" height="256" fill="none"></rect>
                    <line
                        x1="40"
                        y1="128"
                        x2="216"
                        y2="128"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="16"
                    ></line>
                    <line
                        x1="40"
                        y1="64"
                        x2="216"
                        y2="64"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="16"
                    ></line>
                    <line
                        x1="40"
                        y1="192"
                        x2="216"
                        y2="192"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="16"
                    ></line>
                </svg>
            </button>
        </div>
    );
}
