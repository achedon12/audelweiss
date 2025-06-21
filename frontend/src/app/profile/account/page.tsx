"use client";

import {useAuth} from "@/app/providers";
import React, {useState} from "react";
import FormInput from "@/components/FormInput/FormInput";

const Page = () => {
        const {user} = useAuth();
        const [formData, setFormData] = useState({
            username: user?.username || '',
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            email: user?.email || '',
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        });

        const handleChange = (e: { target: { name: any; value: any; }; }) => {
            const {name, value} = e.target;
            setFormData({...formData, [name]: value});
        };

        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            try {
                const body: any = {
                    username: formData.username,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.newPassword || undefined,
                }
                // await update(`/users/${user?.id}`, body);
                //checker la bonne url et les params

            } catch (error) {
                console.error("Error updating profile:", error);
                alert("An error occurred while updating your profile. Please try again.");
            }
        }

        return (
            <form onSubmit={handleSubmit} className="col-span-4 p-8">
                <div className="grid grid-cols-2 gap-10">
                    <FormInput
                        label="Prénom"
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                        name="firstName"
                        required
                    />
                    <FormInput
                        label="Nom"
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                        name="lastName"
                        required
                    />
                </div>
                <FormInput
                    label="Nom d'utilisateur"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    name="username"
                    required
                />
                <FormInput
                    label="E-mail"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    name="email"
                    required
                />
                <FormInput
                    label="Mot de passe actuel (laisser vide pour le conserver)"
                    type="password"
                    value={formData.oldPassword}
                    onChange={handleChange}
                    name="oldPassword"
                />
                <FormInput
                    label="Nouveau mot de passe (laisser vide pour le conserver)"
                    type="password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    name="newPassword"
                />
                <FormInput
                    label="Confirmer le nouveau mot de passe (laisser vide pour le conserver)"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    name="confirmPassword"
                />
                <button
                    type="submit"
                    className="bg-awpastel text-awblack cursor-pointer py-2 w-1/2 mt-4 hover:bg-awsalmon transition-colors duration-300"
                >
                    Enregistrer les modifications
                </button>
            </form>
        );
    }
;

export default Page;