"use client";

import {useAuth} from "@/app/providers";
import React, {useState} from "react";
import FormInput from "@/components/FormInput/FormInput";
import {get, update} from "@/app/utils/get-data-page";
import Swal from 'sweetalert2';

const Page = () => {
    const {user, setUser} = useAuth();
    const [formData, setFormData] = useState({
        username: user?.username || '',
        firstname: user?.firstname || '',
        lastname: user?.lastname || '',
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
        const {oldPassword, newPassword, confirmPassword} = formData;
        const isPasswordChange = oldPassword || newPassword || confirmPassword;

        if (isPasswordChange) {
            if (!oldPassword || !newPassword || !confirmPassword) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Champs manquants',
                    text: "Veuillez remplir les trois champs de mot de passe pour modifier votre mot de passe.",
                    toast: true,
                    position: 'top-end',
                    timer: 3000,
                    showConfirmButton: false
                });
                return;
            }
            if (newPassword !== confirmPassword) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: "Le nouveau mot de passe et la confirmation ne correspondent pas.",
                    toast: true,
                    position: 'top-end',
                    timer: 3000,
                    showConfirmButton: false
                });
                return;
            }

            try {
                const data = await get(`/users/${user?.id}`, {urlParamsObject: {populate: 'password'}});
                if (data.password !== oldPassword) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erreur',
                        text: "L'ancien mot de passe est incorrect.",
                        toast: true,
                        position: 'top-end',
                        timer: 3000,
                        showConfirmButton: false
                    });
                    return;
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: "Une erreur s'est produite lors de la vérification de l'ancien mot de passe.",
                    toast: true,
                    position: 'top-end',
                    timer: 3000,
                    showConfirmButton: false
                });
                return;
            }
        }

        try {
            const body: any = {
                username: formData.username,
                firstname: formData.firstname,
                lastname: formData.lastname,
                email: formData.email,
                password: formData.newPassword || undefined,
            }
            await update(`/users/${user?.id}`, body);
            if (setUser) {
                setUser({
                    ...user,
                    ...body,
                    password: undefined
                });
            }
            Swal.fire({
                icon: 'success',
                title: 'Succès',
                text: "Profil mis à jour avec succès.",
                toast: true,
                position: 'top-end',
                timer: 3000,
                showConfirmButton: false
            });
        } catch (error) {
            console.error("Error updating profile:", error);
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: "Une erreur est survenue lors de la mise à jour de votre profil. Veuillez réessayer.",
                toast: true,
                position: 'top-end',
                timer: 3000,
                showConfirmButton: false
            });
        }
    }

    return (
        <form onSubmit={handleSubmit} className="col-span-4 p-8">
            <div className="grid grid-cols-2 gap-10">
                <FormInput
                    label="Prénom"
                    type="text"
                    value={formData.firstname}
                    onChange={handleChange}
                    name="firstname"
                    required
                />
                <FormInput
                    label="Nom"
                    type="text"
                    value={formData.lastname}
                    onChange={handleChange}
                    name="lastname"
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
};

export default Page;