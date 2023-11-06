import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function register(req: any, res: any) {
    const data = req.body

    const newUser = await prisma.usuarios.create({ data: data })

    if (!newUser) {
        return res.status(400).json({ error: "No se pudo crear el nuevo usuario"})
    }

    return res.status(201).json({ msg: "Usuario creado correctamente!"})
} 