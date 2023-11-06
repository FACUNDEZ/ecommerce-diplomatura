import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function postProduct(req: any, res: any) {
    const data = req.body

    const newProduct = await prisma.productos.create({ data: data })

    if (!newProduct) {
        return res.status(400).json({ error: "No se pudo crear el producto"})
    }

    return res.status(201).json({ msg: "Producto creado correctamente!" })
}