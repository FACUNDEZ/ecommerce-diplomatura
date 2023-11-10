import Image from "next/image"
import { product } from "@/types/components.types"

function index({ productos }: { productos: any }) {
    return (
        <ul>
            {productos.map((product: product, index: number) => (
                <li key={index}>
                    <p>{product.title}</p>
                    <Image src={product.image} width={100} height={100} alt="image-product"></Image>
                </li>
            ))}
        </ul>
    )
}

export async function getServerSideProps(context: any) {
    try {
        const categoriaABuscar = context.params.category

        const res = await fetch(`https://fakestoreapi.com/products/category/${categoriaABuscar}`)
        const datos = await res.json()

        const productos = datos.filter((product: any) => product.category === categoriaABuscar)

        return {
            props: {
                productos,
            },
        }

    } catch (error) {
        console.log(error)
    }
}

export default index