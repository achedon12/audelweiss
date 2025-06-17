"use client";
import {FormEvent, useState} from "react";
import {getCreationBySlug} from "@/api/creation/creation-by-slug";

const CreationComment = ({slug}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [comment, setComment] = useState('');
    const [website, setWebsite] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {

            const url = process.env.NEXT_PUBLIC_STRAPI_API_URL;
            const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

            const creation = await getCreationBySlug(slug);
            console.log("Creation data:", creation);

            const res = await fetch(`${url}/api/creation-comments`, {
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
                        creation: creation.data[0].id, // Assurez-vous que la création existe
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
            return;
        }
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4">Soumettre un commentaire</h3>

            <form className="space-y-4" onSubmit={handleSubmit}>
                {!successMessage ? (
                    <>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom</label>
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
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
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
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Commentaire</label>
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
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700">Site Web
                        (optionnel)</label>
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
    )
};

export default CreationComment;