'use client';

import { useState } from "react";

export default function AddToCart({ product }: { product: any }) {
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        if (typeof window === "undefined") return;

        const cart = JSON.parse(localStorage.getItem("audelweissCart") || "[]");

        const existingIndex = cart.findIndex((item: any) => item.id === product.id);

        if (existingIndex !== -1) {
            // Le produit est déjà dans le panier → on met à jour la quantité
            cart[existingIndex].quantity += quantity;
        } else {
            // Nouveau produit
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity,
                image: product.cover?.url || '',
            });
        }

        localStorage.setItem("audelweissCart", JSON.stringify(cart));
        alert("Produit ajouté au panier !");
    };

    return (
        <div className="mt-4 flex items-center">
            <input
                type="number"
                min={1}
                max={100}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-17 pr-4 px-3 py-2 border-none bg-gray-300 appearance-none"
            />
            <button
                type="button"
                className="bg-pink-400 text-white px-4 py-2 hover:bg-black cursor-pointer transition"
                onClick={handleAddToCart}
            >
                Ajouter au panier
            </button>
        </div>
    );
}
