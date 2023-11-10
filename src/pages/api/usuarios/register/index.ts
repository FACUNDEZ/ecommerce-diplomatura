import { NextApiRequest, NextApiResponse } from 'next'
import { emailResponse } from '@/types/components.types'
import { PrismaClient } from '@prisma/client'
import { emailRegex, passwordRegex } from '@/utils/regex'
import { sign } from 'jsonwebtoken'
import { encriptarPassword } from '@/utils/crypto'
const prisma = new PrismaClient()

export default async function register(req: NextApiRequest, res: NextApiResponse<emailResponse>) {
    const usuario = req.body

    if (Object.values(usuario).includes(undefined)) {
        return res.status(400).json({ msg: "Datos ingresados ya existen" })
    }

    if (!usuario.email.match(emailRegex)) {
        return res.status(400).json({ msg: "Email inválido. No se cumplió con los caracteres." })
    }

    if (!usuario.password.match(passwordRegex)) {
        return res.status(400).json({ msg: "Contraseña inválida. No se cumplió con los caracteres." })
    }

    const hash = await encriptarPassword(usuario.password)

    const usuarioAGuardar = { ...usuario, password: hash }
    const usuarioSubido = await prisma.usuarios.create({ data: usuarioAGuardar })

    if (!usuarioSubido) {
        return res.status(400).json({ msg: "No se pudo subir el usuario" })
    }

    const token = sign(usuarioAGuardar, process.env.TOKEN_SECRET as string)

    return res.status(201).json({ msg: "Usuario creado correctamente!", token })
} 