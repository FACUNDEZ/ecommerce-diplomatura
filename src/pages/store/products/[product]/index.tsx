import Image from "next/image"

function index({ producto }: { producto: any }) {
    return (
        <>
            <Image width={400} height={400} src={producto.image} alt="image-product"></Image>
            <p>{producto.price}</p>
            <div className="flex">
                {[0,1,2,3,4].map((index) => (
                    <svg width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffec00" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" stroke-width="0" fill="#ffec00" />
                    </svg>
                ))}
            </div>
        </>
    )
}

export async function getServerSideProps(context: any) {
    try {
        const res = await fetch("https://fakestoreapi.com/products")
        const datos = await res.json()

        console.log(datos[0].rating)

        const productoABuscar = context.params.product
        const producto = datos.find((product: any) => product.title === productoABuscar)

        return {
            props: {
                producto,
            },
        }

    } catch (error) {
        console.log(error)
    }
}

export default index