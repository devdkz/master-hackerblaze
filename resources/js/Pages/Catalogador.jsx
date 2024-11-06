import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import "@/css/catalogador.css";
import Spinner from "@/Components/Spinner";
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function Catalogador() {
    const [contagemResults, setContagemResults] = useState({
        whites: 0,
        reds: 0,
        blacks: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0,
        13: 0,
        14: 0,
    });
    
    const COLORS = ["#fff", "#000", "#f22c4c"];

    const [results, setResults] = useState([]); // Ensure results is initialized as an array
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedGame, setGameSelect] = useState(null);
    const [showChart, setShowChart] = useState(false);
    const [dados, setDados] = useState([]); // Array de dados do gráfico
    const [quantidadeResultados, setQuantidadeResultados] = useState(10); // Valor do select

    const handleChangeQuantidade = (event) => {
        const quantidade = parseInt(event.target.value);
        setQuantidadeResultados(quantidade);
        fetchResults(quantidade);
    };
    let toastLoading = null;
    const setdadosContagem = (results) => {
        const updatedData = {
            whites: 0,
            reds: 0,
            blacks: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0,
            11: 0,
            12: 0,
            13: 0,
            14: 0,
        };
        results.forEach((result) => {
            if (result.color === 1) {
                updatedData.reds += 1;
            } else if (result.color === 2) {
                updatedData.blacks += 1;
            } else if (result.color === 0) {
                updatedData.whites += 1;
            }
            if (result.roll >= 1 && result.roll <= 14) {
                updatedData[result.roll] += 1;
            }
        });

        setContagemResults(updatedData); // Update the state with the new counts
    };

    const fetchResults = async (quantity) => {
        try {
            setLoading(true);
            toastLoading = toast.loading("Carregando aguarde...");
            const response = await fetch(`/api/results/double/${quantity}`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();

            setResults(data.results || []);
            setdadosContagem(data.results)
        } catch (error) {
            setError(error.message);
        } finally {
            toast.dismiss(toastLoading);
            setLoading(false);
        }
    };

    const updateResults = async () => {
        try {
            const response = await fetch(`/api/results/double/1`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            const newResult = data.results ? data.results[0] : null;
            if (newResult && (!results.length || results[0].id !== newResult.id)) {
                setResults((prevResults) => {
                    // Adiciona o novo resultado no início e remove o último
                    const updatedResults = [newResult, ...prevResults];
                    if (updatedResults.length > quantidadeResultados) { // ou qualquer que seja o tamanho máximo desejado
                        updatedResults.pop(); // Remove o último item
                    }
                    return updatedResults;
                });
                notifyResult(newResult);
                setdadosContagem();
            }
        } catch (error) {
            console.error("Error fetching new results:", error.message);
        }
    };
    
    const alterGame = (game) => {
        if (game === "double") {
            setGameSelect("double");
            fetchResults(quantidadeResultados);
        } else if (game === "crash") {
            setGameSelect("crash");
        }
    };
    const notifyResult = (result) => {
        if (result.color == 1) {
            toast((t) => (
                <div className="flex items-center justify-center gap-2">
                    <div className="resultdouble red">
                        <div className="entry text-white">{result.roll}</div>
                    </div>
                    <div>
                        <span>Novo resultado {result.roll} Vermelho</span>
                    </div>
                </div>
            ));
        } else if(result.color == 2){
            toast((t) => (
                <div className="flex items-center justify-center gap-2">
                    <div className="resultdouble black">
                        <div className="entry text-white">{result.roll}</div>
                    </div>
                    <div>
                        <span>Novo resultado {result.roll} Preto</span>
                    </div>
                </div>
            ));
        } else if(result.color == 0){
            toast((t) => (
                <div className="flex items-center justify-center gap-2">
                    <div className="resultdouble white">
                        <div className="entry text-white"><img
                                                    src="https://blaze1.space/static/media/white.94e5c072.svg"
                                                    alt="blaze14x"
                                                /></div>
                    </div>
                    <div>
                        <span>Saiu Branco</span>
                    </div>
                </div>
            ));
        }
    };
    const getClassNameByColor = (color) => {
        switch (color) {
            case 1:
                return "resultdouble red";
            case 2:
                return "resultdouble black";
            case 0:
                return "resultdouble white";
            default:
                return "";
        }
    };
    useEffect(() => {
        if (selectedGame === "double") {
            const interval = setInterval(updateResults, 2000); // Atualiza a cada 5 segundos
            return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
        }
    }, [selectedGame, results]);

    const handleToggleChart = () => {
        setShowChart((prev) => !prev);
    };
    return (
        <AuthenticatedLayout>
            <Toaster />
            <Head title="Catalogador" />
            <div>
            

                <h1 className="text-lg font-extrabold mb-4 text-center">
                    CATALOGADOR DE RESULTADOS
                </h1>
            </div>
            <div className="games">
                <div
                    className={`${selectedGame === "double" ? "selected" : ""}`}
                >
                    <button
                        onClick={() => alterGame("double")}
                        className="flex items-center gap-2"
                    >
                        DOUBLE{" "}
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M1 6H0V14H1C1.26522 14 1.51957 13.8946 1.70711 13.7071C1.89464 13.5196 2 13.2652 2 13V7C2 6.73478 1.89464 6.48043 1.70711 6.29289C1.51957 6.10536 1.26522 6 1 6Z"
                                fill="#8C9099"
                            ></path>
                            <path
                                d="M19 6C18.7348 6 18.4804 6.10536 18.2929 6.29289C18.1054 6.48043 18 6.73478 18 7V13C18 13.2652 18.1054 13.5196 18.2929 13.7071C18.4804 13.8946 18.7348 14 19 14H20V6H19Z"
                                fill="#8C9099"
                            ></path>
                            <path
                                d="M9 14V4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V14C4 14.5304 4.21071 15.0391 4.58579 15.4142C4.96086 15.7893 5.46957 16 6 16H9V14Z"
                                fill="#414952"
                            ></path>
                            <path
                                d="M14 4H11V16H14C14.5304 16 15.0391 15.7893 15.4142 15.4142C15.7893 15.0391 16 14.5304 16 14V6C16 5.46957 15.7893 4.96086 15.4142 4.58579C15.0391 4.21071 14.5304 4 14 4Z"
                                fill="#414952"
                            ></path>
                            <path
                                d="M9 19C9 19.2652 9.10536 19.5196 9.29289 19.7071C9.48043 19.8946 9.73478 20 10 20C10.2652 20 10.5196 19.8946 10.7071 19.7071C10.8946 19.5196 11 19.2652 11 19V16H9V19Z"
                                fill="#8C9099"
                            ></path>
                            <path
                                d="M11 1C11 0.734784 10.8946 0.48043 10.7071 0.292893C10.5196 0.105357 10.2652 0 10 0C9.73478 0 9.48043 0.105357 9.29289 0.292893C9.10536 0.48043 9 0.734784 9 1V4H11V1Z"
                                fill="#8C9099"
                            ></path>
                        </svg>
                    </button>
                </div>
                <div
                    className={`${selectedGame === "crash" ? "selected" : ""}`}
                >
                    <button
                        onClick={() => alterGame("crash")}
                        className="flex items-center gap-2"
                    >
                        CRASH{" "}
                        <svg
                            width="21"
                            height="20"
                            viewBox="0 0 21 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M13.14 5C12.69 5.45 12.14 5.64 11.9 5.41C11.66 5.18 11.9 4.63 12.32 4.17C12.74 3.71 13.32 3.53 13.56 3.76C13.8 3.99 13.6 4.53 13.14 5Z"
                                fill="#414952"
                            ></path>
                            <path
                                d="M18 0H2C1.46957 0 0.96086 0.210714 0.585787 0.585786C0.210714 0.960859 0 1.46957 0 2V20C6.28 20 10.6 15.76 12.25 10.67C12.8089 10.8838 13.4016 10.9956 14 11C14.11 11 14.2 11 14.31 11C13.2234 14.7898 10.7158 18.0139 7.31 20H18C18.5304 20 19.0391 19.7893 19.4142 19.4142C19.7893 19.0391 20 18.5304 20 18V2C20 1.46957 19.7893 0.960859 19.4142 0.585786C19.0391 0.210714 18.5304 0 18 0V0ZM14 9C13.4067 9 12.8266 8.82405 12.3333 8.49441C11.8399 8.16476 11.4554 7.69623 11.2284 7.14805C11.0013 6.59987 10.9419 5.99667 11.0576 5.41473C11.1734 4.83279 11.4591 4.29824 11.8787 3.87868C12.2982 3.45912 12.8328 3.1734 13.4147 3.05764C13.9967 2.94189 14.5999 3.0013 15.1481 3.22836C15.6962 3.45542 16.1648 3.83994 16.4944 4.33329C16.8241 4.82664 17 5.40666 17 6C17 6.79565 16.6839 7.55871 16.1213 8.12132C15.5587 8.68393 14.7957 9 14 9Z"
                                fill="#8C9099"
                            ></path>
                            <path
                                d="M19.94 1.54006C19.94 1.45006 19.94 1.35006 19.86 1.26006C19.8414 1.22776 19.8247 1.19436 19.81 1.16006L19.69 0.940059L19.62 0.830059L19.51 0.660059C19.4821 0.618792 19.4485 0.581747 19.41 0.550059L19.22 0.420059L19.08 0.320059C19.0366 0.29081 18.9895 0.267283 18.94 0.250059C18.8034 0.172451 18.6594 0.108797 18.51 0.0600586C18.5241 0.206388 18.5241 0.353729 18.51 0.500059V16.7501C18.51 17.2142 18.3256 17.6593 17.9975 17.9875C17.6693 18.3157 17.2241 18.5001 16.76 18.5001H9.41002C8.74004 19.0592 8.02418 19.561 7.27002 20.0001H18C18.5305 20.0001 19.0392 19.7893 19.4142 19.4143C19.7893 19.0392 20 18.5305 20 18.0001V2.00006C20.0158 1.87054 20.0158 1.73958 20 1.61006C19.9847 1.58307 19.9644 1.5593 19.94 1.54006Z"
                                fill="#414952"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>
            {selectedGame == null && (
                <div className="text-center">
                    <p>Nenhum jogo selecionado.</p>
                </div>
            )}

            {selectedGame == "double" && (
                <div className="resultsDouble">
                    {loading == false && (
                        <div
                            className="rounded-md mb-4"
                            style={{
                                background: "#202024",
                            }}
                        >
                            <div className="p-2 flex justify-between">
                                <span className="text-sm">
                                    Contagem de Resultados
                                </span>
                                <button onClick={handleToggleChart}>
                                    {showChart ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.3}
                                            stroke="currentColor"
                                            className="size-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="m4.5 15.75 7.5-7.5 7.5 7.5"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.2}
                                            stroke="currentColor"
                                            className="size-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {showChart && (
                                <div>
                                    <div className="flex py-5 justify-between mt-2 px-2 items-center">
                                        <div className="flex text-sm items-center gap-2">
                                            <img
                                                className="w-8"
                                                src="https://blaze1.space/static/media/red-0.9cca36d9.svg"
                                                alt=""
                                            />
                                            <span>{contagemResults.reds}</span>
                                        </div>
                                        <div className="flex text-sm items-center gap-2">
                                            <img
                                                className="w-8"
                                                src="https://blaze1.space/static/media/white.94e5c072.svg"
                                                alt=""
                                            />
                                            <span>{contagemResults.whites}</span>
                                        </div>
                                        <div className="flex text-sm items-center gap-2">
                                            <img
                                                className="w-8"
                                                src="https://blaze1.space/static/media/black-0.037f1400.svg"
                                                alt=""
                                            />
                                            <span>{contagemResults.blacks}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 justify-center flex-wrap pb-4">
                                        <div>
                                            <div className="enumerateResults">
                                               {contagemResults[1]}
                                            </div>
                                            <div className="resultdouble red">
                                                <div className="entry">1</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="enumerateResults">
                                               {contagemResults[2]}
                                                
                                            </div>
                                            <div className="resultdouble red">
                                                <div className="entry">2</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="enumerateResults">
                                               {contagemResults[3]}
                                                
                                            </div>
                                            <div className="resultdouble red">
                                                <div className="entry">3</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="enumerateResults">
                                               {contagemResults[4]}
                                                
                                            </div>
                                            <div className="resultdouble red">
                                                <div className="entry">4</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="enumerateResults">
                                               {contagemResults[5]}
                                                
                                            </div>
                                            <div className="resultdouble red">
                                                <div className="entry">5</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="enumerateResults">
                                               {contagemResults[6]}
                                                
                                            </div>
                                            <div className="resultdouble red">
                                                <div className="entry">6</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="enumerateResults">
                                               {contagemResults[7]}
                                                
                                            </div>
                                            <div className="resultdouble red">
                                                <div className="entry">7</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="enumerateResults">
                                               {contagemResults[8]}
                                                
                                            </div>
                                            <div className="resultdouble black">
                                                <div className="entry">8</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="enumerateResults">
                                               {contagemResults[9]}
                                                
                                            </div>
                                            <div className="resultdouble black">
                                                <div className="entry">9</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="enumerateResults">
                                               {contagemResults[10]}
                                                
                                            </div>
                                            <div className="resultdouble black">
                                                <div className="entry">10</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="enumerateResults">
                                               {contagemResults[11]}
                                                
                                            </div>
                                            <div className="resultdouble black">
                                                <div className="entry">11</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="enumerateResults">
                                               {contagemResults[12]}
                                                
                                            </div>
                                            <div className="resultdouble black">
                                                <div className="entry">12</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="enumerateResults">
                                               {contagemResults[13]}
                                                
                                            </div>
                                            <div className="resultdouble black">
                                                <div className="entry">13</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="enumerateResults">
                                                
                                               {contagemResults[14]}
                                            </div>
                                            <div className="resultdouble black">
                                                <div className="entry">14</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    <div className="listDoubleResults">
                        {loading ? (
                            <div className="spinerv24">
                                <Spinner />
                            </div>
                        ) : error ? (
                            <span>Error: {error}</span>
                        ) : (
                            results.map((result, index) => (
                                <div key={result.id}>
                                    <div className="enumerateResults">
                                        {index + 1}
                                    </div>{" "}
                                    {}
                                    <div
                                        className={getClassNameByColor(
                                            result.color
                                        )}
                                    >
                                        <div className="entry">
                                            {/* Certifique-se de que as condições e o retorno estão completos */}
                                            {result.color === 0 ? (
                                                <img
                                                    src="https://blaze1.space/static/media/white.94e5c072.svg"
                                                    alt="blaze14x"
                                                />
                                            ) : (
                                                result.roll
                                            )}
                                        </div>
                                    </div>
                                    <div className="horariosemi2">
                                        {new Date(
                                            result.created_at
                                        ).toLocaleTimeString("pt-BR", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: false,
                                        })}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    {loading == false && (
                        <div className="flex justify-center mt-4">
                            <div className="fi-input-wrp flex rounded-lg shadow-sm ring-1 transition duration-75 bg-white dark:bg-white/5 [&:not(:has(.fi-ac-action:focus))]:focus-within:ring-2 ring-gray-950/10 dark:ring-white/20 [&:not(:has(.fi-ac-action:focus))]:focus-within:ring-primary-600 dark:[&:not(:has(.fi-ac-action:focus))]:focus-within:ring-primary-500">
                                <div className="items-center gap-x-3 ps-3 flex border-e border-gray-200 pe-3 ps-3 dark:border-white/10">
                                    <span className="fi-input-wrp-label whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        Quantidade de Resultados
                                    </span>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <select
                                        onChange={handleChangeQuantidade}
                                        value={quantidadeResultados}
                                        name=""
                                        id=""
                                        className="fi-select-input block w-full border-none bg-transparent py-1.5 pe-8 text-base text-gray-950 transition duration-75 focus:ring-0 disabled:text-gray-500 disabled:[-webkit-text-fill-color:theme(colors.gray.500)] dark:text-white dark:disabled:text-gray-400 dark:disabled:[-webkit-text-fill-color:theme(colors.gray.400)] sm:text-sm sm:leading-6 [&_optgroup]:bg-white [&_optgroup]:dark:bg-gray-900 [&_option]:bg-white [&_option]:dark:bg-gray-900 ps-3"
                                    >
                                        <option value="10">10</option>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="70">70</option>
                                        <option value="100">100</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </AuthenticatedLayout>
    );
}
