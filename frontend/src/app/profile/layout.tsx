"use client";
import {useFetchUser} from "@/providers/AuthContext";
import {ReactNode} from "react";
import {getStrapiMedia} from "@/app/utils/api-helpers";
import Link from "next/link";
import {usePathname} from "next/navigation";

const navLinks = [
    {label: "Liste des commandes", href: "/profile/orders"},
    {label: "Fichiers à télécharger", href: "/profile/downloads"},
    {label: "Mes adresses", href: "/profile/address"},
    {label: "Mon compte", href: "/profile/account"},
    {label: "Déconnexion", href: "/logout"},
];

export default function layout({children}: { children: ReactNode }) {
    const {user, loading} = useFetchUser();
    const pathname = usePathname();

    if (loading) return null;

    if (!user) {
        return <div>{children}</div>;
    }

    return (
        <div className="flex flex-col md:flex-row max-w-7xl mx-auto min-h-screen">
            <aside className="md:w-1/4 p-4 bg-awgraylight flex flex-col items-center gap-2">
                <img
                    src={user.picture ? getStrapiMedia(user.picture.url) : '/defaultAvatar.png'}
                    alt="User Avatar"
                    className="w-24 h-24 rounded-full mb-4"
                />
                <p className="text-center text-lg font-semibold">Hello !</p>
                <nav className="w-[80%]">
                    <ul className="flex flex-col gap-2">
                        {navLinks.map(link => (
                            <li
                                key={link.href}
                                className={`hover:cursor-pointer hover:text-awpink text-center border-b border-awgray pb-2
                                                    ${pathname === link.href ? "text-awpink font-bold" : ""}`}
                            >
                                <Link href={link.href}>{link.label}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
            <div className="md:w-3/4 p-4">
                {children}
            </div>
        </div>
    );
}