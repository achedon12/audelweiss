"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {List} from "phosphor-react";
import {useState} from "react";
import Logo from "@/app/components/Common/Logo";
import {getStrapiMedia} from "@/app/utils/api-helpers";

interface NavLink {
    id: number;
    url: string;
    isExternal: boolean;
    text: string;
}

interface IconLink {
    id: number;
    url: string;
    isExternal: boolean;
    icon: {
        id: number;
        url: string;
        alternativeText: string;
    };
}

interface MobileNavLink extends NavLink {
    closeMenu: () => void;
}

interface MobileIconLink extends IconLink {
    closeMenu: () => void;
}

function NavLink({url, text}: NavLink) {
    const path = usePathname();

    return (
        <li className="flex">
            <Link
                href={url}
                className={`flex items-center mx-2 -mb-1 font-bold text-sm ${path === url && "text-awsalmon border-awsalmon"}`}
            >
                {text}
            </Link>
        </li>
    );
}

function IconLink({url, icon}: IconLink) {
    const iconUrl = getStrapiMedia(icon.url);
    return (
        <li className="flex">
            <Link
                href={url}
                className="flex items-center mx-2 -mb-1 font-bold text-xs"
            >
                <img src={iconUrl} alt={icon.alternativeText} className="h-6 w-6"/>
            </Link>
        </li>
    );
}

function MobileNavLink({url, text, closeMenu}: MobileNavLink) {
    const path = usePathname();
    const handleClick = () => {
        closeMenu();
    };
    return (
        <div className="flex">
            <Link
                href={url}
                onClick={handleClick}
                className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-awblack ${path === url && "text-awpink"}`}
            >
                {text}
            </Link>
        </div>
    );
}

export default function Navbar({links, logoUrl, logoText, iconLinks}: {
    links: Array<NavLink>;
    logoUrl: string | null;
    logoText: string | null;
    iconLinks: Array<IconLink>;
}) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const closeMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <div className="py-6 px-10 ">
            <div className="container flex justify-between h-16 mx-auto px-0 sm:px-6">
                <Logo src={logoUrl}>
                    {logoText && <h2 className="text-2xl font-bold">{logoText}</h2>}
                </Logo>
                <div className="flex items-center lg:hidden">
                    <div className="flex">
                        {iconLinks.map((item: IconLink) => (
                            <IconLink key={item.id} {...item} />
                        ))}
                    </div>
                    <button className={"px-2"} onClick={() => setMobileMenuOpen(true)}>
                        <List size={26} className="text-awblack" aria-hidden="true"/>
                    </button>
                </div>
                <div className="items-center flex-shrink-0 hidden lg:flex">
                    <ul className="items-stretch hidden space-x-1 lg:flex">
                        {links.map((item: NavLink) => (
                            <NavLink key={item.id} {...item} />
                        ))}
                        <div className="flex">
                            {iconLinks.map((item: IconLink) => (
                                <IconLink key={item.id} {...item} />
                            ))}
                        </div>
                    </ul>
                </div>

                <div className={`fixed inset-0 z-10 flex items-center justify-center bg-opacity-50 transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                    <div className={`fixed top-0 right-0 mt-16 mr-4 w-11/12 bg-white border-t border-t-awpink p-4 transform transition-transform ${mobileMenuOpen ? "translate-y-10" : "-translate-y-10"} shadow-lg`}>
                        <button className="absolute top-4 right-4 text-gray-500" onClick={closeMenu}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                        <ul className="space-y-4">
                            {links.map((item: NavLink) => (
                                <MobileNavLink key={item.id} {...item} closeMenu={closeMenu} />
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
}