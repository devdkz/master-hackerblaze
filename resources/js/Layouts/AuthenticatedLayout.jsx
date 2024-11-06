import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage, useForm } from "@inertiajs/react";
import { useState } from "react";
import "../css/auth.css";
import Logo from "@/Assets/logo.png";
import toast, { Toaster } from "react-hot-toast";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const { post, processing } = useForm();
    const handleLogout = (e) => {
        e.preventDefault(); // Impede o comportamento padrão do botão
        // Mostrar uma notificação de carregamento
        toast.loading("Logging out...");
        post("/logout", {
            onFinish: () => {
                toast.dismiss(); // Remove o carregando após a finalização
                toast.success("Logged out successfully!"); // Notificação de sucesso
            },
            onError: () => {
                toast.error("Logout failed! Please try again."); // Notificação de erro
            },
        });
    };
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="main" id="main">
            <Toaster />
            <header className="headerContainer">
                <button
                    onClick={() =>
                        setShowingNavigationDropdown((prev) => !prev)
                    }
                >
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
                <nav
                    role="navigation"
                    className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-lg transform transition-transform duration-500 ${
                        showingNavigationDropdown
                            ? "translate-x-0"
                            : "-translate-x-full"
                    }`}
                    style={{ zIndex: 101, background: "#202024" }}
                >
                    <header className="p-0 flex justify-center">
                        <img src={Logo} alt="Logo" className="w-1/2" />
                    </header>
                    <div className="mt-4 px-4">
                        <div className="text-center text-sm">
                            <h1>Informações do Cliente</h1>
                        </div>
                        <div className="bg-gray-900 p-2 rounded-md">
                            <div className="flex items-center gap-2 text-sm">
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="size-4"
                                    >
                                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                                    </svg>
                                </div>
                                <span className="truncate">Nome : { user.name }</span>
                            </div>
                            <div className="mt-4 flex items-center gap-2 text-sm">
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="size-4"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M11.89 4.111a5.5 5.5 0 1 0 0 7.778.75.75 0 1 1 1.06 1.061A7 7 0 1 1 15 8a2.5 2.5 0 0 1-4.083 1.935A3.5 3.5 0 1 1 11.5 8a1 1 0 0 0 2 0 5.48 5.48 0 0 0-1.61-3.889ZM10 8a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <span className="truncate">E-mail : { user.email }</span>
                            </div>
                            <div className="mt-4 flex items-center gap-2 text-sm">
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="size-4"
                                    >
                                        <path d="M5.75 7.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM5 10.25a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0ZM10.25 7.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM7.25 8.25a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0ZM8 9.5A.75.75 0 1 0 8 11a.75.75 0 0 0 0-1.5Z" />
                                        <path
                                            fillRule="evenodd"
                                            d="M4.75 1a.75.75 0 0 0-.75.75V3a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2V1.75a.75.75 0 0 0-1.5 0V3h-5V1.75A.75.75 0 0 0 4.75 1ZM3.5 7a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v4.5a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1V7Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <span className="truncate">Validade : {user.validity}</span>
                            </div>
                            <div className="mt-2">
                                <a href="">
                                    <button className="p-1 w-full bg-green-600 rounded-md text-sm hover:bg-green-700 duration-300">RENOVAR PLANO</button>
                                </a>
                            </div>
                        </div>
                    </div>
                    <ul className="mt-4">
                        <li className="p-4 hover:bg-gray-800 transition">
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
                        showingNavigationDropdown ? "block" : "hidden"
                    }`}
                    onClick={() => setShowingNavigationDropdown(false)}
                ></label>
                <a href="/">
                    <h1 className="font-bold">Hacker Blaze</h1>
                </a>

                <button
                    id="logout"
                    onClick={handleLogout}
                    disabled={processing}
                    type="button"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                    >
                        <rect width="256" height="256" fill="none"></rect>
                        <polyline
                            points="174 86 216 128 174 170"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="16"
                        ></polyline>
                        <line
                            x1="104"
                            y1="128"
                            x2="216"
                            y2="128"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="16"
                        ></line>
                        <path
                            d="M104,216H48a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8h56"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="16"
                        ></path>
                    </svg>
                </button>
            </header>
            <main className="flex-grow p-4 mt-16">{children}</main>
            <footer className="footerContainer">
                <div className="footerCo2">
                    <a href="/">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                            />
                        </svg>
                        Início
                    </a>
                    <a href="/catalogador">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
                            />
                        </svg>
                        Catalogador
                    </a>
                    <a href="/saque">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                            />
                        </svg>
                        Notificações
                    </a>
                </div>
            </footer>
        </div>
    );
}
