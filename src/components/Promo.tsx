import React, { useState, useEffect } from 'react';

function Promo() {
    const [products, setProducts] = useState([]);

    const getApi = async () => {
        try {
            const api = "https://fakestoreapi.com/products";
            const response = await fetch(api);
            const data = await response.json();

            
            const firstTwoProducts = data.filter((product: any, index: any) => index < 2)
            setProducts(firstTwoProducts);
        } catch (error) {
            console.log(error);
        }
    };

    getApi();

    return (
        <>
            <section>
                <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
                        <div className="grid p-6 bg-gray-100 rounded place-content-center sm:p-8">
                            <div className="max-w-md mx-auto text-center lg:text-left">
                                <header>
                                    <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">PROMOS 2X1</h2>
                                    <p className="mt-4 text-gray-500">
                                        Aprovecha estas ofertas especiales y llevate dos productos a un precio!
                                    </p>
                                </header>
                                <a
                                    href="#"
                                    className="inline-block px-12 py-3 mt-8 text-sm font-medium text-white transition bg-gray-900 border border-gray-900 rounded hover:shadow focus:outline-none focus:ring"
                                >
                                    Comprar
                                </a>
                            </div>
                        </div>

                        <div className="lg:col-span-2 lg:py-8">
                            <ul className="grid grid-cols-2 gap-4">
                                {products.map((product: any, index) => (
                                    <li key={index}>
                                        <a href="#" className="block group">
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="object-cover w-full rounded aspect-square"
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
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Promo;
