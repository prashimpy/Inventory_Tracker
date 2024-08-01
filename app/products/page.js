// app/products/page.js

"use client";

import React, { useEffect, useState } from 'react';
import { db } from '../../firebase'; // Adjust the path as needed
import { collection, getDocs } from 'firebase/firestore';



const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
    };

    fetchProducts();
  }, []);

  return (
    <main className="p-6 bg-gray-50">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Products</h1>
      </header>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover"/>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
              <div className="mt-2 space-y-1">
                <p className="text-gray-600">Quantity Left: <span className="font-medium">{product.quantity}</span></p>
                <p className="text-gray-600">Price: <span className="font-medium">{product.price}</span></p>
                <p className="text-gray-600">Price: <span className="font-medium">{product.price}</span></p>
              </div>
            </div>
            <div className="flex justify-end p-4 space-x-2">
              <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition-colors duration-300">
                Edit
              </button>
              <button className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-500 transition-colors duration-300">
                Delete
              </button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default ProductsPage;
