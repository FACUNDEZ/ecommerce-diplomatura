import { useRouter } from "next/router"

function Header() {
    const router = useRouter()
    return (
        <header className="bg-white">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="md:flex md:items-center md:gap-12">
                        <a className="block" href="/">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-menu-2" width="35" height="35" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M4 6l16 0" />
                                <path d="M4 12l16 0" />
                                <path d="M4 18l16 0" />
                            </svg>
                        </a>
                    </div>

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
                </div>
            </div>
        </header>
    )
}

export default Header