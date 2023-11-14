import { useState } from 'react'
import Image from 'next/image';
import { product } from '@/types/components.types';
import { useRouter } from 'next/router';

function index() {
    const router = useRouter()
    const [products, setProducts] = useState([]);

    const getApi = async () => {
        try {
            const api = "https://fakestoreapi.com/products";
            const response = await fetch(api);
            const data = await response.json();

            setProducts(data);
            console.log(data)
        } catch (error) {
            console.log(error);
        }
    };

    if (products.length === 0) {
        getApi();
    }

    return (
        <>
        <button onClick={() => router.push("/")}>Volver al Inicio</button>
            <ul>
                {products.map((product: product, index) => (
                    <li key={index}>
                        <a href={`/store/products/${product.title}`} className="block group">
                            <img
                                src={product.image}
                                className="w-20 h-20"
                            />
                            <div className="mt-3">
                                <h3 className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4">
                                    {product.title}
                                </h3>
                                <p className="mt-1 text-sm text-gray-700">${product.price}</p>
                            </div>
                        </a>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default index