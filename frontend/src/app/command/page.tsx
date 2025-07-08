"use client";
import { useState, useRef } from "react";
import jsPDF from "jspdf";
import { getStrapiMedia } from "@/app/utils/api-helpers";

export default function CommandPage() {
    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        adresse: "",
    });

    const [errors, setErrors] = useState({
        nom: false,
        prenom: false,
        adresse: false,
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const docRef = useRef(null); // Pour stocker le PDF généré

    const handleChange = (field) => (e) => {
        setFormData({ ...formData, [field]: e.target.value });
        setErrors({ ...errors, [field]: false });
    };

    const generatePDF = () => {
        const cart = JSON.parse(localStorage.getItem("audelweissCart") || "[]");

        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("Facture", 105, 20, null, null, "center");

        doc.setFontSize(12);
        doc.text(`Nom : ${formData.nom}`, 20, 40);
        doc.text(`Prénom : ${formData.prenom}`, 20, 50);
        doc.text(`Adresse : ${formData.adresse}`, 20, 60);

        doc.text("Panier :", 20, 80);

        let y = 90;
        let total = 0;

        cart.forEach((item, index) => {
            const line = `${index + 1}. ${item.name} - ${item.quantity}x ${item.price} €`;
            doc.text(line, 25, y);
            y += 10;
            total += item.quantity * item.price;
        });

        doc.text(`Total : ${total.toFixed(2)} €`, 25, y + 10);

        docRef.current = doc; // Stocke le PDF généré
    };

    const handleValidate = () => {
        const newErrors = {
            nom: formData.nom.trim() === "",
            prenom: formData.prenom.trim() === "",
            adresse: formData.adresse.trim() === "",
        };

        setErrors(newErrors);

        const hasError = Object.values(newErrors).some((err) => err);
        if (!hasError) {
            generatePDF();
            localStorage.removeItem("audelweissCart"); // Vide le panier
            setIsSubmitted(true); // Cache le formulaire, affiche la suite
        }
    };

    const downloadReceipt = () => {
        if (docRef.current) {
            docRef.current.save("facture.pdf");
        }
    };

    return (
        <div>
            {!isSubmitted ? (
                <div className="flex flex-col items-center">
                    <h1 className="pb-10 text-3xl font-semibold">Valider vos informations</h1>
                    <div className="space-x-13">
                        <input
                            className={`border p-2 rounded ${
                                errors.nom ? "border-red-500" : "border-gray-400"
                            }`}
                            type="text"
                            placeholder="Nom"
                            value={formData.nom}
                            onChange={handleChange("nom")}
                        />
                        <input
                            className={`border p-2 rounded ${
                                errors.prenom ? "border-red-500" : "border-gray-400"
                            }`}
                            type="text"
                            placeholder="Prénom"
                            value={formData.prenom}
                            onChange={handleChange("prenom")}
                        />
                    </div>
                    <div className="pb-10">
                        <input
                            className={`border p-2 rounded mt-10 w-[550px] ${
                                errors.adresse ? "border-red-500" : "border-gray-400"
                            }`}
                            type="text"
                            placeholder="Adresse"
                            value={formData.adresse}
                            onChange={handleChange("adresse")}
                        />
                    </div>
                    <button
                        className="mb-15 p-2 pl-4 pr-4 bg-black hover:bg-pink-400 hover:cursor-pointer text-white"
                        onClick={handleValidate}
                    >
                        Valider la commande
                    </button>
                </div>
            ) : (
                <div className="flex flex-col items-center">
                    <h1 className="pb-10 text-3xl font-semibold">Merci pour votre commande !</h1>
                    <p>Vous pouvez télécharger votre facture ci-dessous.</p>
                    <button
                        className="mt-10 mb-15 p-2 pl-4 pr-4 bg-black hover:bg-pink-400 hover:cursor-pointer text-white"
                        onClick={downloadReceipt}
                    >
                        Télécharger la facture
                    </button>
                </div>
            )}
        </div>
    );
}
