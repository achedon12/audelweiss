"use client";

import { useState } from "react";
import Link from "next/link";
import AddToCart from "@/app/product/[slug]/AddToCart";
import { getStrapiMedia } from "@/app/utils/api-helpers";
import Carousel from "react-multi-carousel";

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 1280 },
        items: 3,
    },
    desktop: {
        breakpoint: { max: 1280, min: 1024 },
        items: 2,
    },
    tablet: {
        breakpoint: { max: 1024, min: 640 },
        items: 1,
    },
    mobile: {
        breakpoint: { max: 640, min: 0 },
        items: 1,
    },
};

export default function ProductClient({ product, comments }: any) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [comment, setComment] = useState("");
    const [website, setWebsite] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    function formatDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const url = process.env.NEXT_PUBLIC_STRAPI_API_URL;
            const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
            console.log(product)
            if (!url || !token) {
                throw new Error("Le token API n'est pas défini.");
            }

            const res = await fetch(`${url}/api/product-comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    data: {
                        name,
                        email,
                        website,
                        comment,
                        product: product.id,
                    },
                }),
            });

            if (!res.ok) {
                throw new Error(res.statusText || "Erreur lors de l'envoi du commentaire");
            }

            setSuccessMessage("Merci pour votre commentaire ! Il sera publié après approbation.");
            setName("");
            setEmail("");
            setComment("");
            setWebsite("");

        } catch (error) {
            console.error("Erreur lors de l'envoi du commentaire :", error);
            setSuccessMessage("Une erreur est survenue. Veuillez réessayer.");
        }
    };


    return (
        <div>
            <nav className="text-sm text-white mb-4 bg-awsalmon m-0 pl-75 pt-5 pb-5">
                <ol className="list-reset flex">
                    <li>
                        <Link href="/" className="underline">
                            Accueil
                        </Link>
                    </li>
                    <li className="mx-2">/</li>
                    <li>
                        <Link href="/shop" className="underline">
                            Boutique
                        </Link>
                    </li>
                    <li className="mx-2">/</li>
                    <li>{product.name}</li>
                </ol>
            </nav>

            <div className="ml-80 mt-20 mr-80 pb-20">
                <div className="flex pb-20">
                    <img
                        src={getStrapiMedia(product.cover?.url)}
                        alt={product.name}
                        className="mr-20"
                        style={{ width: "60vh", height: "60vh", objectFit: "cover" }}
                    />
                    <div>
                        <h2 className="text-4xl mb-2">{product.name}</h2>
                        <div className="flex mb-10">
                            <p>Catégorie(s) :</p>
                            <p className="text-awsalmon">
                                {product.product_categories?.map((cat: any) => cat.name).join(", ")}
                            </p>
                        </div>
                        <div className="flex items-center space-x-1 mb-1">
                            {[...Array(5)].map((_, i) => (
                                <svg
                                    key={i}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill={i < Math.round(product.note || 0) ? "#F87171" : "none"}
                                    viewBox="0 0 24 24"
                                    stroke="#F87171"
                                    className="w-4 h-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.074 6.36a1 1 0 00.95.69h6.713c.969 0 1.371 1.24.588 1.81l-5.435 3.95a1 1 0 00-.364 1.118l2.074 6.36c.3.921-.755 1.688-1.54 1.118l-5.435-3.95a1 1 0 00-1.176 0l-5.435 3.95c-.785.57-1.838-.197-1.54-1.118l2.074-6.36a1 1 0 00-.364-1.118L2.34 11.787c-.783-.57-.38-1.81.588-1.81h6.713a1 1 0 00.95-.69l2.074-6.36z"
                                    />
                                </svg>
                            ))}
                        </div>
                        <p className="mt-5">{product.short_description}</p>
                        <h2 className="text-3xl text-pink-400 mt-6">{product.price} €</h2>
                        <AddToCart product={product} />
                    </div>
                </div>

                {/* Commentaire */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-2xl font-bold mb-4">Soumettre un commentaire</h3>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {!successMessage ? (
                            <>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Nom
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                                        Commentaire
                                    </label>
                                    <textarea
                                        id="comment"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        rows={4}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                                        Site Web (optionnel)
                                    </label>
                                    <input
                                        type="url"
                                        id="website"
                                        value={website}
                                        onChange={(e) => setWebsite(e.target.value)}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-awpink hover:bg-awpink/80 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Soumettre le commentaire
                                </button>
                            </>
                        ) : (
                            <p className="text-green-600 mt-4 text-center">{successMessage}</p>
                        )}
                    </form>
                </div>
                <div className="w-full mt-8">
                    <h2 className="text-2xl font-bold mb-4">Commentaires</h2>
                    {comments.data && comments.data.length > 0 ? (
                        <Carousel
                            responsive={responsive}
                            additionalTransfrom={0}
                            arrows
                            infinite
                            containerClass="py-2"
                            itemClass="px-2"
                        >
                            {comments.data.map((c: any) => (
                                <div key={c.id} className="bg-white rounded-lg shadow-md p-4">
                                    <div className="flex items-center mb-2">
                                        <span className="font-semibold">{c.name}</span>
                                    </div>
                                    <p className="text-gray-700 mb-2">{c.comment}</p>
                                    <p className="text-sm text-gray-500">
                                        Publié le {formatDate(c.publishedAt)}
                                    </p>
                                </div>
                            ))}
                        </Carousel>
                    ) : (
                        <p className="text-gray-500">Aucun commentaire pour le moment.</p>
                    )}
                </div>

            </div>
        </div>
    );
}
