import { FormEvent, useRef, useContext } from "react"
import { useRouter } from "next/navigation"
import { UserContext } from "@/context/UserContext"

function Index() {
    const router = useRouter()

    const nameRef = useRef(null)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const { user, setUser }: any = useContext(UserContext)

    const getApi = async () => {
        try {
            const api = "http://localhost:3000/api/usuarios/register"
            const response = await fetch(api, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                //@ts-ignore
                body: JSON.stringify({ name: nameRef.current?.value, email: emailRef.current?.value, password: passwordRef.current?.value })
            })
            const data = await response.json()

            if (response.status === 200) {
                alert(data.msg)
                router.push("/")
            } else {
                alert(data.msg)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function enviarForm(e: FormEvent) {
        e.preventDefault()

        //@ts-ignore
        if (!nameRef.current?.value || !emailRef.current?.value || !passwordRef.current?.value) {
            alert("Completa los datos, por favor")
            return
        }

        //@ts-ignore
        setUser({ email: emailRef.current?.value })

        await getApi()
    }

    return (
        <>
            <button className="text-md font-semibold p-3 text-white mt-4 ml-3 rounded-md bg-gray-300" onClick={() => router.push("/")} >Volver al Inicio</button>
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg">
                    <h1 className="text-center text-2xl font-bold text-black sm:text-3xl">
                        Obtén el producto que quieras al mejor precio!
                    </h1>

                    <form
                        onSubmit={enviarForm}
                        className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                    >
                        <p className="text-center text-xl font-bold">Regístrate</p>

                        <div>
                            <label htmlFor="name" className="sr-only">Nombre</label>

                            <div className="relative">
                                <input
                                    ref={nameRef}
                                    type="name"
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Ingrese su nombre"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="sr-only">Correo electrónico</label>

                            <div className="relative">
                                <input
                                    ref={emailRef}
                                    type="email"
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Ingrese su correo electrónico"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="sr-only">Contraseña</label>

                            <div className="relative">
                                <input
                                    ref={passwordRef}
                                    type="password"
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Ingrese su contraseña"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="block w-full rounded-lg bg-gray-300 px-5 py-3 text-sm font-medium text-white"
                        >
                            Regístrarse
                        </button>

                        <p className="text-center text-sm text-gray-500">
                            Ya tienes una cuenta?
                            <a className="underline ml-1 cursor-pointer" onClick={() => router.push("/auth/login")} >Inicia Sesión</a>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Index