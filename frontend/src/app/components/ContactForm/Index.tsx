"use client";

import {FormEvent, useState} from "react";

export default function ContactForm({optionsList}: {
    optionsList: any[];
}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const url = process.env.NEXT_PUBLIC_STRAPI_API_URL;
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`${url}/api/contacts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    data: {
                        name,
                        email,
                        contact_request: subject,
                        message,
                    },
                }),
            });

            if (!res.ok) {
                throw new Error("Erreur lors de l'envoi du formulaire");
            }

            setSuccessMessage("Merci ! Votre message a été envoyé.");
            setName("");
            setEmail("");
            setSubject("");
            setMessage("");
        } catch (error) {
            console.error(error);
            setSuccessMessage(error.message || "Une erreur est survenue. Veuillez réessayer.");
        }
    };


    return (
        <form onSubmit={handleSubmit} className="w-full md:w-1/2 flex flex-col gap-6">
            {!successMessage ? (
                <>
                    <input
                        type="text"
                        placeholder="Nom"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border border-awsalmon bg-white rounded-md p-3 focus:outline-none text-awsalmon placeholder-awsalmon"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Adresse email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-awsalmon bg-white rounded-md p-3 focus:outline-none text-awsalmon placeholder-awsalmon"
                        required
                    />
                    <select
                        className="border border-awsalmon bg-awsalmon-light rounded-md p-3 focus:outline-none text-awsalmon placeholder-awsalmon"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                    >
                        <option value="" disabled hidden>La demande concerne</option>
                        {optionsList.map((option: any) => (
                            <option key={option.id} value={option.documentId}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                    <textarea
                        placeholder="Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={5}
                        className="border border-awsalmon bg-white rounded-md p-3 focus:outline-none resize-none text-awsalmon placeholder-awsalmon"
                        required
                    ></textarea>
                    <button
                        type="submit"
                        className="bg-awblack text-white py-3 rounded-md hover:opacity-90 transition"
                    >
                        Envoyer
                    </button>
                </>
            ) : (
                <p className="text-green-600 mt-4 text-center">{successMessage}</p>
            )}
        </form>
    );
}