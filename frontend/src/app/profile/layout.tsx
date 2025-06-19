"use client";
import React, {ReactNode} from "react";
import {getStrapiMedia} from "@/app/utils/api-helpers";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useAuth} from "@/app/providers";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const navLinks = [
    {label: "Liste des commandes", href: "/profile/orders"},
    {label: "Fichiers à télécharger", href: "/profile/downloads"},
    {label: "Mes adresses", href: "/profile/address"},
    {label: "Mon compte", href: "/profile/account"},
    {label: "Déconnexion"},
];

export default function Layout({children}: { children: ReactNode }) {
    const {user, logout} = useAuth();
    const pathname = usePathname();

    const showSwal = () => {
        withReactContent(Swal).fire({
            title: <i>Déconnexion</i>,
            text: "Êtes-vous sûr de vouloir vous déconnecter ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Oui, déconnectez-moi",
            cancelButtonText: "Annuler",
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
        }).then((result) => {
            if (result.isConfirmed) {
                logout();
                Swal.fire({
                    title: "Déconnecté",
                    text: "Vous avez été déconnecté avec succès.",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            }
        })
    }

    if (!user) {
        return <div>{children}</div>;
    }

    const avatarUrl =
        user.picture && user.picture.url
            ? getStrapiMedia(user.picture.url)
            : "/defaultAvatar.png";

    return (
        <div className="flex flex-col md:flex-row max-w-7xl mx-auto min-h-screen">
            <aside className="md:w-1/4 p-4 bg-awgraylight flex flex-col items-center gap-2">
                <img
                    src={avatarUrl}
                    alt="User Avatar"
                    className="w-24 h-24 rounded-full mb-4"
                />
                <p className="text-center text-lg font-semibold">Hello&nbsp;!</p>
                <nav className="w-[80%]">
                    <ul className="flex flex-col gap-2">
                        {navLinks.map(link =>
                            link.label === "Déconnexion" ? (
                                <li
                                    key={link.label}
                                    className={`hover:cursor-pointer hover:text-awpink text-center border-b border-awgray pb-2`}
                                    onClick={() => showSwal()}
                                >
                                    <span>{link.label}</span>
                                </li>
                            ) : (
                                <li
                                    key={link.href}
                                    className={`hover:cursor-pointer hover:text-awpink text-center border-b border-awgray pb-2
                                        ${pathname === link.href ? "text-awpink font-bold" : ""}`}
                                >
                                    <Link href={link.href as string}>{link.label}</Link>
                                </li>
                            )
                        )}
                    </ul>
                </nav>
            </aside>
            <div className="md:w-3/4 p-4">{children}</div>
        </div>
    );
}