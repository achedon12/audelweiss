"use client";
import React, {ReactNode, useEffect} from "react";
import {usePathname, useRouter} from "next/navigation";
import {getStrapiMedia} from "@/app/utils/api-helpers";
import Link from "next/link";
import {useAuth} from "@/app/providers";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const navLinks = [
    {label: "Liste des commandes", href: "/my-account/orders"},
    {label: "Fichiers à télécharger", href: "/my-account/downloads"},
    {label: "Mes adresses", href: "/my-account/edit-address"},
    {label: "Mon compte", href: "/my-account/edit-account"},
    {label: "Déconnexion"},
];

function getDisconnectModal({logout}: { logout: () => void }) {
    return withReactContent(Swal).fire({
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
    });
}

function UserProfile({showSwal, avatarUrl}: { showSwal: () => void; avatarUrl: string }) {
    const pathname = usePathname();

    return (
        <div className="flex flex-col items-center w-full h-[30rem] py-8">
            <img
                src={avatarUrl}
                alt="User Avatar"
                className="w-24 h-24 rounded-full"
            />
            <p className="text-center text-lg font-semibold py-6">Hello&nbsp;!</p>
            <nav className="w-[80%]">
                <ul className="flex flex-col gap-2 tracking-widest text-awblack">
                    {navLinks.map(link =>
                        link.label === "Déconnexion" ? (
                            <li
                                key={link.label}
                                className="hover:cursor-pointer hover:text-awpink text-center border-b border-awgray p-2"
                                onClick={showSwal}
                            >
                                <span>{link.label}</span>
                            </li>
                        ) : (
                            <li
                                key={link.href}
                                className={`hover:cursor-pointer hover:text-awpink text-center border-b border-awgray p-2
                                                ${pathname === link.href ? "text-awpink" : ""}`}
                            >
                                <Link href={link.href as string}>{link.label}</Link>
                            </li>
                        )
                    )}
                </ul>
            </nav>
        </div>
    );
}

export default function Layout({children}: { children: ReactNode }) {
    const {user, logout} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/my-account");
        }
    }, [user, router]);

    const showSwal = () => {
        getDisconnectModal({logout});
    };

    const avatarUrl = user && user.avatar && "url" in user.avatar
        ? getStrapiMedia(user.avatar.url)
        : "/defaultAvatar.png";

    return (
        <section className="grid grid-cols-1 lg:grid-cols-8 bg-white mt-12">
            <div className="bg-awcement h-full"></div>
            <div className="bg-awgraylight h-full col-span-2">
                {user && (
                    <UserProfile
                        showSwal={showSwal}
                        avatarUrl={avatarUrl}
                    />
                )}
            </div>
            <div className="col-span-4 p-4 h-full grid grid-cols-4">
                {children}
            </div>
        </section>
    );
}