import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useContext } from "react"
import { UserContext } from "@/context/UserContext"

function Header() {
    const router = useRouter()

    const { user }: any = useContext(UserContext)

    const [aside, setAside] = useState(false)
    const [cart, setCart] = useState(false)

    const toggleMenu = () => {
        setAside(true)
    }

    const toggleCart = () => {
        setCart(true)
    }

    const [userLogin, setUserLogin] = useState(false)

    return (
        <header className="bg-white">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="md:flex md:items-center md:gap-12">
                        <button onClick={toggleMenu} className="block">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-menu-2" width="35" height="35" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M4 6l16 0" />
                                <path d="M4 12l16 0" />
                                <path d="M4 18l16 0" />
                            </svg>
                        </button>
                    </div>
                    {aside && (
                        <aside id="cta-button-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform sm:translate-x-0" aria-label="Sidebar">
                            <div className="h-full px-3 py-4 overflow-y-auto bg-black">
                                <button onClick={() => (setAside(false))}>
                                    <svg width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M18 6l-12 12" />
                                        <path d="M6 6l12 12" />
                                    </svg>
                                </button>
                                <ul >
                                    <li className="text-white text-xl font-bold pb-3">
                                        <Link href="/store">Productos</Link>
                                    </li>
                                    <li className="text-white text-xl font-bold">
                                        <Link href="/contacto">Contacto</Link>
                                    </li>
                                </ul>
                            </div>
                        </aside>
                    )}

                    {!user || !user.email ? (
                        <div className="flex items-center gap-4">
                            <div className="sm:flex sm:justify-evenly sm:gap-4">
                                <button
                                    onClick={() => router.push("/auth/login")}
                                    className="rounded-md bg-black mr-2 px-5 py-2.5 text-sm font-medium text-white shadow"
                                >
                                    Login
                                </button>

                                <button
                                    onClick={() => router.push("/auth/register")}
                                    className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-black"
                                >
                                    Register
                                </button>

                            </div>
                        </div>
                    ) : (
                        <button onClick={() => router.push("/store/cart")}><svg width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                            <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                            <path d="M17 17h-11v-14h-2" />
                            <path d="M6 5l14 1l-1 7h-13" />
                        </svg></button>
                    )}

                    
                </div>
            </div>
        </header>
    )
}

export default Header