import React, { useState } from 'react';
import { useRouter } from 'next/router';

{/**Fran  */ }
type Product = {
    id: number;
    title: string;
    category: string;
    price: number;
    description: string;
    image: string;
};

{/**Esto lo hice yo xd */ }
function Index() {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [category, setCategory] = useState('');

    const getApi = async () => {
        try {
            const api = "https://fakestoreapi.com/products";
            const response = await fetch(api);
            const data = await response.json();
            setProducts(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    if (products.length === 0) {
        getApi();
    }

    {/**Filtro creado por Franco */ }
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value);
    };

    const filteredProducts = category
        ? products.filter((product) => product.category === category)
        : products;

    return (
        <>
            <button onClick={() => router.push("/")}>Volver al Inicio</button>

            {/**Fran  */}

            <div className='backgroundColor: red'>
                <h1 className='text-xl font-bold text-black sm:text-3xl text-center max-w-md mx-auto mt-7'>Productos</h1>
                <select value={category} onChange={handleCategoryChange}>
                    <option value="">Todas las categorias</option>
                    <option value="electronics">Electrónica</option>
                    <option value="jewelery">Joyas</option>
                    <option value="men's clothing">Ropa de Hombre</option>
                    <option value="women's clothing">Ropa de Mujer</option>
                </select>
                <ul>
                    {filteredProducts.map((product) => (
                        <li key={product.id}>
                            <h2>{product.title}</h2>
                            <p>Categoría: {product.category}</p>
                            <p>Precio: ${product.price}</p>
                            <p>{product.description}</p>
                            <img src={product.image} alt={product.title} width="200" />
                        </li>
                    ))}
                </ul>
            </div>
            {/**Yo */}
            <ul>
                {products.map((product: Product, index) => (
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
    );
}

export default Index;
