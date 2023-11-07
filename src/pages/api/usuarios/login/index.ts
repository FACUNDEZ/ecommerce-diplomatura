import { emailRegex, passwordRegex } from "@/utils/regex"
import { PrismaClient } from "@prisma/client"
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"

const prisma = new PrismaClient()

export default async function login(req: any, res: any) {
    const usuario = req.body

    if (!usuario.email.match(emailRegex)) {
        return res.status(400).json({ error: "Email inválido. No se cumplió con los caracteres." })
    }

    if (!usuario.password.match(passwordRegex)) {
        return res.status(400).json({ error: "Contraseña inválida. No se cumplió con los caracteres." })
    }

    const usuarioEnBD = await prisma.usuarios.findUnique({ where: { email: usuario.email }})

    if (!usuarioEnBD) {
        return res.status(403).json({ msg: "El usuario no existe." })
    }

    const contrasenaAValidar = await compare(usuario.password, usuarioEnBD.password)

    if (!contrasenaAValidar) {
        return res.status(401).json({ error: "Contraseña inválida. Vuelve a intentarlo."})
    }

    const token = sign(usuarioEnBD, process.env.TOKEN_SECRET as string, {
        expiresIn: "7d"
    })

    return res.status(200).json({ msg: "Inicio de sesión exitoso.", token})
}