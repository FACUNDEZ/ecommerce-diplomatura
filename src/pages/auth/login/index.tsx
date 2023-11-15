import { useRef, FormEvent, useContext } from "react"
import { useRouter } from "next/navigation"
import { UserContext } from "@/context/UserContext"

function index() {
    const router = useRouter()

    const emailRef = useRef("")
    const passwordRef = useRef("")

    const { user, setUser }: any = useContext(UserContext)

    const getApi = async () => {
        try {
            const api = "http://localhost:3000/api/usuarios/login"
            const response = await fetch(api, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                //@ts-ignore
                body: JSON.stringify({ email: emailRef.current?.value, password: passwordRef.current?.value })
            })
            const data = await response.json()

            if (response.status === 200 && data.authorized) {
                alert(data.msg)
                router.push("/")
            } else {
                alert(data.msg)
                return
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function enviarFormulario(event: FormEvent) {
        event.preventDefault()

        //@ts-ignore
        if (!emailRef.current?.value || !passwordRef.current?.value) {
            alert("Completa los datos, por favor")
            return
        }

        //@ts-ignore
        setUser({ email: emailRef.current?.value })

        await getApi()
    }

    return (
        <>
            <button className="text-md text-white font-semibold p-3 mt-4 ml-3 rounded-md bg-gray-300" onClick={() => router.push("/")} >Volver al Inicio</button>
            <div className="mx-auto max-w-screen-xl py-48 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg text-center">
                    <h1 className="text-3xl font-bold sm:text-3xl">Iniciar Sesión</h1>
                </div>

                <form onSubmit={enviarFormulario} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>

                        <div className="relative">
                            <input
                                //@ts-ignore
                                ref={emailRef}
                                type="email"
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Ingresar email"
                            />

                            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                    />
                                </svg>
                            </span>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>

                        <div className="relative">
                            <input
                                //@ts-ignore
                                ref={passwordRef}
                                type="password"
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Ingresar contraseña"
                            />

                            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                </svg>
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                            No tienes cuenta?
                            <a className="underline ml-1 cursor-pointer" onClick={() => router.push("/auth/register")}>Regístrate</a>
                        </p>

                        <button
                            type="submit"
                            className="inline-block rounded-lg bg-black px-5 py-3 text-sm font-medium text-white"
                        >
                            Iniciar Sesión
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default index