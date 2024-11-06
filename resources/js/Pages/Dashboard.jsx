import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

import toast, { Toaster } from "react-hot-toast";
import "@/css/dashboard.css";
import { useState } from "react";
import Spinner from "@/Components/Spinner";

export default function Dashboard({ services, user }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [email, setEmail] = useState(""); // State for email
    const [password, setPassword] = useState(""); // State for password
    const [isLoading, setIsLoading] = useState(false); // State for password
    const [modalBlazeConnect, setModalBlazeConnect] = useState(user.connected_blaze); // State for password

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const openModal2 = () => {
        setIsModalOpen2(true);
    };

    const closeModal2 = () => {
        setIsModalOpen2(false);
    };
    const handleServiceClick = (status, route) => {
        if (status === 1) {
            toast.error("Serviço inativo! Não é possível acessar.");
        } else {
            window.location.href = route;
        }
    };
    const handleLogin = async () => {
        try {
          setIsLoading(true)
            const response = await fetch("/connect/blaze", {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                    "X-CSRF-TOKEN": user.csrf_token,
                },
                body: JSON.stringify({ username: email, password: password }), // Passando email e password
            });

            if (!response.ok) {
              setIsLoading(false)
                throw new Error("Falha ao realizar login");
            }

            const data = await response.json();
            console.log(data); // Exibe a resposta no console
            setModalBlazeConnect(1);
            toast.success("Login realizado com sucesso!");
            setIsLoading(false)
          } catch (error) {
            console.error("Erro ao realizar login:", error);
            toast.error("Erro ao realizar login.");
        }
    };
    return (
        <AuthenticatedLayout>
            <Toaster />
            <Head title="Dashboard" />
            {modalBlazeConnect == 0 && (
            <div className="modalconectblaze">
                <div className="modalLogin">
                    <div className="logoblaze">
                        <img
                            src="https://blaze1.space/static/media/logo.cf45d2ad.svg"
                            alt=""
                        />
                    </div>
                    <div className="text-center">
                        <span className="text-sm text-center">
                            Realize o Login na blaze para continuar seu acesso!
                        </span>
                    </div>
                    <div className="inputblaze">
                        <input
                            type="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="inputblaze">
                        <input
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="buttonLoginBlaze">
                        <button onClick={handleLogin} disabled={isLoading}>
                          {isLoading ? (
                            <Spinner/>
                          ) : (
                            <span>LOGIN</span>
                          )}
                        </button>
                    </div>
                    <div className="createAccount">
                        <span>
                            Não tem conta? <a href="">Registre-se AQUI</a>
                        </span>
                    </div>
                </div>
            </div>
            )}

            <div className="homeGameList">
                {services.map((service) => (
                    <a
                        key={service.id || index}
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handleServiceClick(
                                service.blocked,
                                service.route_redirect
                            );
                        }}
                    >
                        <img
                            src={`/storage/${service.image_url}`}
                            alt={service.name}
                        />
                        <div className="flex justify-between p-2 bg-gray-800 divnamegame">
                            <span>{service.name}</span>

                            <span>
                                {service.blocked === 1
                                    ? "Inativo 🔴 "
                                    : "Ativo 🟢"}
                            </span>
                        </div>
                    </a>
                ))}
            </div>
            <header className="textTitle">
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                    >
                        <path d="M224,152v56a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V152a8,8,0,0,1,16,0v56H208V152a8,8,0,0,1,16,0Zm-101.66,5.66a8,8,0,0,0,11.32,0l40-40a8,8,0,0,0-11.32-11.32L136,132.69V40a8,8,0,0,0-16,0v92.69L93.66,106.34a8,8,0,0,0-11.32,11.32Z"></path>
                    </svg>
                </div>
                <span>Instalação do App</span>
            </header>
            <div className="homeAppContent">
                <button type="button" onClick={openModal}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                    >
                        <path d="M128.23,30A40,40,0,0,1,167,0h1a8,8,0,0,1,0,16h-1a24,24,0,0,0-23.24,18,8,8,0,1,1-15.5-4ZM223.3,169.59a8.07,8.07,0,0,0-2.8-3.4C203.53,154.53,200,134.64,200,120c0-17.67,13.47-33.06,21.5-40.67a8,8,0,0,0,0-11.62C208.82,55.74,187.82,48,168,48a72.23,72.23,0,0,0-40,12.13,71.56,71.56,0,0,0-90.71,9.09A74.63,74.63,0,0,0,16,123.4a127,127,0,0,0,40.14,89.73A39.8,39.8,0,0,0,83.59,224h87.68a39.84,39.84,0,0,0,29.12-12.57,125,125,0,0,0,17.82-24.6C225.23,174,224.33,172,223.3,169.59Z"></path>
                    </svg>{" "}
                    iOS
                </button>
                <button type="button" onClick={openModal2}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                    >
                        <path d="M207.06,88.67c-.74-.74-1.49-1.46-2.24-2.17l24.84-24.84a8,8,0,0,0-11.32-11.32l-26,26a111.43,111.43,0,0,0-128.55.19L37.66,50.34A8,8,0,0,0,26.34,61.66L51.4,86.72A113.38,113.38,0,0,0,16,169.13V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V168A111.25,111.25,0,0,0,207.06,88.67ZM92,168a12,12,0,1,1,12-12A12,12,0,0,1,92,168Zm72,0a12,12,0,1,1,12-12A12,12,0,0,1,164,168Z"></path>
                    </svg>{" "}
                    Android
                </button>
            </div>
            {isModalOpen2 && (
                <div className="appModal">
                    <header>
                        <div>
                            <h3>
                                Instalação <span>Android</span>
                            </h3>
                            <small>
                                Siga os para instalar de maneira correta no seu
                                smartphone
                            </small>
                        </div>
                        <button type="button" onClick={closeModal2}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                viewBox="0 0 256 256"
                            >
                                <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
                            </svg>
                        </button>
                    </header>
                    <ul>
                        <li>
                            <div>1</div>
                            <span className="flex">
                                Clique no icone de "Mais opções" no canto
                                superior direito
                                <span className="flex">
                                    (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="1em"
                                        height="1em"
                                        fill="currentColor"
                                        viewBox="0 0 256 256"
                                    >
                                        <path d="M156,128a28,28,0,1,1-28-28A28,28,0,0,1,156,128ZM128,76a28,28,0,1,0-28-28A28,28,0,0,0,128,76Zm0,104a28,28,0,1,0,28,28A28,28,0,0,0,128,180Z"></path>
                                    </svg>
                                    )
                                </span>
                            </span>
                        </li>
                        <li>
                            <div>2</div>
                            <span>
                                Depois clique em "Instalar Aplicativo" ou
                                "Adicionar a tela Inicial"
                            </span>
                        </li>
                        <li>
                            <div>3</div>
                            <span>
                                Confirme a ação clicando em "Instalar" no popup
                                que aparece na tela
                            </span>
                        </li>
                    </ul>
                </div>
            )}
            {isModalOpen && (
                <div className="appModal">
                    <header>
                        <div>
                            <h3>
                                Instalação <span>iOS</span>
                            </h3>
                            <small>
                                Siga os para instalar de maneira correta no seu
                                smartphone
                            </small>
                        </div>
                        <button type="button" onClick={closeModal}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                viewBox="0 0 256 256"
                            >
                                <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
                            </svg>
                        </button>
                    </header>
                    <ul>
                        <li>
                            <div>1</div>
                            <span>Abra o aplicativo no Safari</span>
                        </li>
                        <li>
                            <div>2</div>
                            <span>
                                Clique no icone de "compartilhamento" no canto
                                inferior do smartphone
                            </span>
                        </li>
                        <li>
                            <div>3</div>
                            <span>Clique em "Adicionar á tela de inicio</span>
                        </li>
                        <li>
                            <div>4</div>
                            <span>
                                Clique em "Adicionar" no canto superior direito
                            </span>
                        </li>
                    </ul>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
