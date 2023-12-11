"use client"
import { useContext } from "react"
import { CartContext } from '@/context/CartContext';
import { product } from "@/types/components.types";
import { useRouter } from "next/router";
import { UserContext } from "@/context/UserContext";
import Image from "next/image";

function Index() {
    const router = useRouter()
    const { cart }: any = useContext(CartContext)
    const { user }: any = useContext(UserContext)

    const pagar = async () => {
        try {
            const api = "http://localhost:3000/api/checkout";
            const respuesta = await fetch(api, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user, cart }),
            });
            const data = await respuesta.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    async function enviarCompra() {
        await pagar();
    }

    return (
        <>
            <button onClick={() => router.push("/")}>Volver al Inicio</button>
            <h1 className='font-bold text-4xl text-center'>Cart</h1>
            <div
                className="relative w-screen max-w-sm border border-gray-600 my-24 m-auto bg-gray-100 px-4 py-8 sm:px-6 lg:px-8"
                aria-modal="true"
                role="dialog"
            >

                {!cart || !cart.products || !cart.price ? (
                    <p>No has seleccionado ningún producto.</p>
                ) : (
                    <div className="mt-4 space-y-6">
                        <ul className="space-y-4">
                            {cart.products.map((product: product, index: number) => (
                                <li className="flex items-center gap-4" key={index}>
                                    <Image
                                        src={product.image}
                                        alt="image-product"
                                        className="h-16 w-16 rounded object-cover"
                                    />

                                    <div>
                                        <h3 className="text-sm text-gray-900">{product.title}</h3>

                                        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                                            <div>
                                                <dt className="inline">Categoria:</dt>
                                                <dd className="inline">{product.category}</dd>
                                            </div>

                                            <div>
                                                <dt className="inline">Precio:</dt>
                                                <dd className="inline">${product.price}</dd>
                                            </div>
                                        </dl>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <span>Precio Total: ${cart.price}</span>
                        <div className="space-y-4 text-center">
                            <button
                                onClick={enviarCompra}
                                className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
                            >
                                Continuar Comprando
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}


export default Index