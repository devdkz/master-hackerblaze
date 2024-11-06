import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import "@/css/game.css";
import BrancoSemGale from "@/Assets/BrancoSemGale.webp";
import Spinner from "@/Components/Spinner";
import LogoTipo from '@/Assets/logo.png';
import axios from "axios";
import io from "socket.io-client";

export default function BrancoDuplo( access_token, user ) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingBet, setIsLoadingBet] = useState(false);
    const [isDisactiveButton, setDisactiveButton] = useState(false);
    const [Horario, setHorario] = useState("--");
    const [Entrada, setEntrada] = useState("--");
    const [TextEntrada, setTextEntrada] = useState("Aguardando Confirmação");
    const [textapostar, setTextApostar] = useState("APOSTAR");
    
    const [bet, setBet] = useState(0);
    const [color, setColor] = useState(0);
    const handleBetChange = (event) => {
        const value = event.target.value;
        setBet(Number(value));  // Garante que o valor seja um número
    };

    const handleColorChange = (event) => {
        const value = event.target.value;
        setColor(Number(value));  // Garante que o valor seja numérico (0, 1, 2)
    };
    const submitBet = async () => {
        setIsLoadingBet(true);

        try {
            const response = await fetch("/apostar/blaze", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                    "X-CSRF-TOKEN": user.csrf_token,
                },
                body: JSON.stringify({ valor: bet, color: color }), // Passando valor e cor da aposta
            });

            if (!response.ok) {
                setIsLoadingBet(false);
                throw new Error("Falha ao realizar aposta");
            }

            const data = await response.json();
            console.log(data); // Exibe a resposta no console

            setModalBlazeConnect(1);
            toast.success("Aposta realizada com sucesso!");
            setIsLoadingBet(false);
        } catch (error) {
            console.error("Erro ao realizar Aposta:", error);
            toast.error("Erro ao realizar Aposta.");
            setIsLoadingBet(false);
        }
    };
    
    const listadePara = [
        "Aguarde...",
        "Não atualize essa página!",
        "Executando I.A",
        "Examinando fonte de Dados",
        "Conectando aos servidores",
        "Investigando possível entrada",
    ];

    const atualizarbotao = (data) => {
        const respt = data[1];
        if (respt.payload.status == "waiting") {
            setTextApostar("APOSTAR");
            setDisactiveButton(false)
        } else if (respt.payload.status == "rolling") {
            setDisactiveButton(true);
            setTextApostar("GIRANDO");
        }
    }
    
    useEffect(() => {
        const socket = new WebSocket("wss://api-gaming.blaze1.space/replication/?EIO=3&transport=websocket"); // Substitua pelo seu URL WebSocket real

        socket.onopen = () => {
          console.log("Conectado ao WebSocket");
          
          socket.send(`420["cmd",{"id":"authenticate","payload":{"token":"${access_token}"}}]`);
          socket.send(`421["cmd",{"id":"subscribe","payload":{"room":"double_room_1"}}]`);
          socket.send(`422["cmd",{"id":"authenticate","payload":{"token":"${access_token}"}}]`);

        };
        socket.onmessage = (event) => {
            try {
              const messagedata = event.data;
          
              // Extraia a parte JSON da mensagem
              const jsonString = messagedata.substring(messagedata.indexOf('[')); // Encontra a primeira ocorrência de "["
          
              const message = JSON.parse(jsonString); 
              atualizarbotao(message)
            } catch (error) {
              console.error("Erro ao parsear a mensagem:", error);
            }
          };
          
          

        socket.onerror = (error) => {
          console.error("Erro WebSocket:", error);
        };
    
        // Quando a conexão for fechada
        socket.onclose = () => {
          console.log("Conexão WebSocket fechada");
        };
    
        // Limpar a conexão ao desmontar o componente
        return () => {
          socket.close();
        };
      }, []); // Executa apenas uma vez, quando o componente for montado
    
    const getRandomMessage = () => {
        const randomIndex = Math.floor(Math.random() * listadePara.length);
        return listadePara[randomIndex];
    };
    const handleConfirmarSinal = async () => {
        setIsLoading(true);
        if(Horario != "--"){
            setHorario("--")
            setEntrada("--")
        }
        setTextEntrada("Aguarde...")
        const loadingToastId1 = toast.loading(getRandomMessage());
        await new Promise((resolve) => setTimeout(resolve, 3000));
        toast.dismiss(loadingToastId1);
        const loadingToastId2 = toast.loading(getRandomMessage());
        await new Promise((resolve) => setTimeout(resolve, 3000));
        toast.dismiss(loadingToastId2);
        const loadingToastId3 = toast.loading(getRandomMessage());
        await new Promise((resolve) => setTimeout(resolve, 3000));
        toast.dismiss(loadingToastId3);
        const loadingToastId4 = toast.loading(getRandomMessage());
        await new Promise((resolve) => setTimeout(resolve, 3000));
        toast.dismiss(loadingToastId4);
        setIsLoading(false);
        const chance = Math.random();
        if (chance < 0.7) {
            setTextEntrada("Entrada Confirmada");
            const agora = new Date();
            agora.setMinutes(agora.getMinutes() + 2);
            const horas = String(agora.getHours()).padStart(2, '0'); // Adiciona zero à esquerda se necessário
            const minutos = String(agora.getMinutes()).padStart(2, '0'); // Adiciona zero à esquerda se necessário
            const horarioString = `${horas}:${minutos}`;
            setHorario(horarioString); 
            setEntrada(`
                <div class="flex justify-center items-center gap-2">
                    <img class="w-8" src="https://blaze1.space/static/media/white.94e5c072.svg" alt="image1"/>
                    <img class="w-8" src="https://blaze1.space/static/media/white.94e5c072.svg" alt="image1"/>
                </div>
            `);
            toast.success("Oportunidade encontrada!");

        } else {
            setTextEntrada("Oportunidade não Encontrada")
            toast.error(
                "Não foi possível encontrar uma entrada segura. Tente novamente!"
            ); 
        }
    };

    useEffect(() => {
        const canvas = document.getElementById("canvas");
        const context = canvas.getContext("2d");

        const W = window.innerWidth;
        const H = window.innerHeight;

        canvas.width = W;
        canvas.height = H;

        const fontSize = 16;
        const columns = Math.floor(W / fontSize);
        const drops = Array(columns).fill(0);
        const str = "JavaScript Hacking Effect";

        function draw() {
            context.fillStyle = "rgba(0,0,0,0.05)";
            context.fillRect(0, 0, W, H);

            context.font = `700 ${fontSize}px Arial`;
            context.fillStyle = "#be0000";

            for (let i = 0; i < columns; i++) {
                const index = Math.floor(Math.random() * str.length);
                const x = i * fontSize;
                const y = drops[i] * fontSize;
                context.fillText(str[index], x, y);

                if (y >= H && Math.random() > 0.99) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        const interval = setInterval(draw, 35);

        // Limpa o intervalo ao desmontar o componente
        return () => clearInterval(interval);
    }, []);
    return (
        <AuthenticatedLayout>
            <Toaster />
            <Head title="Dashboard" />
            <canvas id="canvas"></canvas>
            <div className="gameContent">
                <div className="contentType1">
                    <h1>{TextEntrada}</h1>
                </div>
                <div className="gameContain25">
                    <div className="containerv2">
                        Horário <br /> <b>{Horario}</b>
                    </div>

                    <div className="containerv25">
                        <img src={LogoTipo} alt="image" />
                    </div>
                    <div className="containerv2">
                        Entrada <br /> <div dangerouslySetInnerHTML={{ __html: Entrada }} />
                    </div>
                </div>
            </div>
            <div className="confirmarsinal">
                <button disabled={isLoading} onClick={handleConfirmarSinal}>
                    {isLoading ? (
                        <Spinner />
                    ) : (
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 30 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M25.0869 27.122L17.4562 34.7527C16.6513 35.5576 15.5601 35.9034 14.5099 35.7893C13.7201 35.7034 12.9528 35.358 12.3474 34.7527L4.71669 27.122C4.01181 26.4171 3.65912 25.4927 3.65864 24.5688C3.65815 23.6439 4.01083 22.719 4.71669 22.0132L12.3474 14.3824C13.1308 13.599 14.184 13.2507 15.2079 13.3371C16.0279 13.4063 16.8289 13.7546 17.4562 14.3824L25.0869 22.0132C25.7918 22.718 26.1445 23.642 26.145 24.5659C26.1455 25.4912 25.7928 26.4161 25.0869 27.122ZM29.3123 21.8961L29.3191 21.8932L29.2816 21.7917C29.2533 21.7176 29.2299 21.6434 29.1991 21.5702L24.5713 9.1122L21.786 13.1024L14.905 0C14.905 0 4.05571 16.1371 1.30351 20.2517L1.30937 20.2522C-0.712583 23.2732 -0.394046 27.3961 2.27376 30.0639L9.40547 37.1951C12.4411 40.2307 17.363 40.2307 20.3981 37.1951L27.5299 30.0639C29.7396 27.8537 30.3206 24.6498 29.3123 21.8961Z"
                                fill="rgb(255, 255, 255)"
                            ></path>
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M14.9019 17.1818C13.6623 17.1818 12.6575 18.1866 12.6575 19.4262C12.6575 20.6657 13.6623 21.6705 14.9019 21.6705C16.1414 21.6705 17.1463 20.6657 17.1463 19.4262C17.1463 18.1866 16.1414 17.1818 14.9019 17.1818Z"
                                fill="rgb(255, 255, 255)"
                            ></path>
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M14.9019 27.4645C13.6623 27.4645 12.6575 28.4694 12.6575 29.7089C12.6575 30.9484 13.6623 31.9533 14.9019 31.9533C16.1414 31.9533 17.1463 30.9484 17.1463 29.7089C17.1463 28.4694 16.1414 27.4645 14.9019 27.4645Z"
                                fill="rgb(255, 255, 255)"
                            ></path>
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M20.0433 22.323C18.8038 22.323 17.7989 23.3279 17.7989 24.5674C17.7989 25.8069 18.8038 26.8118 20.0433 26.8118C21.2828 26.8118 22.2877 25.8069 22.2877 24.5674C22.2877 23.3279 21.2828 22.323 20.0433 22.323Z"
                                fill="rgb(255, 255, 255)"
                            ></path>
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M7.51572 24.5674C7.51572 25.8069 8.52059 26.8118 9.76059 26.8118C11.0001 26.8118 12.005 25.8069 12.005 24.5674C12.005 23.3279 11.0001 22.323 9.76059 22.323C8.52059 22.323 7.51572 23.3279 7.51572 24.5674Z"
                                fill="rgb(255, 255, 255)"
                            ></path>
                        </svg>
                    )}
                </button>
            </div>
            <div className="betting">
                <div>
                    <span>Aposta Rápida</span>
                </div>
                <div className="apostar">
                    <input type="number" value={bet} onInput={handleBetChange} placeholder="Valor da Aposta" />
                    <select value={color} onChange={handleColorChange} name="" id="">
                        <option value="0">⚪</option>
                        <option value="1">🔴</option>
                        <option value="2">⚫</option>
                    </select>
                    <button onClick={submitBet} className="flex justify-center items-center" disabled={isLoadingBet || isDisactiveButton}>
                        {isLoadingBet ? (
                            <Spinner />
                        ) : (
                            textapostar
                        )}
                        </button>
                </div>
            </div>
            <div className="frame">
                <iframe
                    src="https://blaze1.space/pt/games/double"
                    frameborder="0"
                ></iframe>
            </div>
        </AuthenticatedLayout>
    );
}
