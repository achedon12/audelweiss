"use client";
import { useState, useRef, useEffect } from "react";
import jsPDF from "jspdf";

export default function CommandPage() {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    if (!token) throw new Error("Le token API n'est pas défini.");

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
    const docRef = useRef(null);

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            try {
                const parsedUser = JSON.parse(user);
                setFormData({
                    nom: parsedUser.lastname || "",
                    prenom: parsedUser.firstname || "",
                    adresse: parsedUser.adresse || "",
                });
            } catch (error) {
                console.error("Erreur parsing user :", error);
            }
        }
    }, []);

    const handleChange = (field) => (e) => {
        setFormData({ ...formData, [field]: e.target.value });
        setErrors({ ...errors, [field]: false });
    };

    const generatePDFBlob = (filename = "facture.pdf") => {
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
        const arrayBuffer = doc.output("arraybuffer");
        const pdfBlob = new Blob([arrayBuffer], { type: "application/pdf" });
        const file = new File([pdfBlob], filename, { type: "application/pdf" });
        docRef.current = doc;
        return file;

    };

    const handleValidate = async () => {
        const newErrors = {
            nom: formData.nom.trim() === "",
            prenom: formData.prenom.trim() === "",
            adresse: formData.adresse.trim() === "",
        };

        setErrors(newErrors);
        const hasError = Object.values(newErrors).some(Boolean);
        if (hasError) return;

        const user = localStorage.getItem("user");
        if (!user) {
            console.error("Utilisateur non connecté");
            return;
        }

        const parsedUser = JSON.parse(user);
        const userId = parsedUser?.id;
        if (!userId) {
            return;
        }

        const hashUID = crypto.randomUUID();
        const safeHash = hashUID.replace(/-/g, "_");
        const filename = `facture_${safeHash}.pdf`;

        const pdfFile = generatePDFBlob(filename);

        const formUpload = new FormData();
        formUpload.append("files", pdfFile); // le fichier lui-même
        formUpload.append("fileInfo", JSON.stringify({
            name: filename,
            alternativeText: "facture",
            caption: "facture",
        }));



        const uploadRes = await fetch("http://localhost:1337/api/upload", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formUpload,
        });


        const uploadData = await uploadRes.json();

        console.log("UploadData", uploadData);

        const fileId = uploadData[0]?.id;

        if (!fileId) {
            console.error("Erreur lors de l'upload du fichier");
            return;
        }

        const uploadedFilename = uploadData[0]?.hash+'.pdf';
        console.log(uploadData[0]);
        const receiptRes = await fetch("http://localhost:1337/api/receipts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                data: {
                    hash: hashUID,
                    file: fileId,
                    user: userId,
                    filename: uploadedFilename,
                },
            }),
        });


        if (!receiptRes.ok) {
            console.error("Erreur lors de la création de la receipt");
            return;
        }

        localStorage.removeItem("audelweissCart");
        setIsSubmitted(true);
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
                    <h1 className="pb-10 text-3xl font-semibold">Confirmer vos informations</h1>
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
