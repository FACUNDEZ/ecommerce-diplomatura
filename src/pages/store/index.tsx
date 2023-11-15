import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { CartContext } from '@/context/CartContext';
import { UserContext } from '@/context/UserContext';

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

    const { cart, setCart }: any = useContext(CartContext)
    const { user }: any = useContext(UserContext)

    const [products, setProducts] = useState<Product[]>([]); {/**Fran  */ }
    const [category, setCategory] = useState(''); {/**Fran  */ }

    const getApi = async () => {
        try {
            const api = "https://fakestoreapi.com/products";
            const response = await fetch(api);
            const data = await response.json(); {/**Yo */ }
            setProducts(data);
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
                        <li key={product.id} className='hidden'>
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
            <button className='bg-black text-white p-3 rounded' onClick={() => router.push("/store/cart")}>Mostrar carrito</button>
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
                                <p className="mt-1 text-sm text-gray-700">{product.description}</p>
                            </div>
                        </a>
                        <button onClick={() => {
                            if (!user || !user.email) {
                                alert("Inicia sesión, por favor.")
                            } else {
                                setCart({
                                    products: [...cart.products, product],
                                    price: cart.price + product.price
                                })
                            }
                        }}
                            className='bg-gray-300 p-3'>Agregar al carrito</button>
                    </li>
                ))}
            </ul>

        </>
    );
}

export default Index
