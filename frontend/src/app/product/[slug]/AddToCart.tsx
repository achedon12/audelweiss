'use client';

import { useState } from "react";

export default function AddToCart({ product }: { product: any }) {
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        if (typeof window === "undefined") return;

        const cart = JSON.parse(localStorage.getItem("audelweissCart") || "[]");

        const existingIndex = cart.findIndex((item: any) => item.id === product.id);

        if (existingIndex !== -1) {
            cart[existingIndex].quantity += quantity;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity,
                image: product.cover?.url || '',
            });
        }

        localStorage.setItem("audelweissCart", JSON.stringify(cart));
        setAdded(true);
    };

    const handleMouseEnter = () => {
        if (added) {
            setAdded(false);
        }
    };

    const buttonClass = `px-4 py-2 text-white cursor-pointer transition ${
        added ? "bg-green-500 hover:bg-black" : "bg-pink-400 hover:bg-black"
    }`;

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
                onClick={handleAddToCart}
                onMouseEnter={handleMouseEnter}
                className={buttonClass}
            >
                {added ? "Produit ajouté !" : "Ajouter au panier"}
            </button>
        </div>
    );
}
