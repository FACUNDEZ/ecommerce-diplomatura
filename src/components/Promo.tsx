import { product } from '@/types/components.types';
import { useState, useEffect, FormEvent, useRef } from 'react';
import { useRouter } from 'next/router';
import { io } from 'socket.io-client';
import Image from 'next/image';

let socket: any

type Mensaje = {
    username: string;
    contenido: string;
}

function Promo() {
    const router = useRouter()
    const [products, setProducts] = useState([]);

    const [message, setMessage] = useState("");
    const [username, setUserName] = useState("")
    const [todosLosMensajes, setTodosLosMensajes] = useState([]);

    const [chat, setChat] = useState(false)

    const toggleChat = () => {
        setChat(true)
    }

    useEffect(() => {
        iniciarSockets();

        return () => {
            socket.disconnect();
        };
    }, []);

    function iniciarSockets() {
        fetch("/api/socket");

        socket = io();

        socket.on("chat:mensaje", (mensajeNuevo: string) => {
            //@ts-ignore
            setTodosLosMensajes((mensajesAnteriores) => [
                ...mensajesAnteriores,
                mensajeNuevo,
            ]);
        });
    }

    function manejarEnvioDeMensaje(evento: FormEvent) {
        evento.preventDefault();

        console.log("Mensaje enviado!");

        if (message === "") {
            alert('escribe algo')
            return
        }

        socket.emit("chat:mensaje", { username, contenido: message });

        setMessage("");
    }

    const getApi = async () => {
        try {
            const api = "https://fakestoreapi.com/products";
            const response = await fetch(api);
            const data = await response.json();


            const firstTwoProducts = data.filter((product: any, index: any) => index < 2)
            setProducts(firstTwoProducts);
        } catch (error) {
            console.log(error);
        }
    };

    if (products.length === 0) {
        getApi();
    }

    return (
        <>
            <section className='relative'>
                <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
                        <div className="grid p-6 bg-gray-100 rounded place-content-center sm:p-8">
                            <div className="max-w-md mx-auto text-center lg:text-left">
                                <header>
                                    <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">PROMOS 2X1</h2>
                                    <p className="mt-4 text-gray-500">
                                        Aprovecha estas ofertas especiales y llevate dos productos a un precio!
                                    </p>
                                </header>
                                <button
                                    onClick={() => router.push("/store")}
                                    className="inline-block px-12 py-3 mt-8 text-sm font-medium text-white transition bg-gray-900 border border-gray-900 rounded hover:shadow focus:outline-none focus:ring"
                                >
                                    Comprar
                                </button>
                            </div>
                        </div>

                        <div className="lg:col-span-2 lg:py-8">
                            <ul className="grid grid-cols-2 gap-4">
                                {products.map((product: product, index) => (
                                    <li key={index}>
                                        <a href={`/store/products/${product.title}`} className="block group">
                                            <Image
                                                src={product.image}
                                                className="object-cover w-full rounded aspect-square"
                                                alt='product'
                                            />
                                            <div className="mt-3">
                                                <h3 className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4">
                                                    {product.title}
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-700">${product.price}</p>
                                            </div>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <button onClick={toggleChat} className='rounded bg-black text-white p-3 fixed right-10 bottom-10'>Abrir Chat</button>
                {chat && (
                    <div className="fixed bottom-0 right-0 mb-10 mr-10 bg-white p-4 border rounded w-96 h-96 flex flex-col">
                        <button onClick={() => setChat(false)} className='text-right'>Cerrar</button>
                        <section className="chat-container flex-1 overflow-y-auto">
                            <article className="chat-window">
                                <div id="output">
                                    <ul className="text-black">
                                        {todosLosMensajes.map((mensaje: Mensaje, index) => (
                                            <li key={index}>
                                                <span>
                                                    {mensaje.username}: {mensaje.contenido}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </article>
                        </section>

                        <div className="flex mt-2">
                            <form onSubmit={manejarEnvioDeMensaje}>
                                <input onChange={(evento) => setUserName(evento.target.value)} type="text" placeholder="Nombre" className="mr-2 p-2 border rounded" />
                                <input onChange={(evento) => setMessage(evento.target.value)} type="text" placeholder="Mensaje" className="mr-2 p-2 border rounded" />
                                <input type='submit' value="Enviar" className="bg-black text-white px-4 py-2 rounded cursor-pointer" />
                            </form>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
}

export default Promo;
