import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import VideoFundo from "../../Assets/3585079191-preview.mp4_1728018529513.mp4";
import toast, { Toaster } from "react-hot-toast";
import Logo from "../../Assets/DOUBLE.webp";
import Spinner from "@/Components/Spinner";
import "../../css/login.css";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        const loginToast = toast.loading("Logging in...");

        post(route("login"), {
            onFinish: () => {
                reset("password");
                // Dismiss the loading toast
                toast.dismiss(loginToast);
            },
            onSuccess: () => {
                // Display a success message
                toast.success("Login bem sucedido!");
            },
            onError: (errors) => {
                // Display an error message
                toast.error("O Login falhou. Por favor, verifique suas credenciais.");
            },
        });
    };

    return (
        <div className="bg-gray-800 h-screen w-full flex justify-center items-center bgintents">
            <Toaster />
            <div class="video-background">
                <video autoPlay loop muted>
                    <source src={VideoFundo} type="video/mp4" />
                    Seu navegador não suporta a tag de vídeo.
                </video>
            </div>
            <Head title="Login" />
            <div className="lging">
                <div className="flex justify-center">
                    <img className=" w-32" src={Logo} alt="" />
                </div>
                <div class="group">
                    <svg
                        stroke="currentColor"
                        stroke-width="1.5"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
                        />
                    </svg>
                    <input class="input" type="email" placeholder="E-mail" value={data.email} onChange={(e) => setData("email", e.target.value)} />
                </div>
                <div class="group">
                    <svg
                        stroke="currentColor"
                        stroke-width="1.5"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon"
                    >
                        <path
                            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                            stroke-linejoin="round"
                            stroke-linecap="round"
                        ></path>
                    </svg>
                    <input class="input" type="password" placeholder="Senha"  value={data.password}
                            onChange={(e) => setData("password", e.target.value)} />
                </div>
                <div className="buttonEntrar" id="entrarButton">
                    <button onClick={submit} disabled={processing}>
                    {processing ? (
                                <Spinner className="mr-2" />
                            ) : (
                                "LOGIN"
                            )}
                    </button>
                </div>
                <div className="spacetop"></div>
                <div className="buttonEntrar flex gap-2">
                    <a
                        href=""
                        className="w-full flex justify-center text-white items-center"
                    >
                        <button className="flex justify-center w-full items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                width="24"
                                height="24"
                                viewBox="0 0 32 32"
                                fill="#fff"
                            >
                                <path d="M 11.46875 5 C 7.917969 5 5 7.914063 5 11.46875 L 5 20.53125 C 5 24.082031 7.914063 27 11.46875 27 L 20.53125 27 C 24.082031 27 27 24.085938 27 20.53125 L 27 11.46875 C 27 7.917969 24.085938 5 20.53125 5 Z M 11.46875 7 L 20.53125 7 C 23.003906 7 25 8.996094 25 11.46875 L 25 20.53125 C 25 23.003906 23.003906 25 20.53125 25 L 11.46875 25 C 8.996094 25 7 23.003906 7 20.53125 L 7 11.46875 C 7 8.996094 8.996094 7 11.46875 7 Z M 21.90625 9.1875 C 21.402344 9.1875 21 9.589844 21 10.09375 C 21 10.597656 21.402344 11 21.90625 11 C 22.410156 11 22.8125 10.597656 22.8125 10.09375 C 22.8125 9.589844 22.410156 9.1875 21.90625 9.1875 Z M 16 10 C 12.699219 10 10 12.699219 10 16 C 10 19.300781 12.699219 22 16 22 C 19.300781 22 22 19.300781 22 16 C 22 12.699219 19.300781 10 16 10 Z M 16 12 C 18.222656 12 20 13.777344 20 16 C 20 18.222656 18.222656 20 16 20 C 13.777344 20 12 18.222656 12 16 C 12 13.777344 13.777344 12 16 12 Z"></path>
                            </svg>{" "}
                            Instagram
                        </button>
                    </a>
                    <a
                        href=""
                        className="w-full flex justify-center items-center"
                    >
                        <button className="flex justify-center w-full items-center">
                            Compre aqui
                        </button>
                    </a>
                </div>

                <div className="spacetop"></div>
                <div>
                    <span className="textAttDate">
                        
                        App atualizado em 30/10/2024
                    </span>
                </div>
            </div>
        </div>
    );
}
