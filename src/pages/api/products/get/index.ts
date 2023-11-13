import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function getProducts(req: any, res: any) {
    const getProduct = await prisma.productos.findMany()

    if (!getProduct) {
        return res.status(400).json({ error: "No se pudo obtener los datos"})
    }

    return res.status(200).json({msg: "Datos obtenidos!", getProduct})
}