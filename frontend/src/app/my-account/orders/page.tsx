"use client";

import { useEffect, useState } from "react";
import { fetchAPI } from "@/app/utils/fetch-api";

type Receipt = {
    id: number;
    documentId: string;
    createdAt: string;
    file: {
        hash : string;
        url : string;
    }
};

const Page = () => {
    const [receipts, setReceipts] = useState<Receipt[]>([]);
    const [loading, setLoading] = useState(true);

    async function getReceiptsForUser(userId: number) {
        const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
        if (!token) throw new Error("Le token API n'est pas défini.");

        const path = "/receipts?populate=*";
        const urlParamsObject = {
            filters: {
                user: {
                    id: { $eq: userId },
                },
            },
            populate: ["file"],
            sort: ["createdAt:desc"],
        };

        const options = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await fetchAPI(path, urlParamsObject, options);
        console.log(response.data);
        return response.data;
    }

    useEffect(() => {
        async function loadReceipts() {
            try {
                const userId = 1; // ⛔️ Remplace ça par le vrai ID utilisateur connecté
                const res = await getReceiptsForUser(userId);
                setReceipts(res);
            } catch (error) {
                console.error("Erreur de chargement des reçus :", error);
            } finally {
                setLoading(false);
            }
        }

        loadReceipts();
    }, []);

    return (
        <div className="max-w-xl mx-auto py-12 px-4">
            <h1 className="text-2xl font-bold mb-6">Vos commandes</h1>
            {loading ? (
                <p>Chargement des factures...</p>
            ) : receipts.length === 0 ? (
                <p>Aucune facture trouvée.</p>
            ) : (
                <ul className="space-y-4">
                    {receipts.map((receipt) => {
                        const { createdAt, file } = receipt;
                        const url = file?.url;
                        const date = new Date(createdAt).toLocaleDateString("fr-FR");

                        return (
                            <li key={receipt.id} className="flex justify-between items-center bg-gray-100 p-4 rounded-xl">
                                <span>Commande du {date}</span>
                                {url ? (
                                    <button
                                        onClick={async () => {
                                            const fileUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}/uploads/facture_${file.hash}.pdf`;
                                            const response = await fetch(fileUrl);
                                            const blob = await response.blob();
                                            const blobUrl = window.URL.createObjectURL(blob);
                                            const link = document.createElement('a');
                                            link.href = blobUrl;
                                            link.download = `facture-${receipt.id}.pdf`; // nom du fichier
                                            document.body.appendChild(link);
                                            link.click();
                                            link.remove();
                                            window.URL.revokeObjectURL(blobUrl);
                                        }}
                                        className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-2 rounded"
                                    >
                                        Télécharger la facture
                                    </button>

                                ) : (
                                    <span className="text-gray-400 text-sm">PDF non dispo</span>
                                )}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default Page;
