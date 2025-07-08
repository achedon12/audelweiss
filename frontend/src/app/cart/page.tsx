"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function CartPage() {
    const [cartItems, setCartItems] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        const cart = localStorage.getItem("audelweissCart");
        if (cart) {
            setCartItems(JSON.parse(cart));
        }
    }, []);

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div>
            <div className="ml-70 mr-70 pt-5">
                <h1 className="pb-10 text-3xl font-semibold">Panier</h1>

                {cartItems.length > 0 ? (
                    <div className="flex items-start gap-10">
                        <div>
                            <table className="table-auto text-left w-full max-w-[900px]">
                                <thead>
                                <tr className="border-b border-gray-400 text-yellow-800">
                                    <th className="p-4">IMAGE</th>
                                    <th className="p-4">PRODUIT</th>
                                    <th className="p-4">PRIX</th>
                                    <th className="p-4">QUANTITÉ</th>
                                    <th className="p-4">TOTAL PRODUIT</th>
                                </tr>
                                </thead>
                                <tbody>
                                {cartItems.map((item, index) => (
                                    <tr key={index} className="border-b border-gray-400">
                                        <td className="p-4">
                                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
                                        </td>
                                        <td className="p-4">{item.name}</td>
                                        <td className="p-4">{item.price}€</td>
                                        <td className="p-4">
                                            <input
                                                type="number"
                                                min={0}
                                                value={item.quantity}
                                                onChange={(e) => {
                                                    const newQuantity = parseInt(e.target.value, 10);
                                                    if (isNaN(newQuantity) || newQuantity < 0) return;

                                                    const updatedItems = [...cartItems];
                                                    updatedItems[index].quantity = newQuantity;
                                                    setCartItems(updatedItems);

                                                    const filteredForStorage = updatedItems.filter(item => item.quantity > 0);
                                                    localStorage.setItem("audelweissCart", JSON.stringify(filteredForStorage));
                                                }}
                                                className="w-16 border p-1 border-gray-400 pt-3 pb-3 text-center"
                                            />
                                        </td>
                                        <td className="p-4">{(item.price * item.quantity).toFixed(2)}€</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>

                            <div>
                                <input
                                    type="text"
                                    placeholder="Code promo"
                                    className="border mt-5 p-2 w-[150px] border-gray-400"
                                />
                                <button className="p-2 pl-4 pr-4 ml-10 hover:bg-amber-100 transition cursor-pointer bg-gray-400">
                                    Valider
                                </button>
                            </div>
                        </div>

                        <aside className="bg-gray-200 p-10 w-[500px] flex flex-col items-center">
                            <h1 className="text-2xl font-semibold mb-10">TOTAUX</h1>

                            <div className="w-full flex justify-between border-b border-gray-400 mb-5 pb-5">
                                <p>Sous-total</p>
                                <p>{total.toFixed(2)}€</p>
                            </div>
                            <div className="w-full flex justify-between border-b border-gray-400 mb-5 pb-5">
                                <p>Shipping</p>
                                <p>Gratuit</p>
                            </div>
                            <div className="w-full flex justify-between mb-10">
                                <p>Total</p>
                                <p>{total.toFixed(2)}€</p>
                            </div>

                            <button
                                onClick={() => router.push("/command")}
                                className="bg-black text-white px-6 py-3 hover:bg-pink-400 hover:cursor-pointer transition duration-200"
                            >
                                Procéder à la commande
                            </button>
                        </aside>
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <p className="text-gray-600 mt-10 mb-10">Oh bah alors ! y'a rien ici 😯</p>
                        <button
                            onClick={() => router.push("/shop")}
                            className="bg-black text-white mb-10 px-6 py-3 hover:bg-pink-400 hover:cursor-pointer transition duration-200"
                        >
                            Retourner sur la boutique
                        </button>
                    </div>
                )}
            </div>
            <div className="bg-gray-100 flex pl-80 pr-80 justify-between pb-10 pt-10">
                <div className="border-r border-gray-400 p-10">
                    <h2 className="pr-10 mt-10 font-semibold">Création de compte</h2>
                    <p>Crée ton compte pour retrouver facilement le détail de ta commande.</p>
                </div>
                <div className="border-r border-gray-400 p-10">
                    <h2 className="pr-10 mt-10 font-semibold">Click & collect</h2>
                    <p>Tu passes par l'embrunais ou bien tu y habites ? Ne paye pas de frais de transport et viens directement récupérer ta commande à l'atelier !</p>
                </div>
                <div className="border-r border-gray-400 p-10">
                    <h2 className="pr-10 mt-10 font-semibold">Paiement sécurisé</h2>
                    <p>Tu peux réaliser ton paiement en toute sécurité via CB ou Paypal.</p>
                </div>
                <div className="p-10">
                    <h2 className="pr-10 mt-10 font-semibold">Suivi d'expédition</h2>
                    <p>Ta commande est préparée avec amour et expédiée avec un code de suivi.</p>
                </div>
            </div>
        </div>
    );
}
