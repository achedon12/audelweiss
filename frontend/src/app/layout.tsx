import "./globals.css";
import {DM_Sans} from "next/font/google";
import {Providers} from "@/app/providers";
import Index from "@/app/components/ScrollToTop";
import {fetchAPI} from "@/app/utils/fetch-api";
import Navbar from "@/app/components/Navbar";
import React from "react";
import ErrorPage from "@/app/error/page";
import {getStrapiMedia, getStrapiURL} from "@/app/utils/api-helpers";
import {FALLBACK_SEO} from "@/app/utils/constants";
import {Metadata} from "next";

const font = DM_Sans({subsets: ["latin"]});

async function getGlobal(lang: string): Promise<any> {
    const token = process.env.STRAPI_API_TOKEN;

    if (!token) throw new Error("The Strapi API Token environment variable is not set.");

    const path = `/global`;
    const options = {headers: {Authorization: `Bearer ${token}`}};

    const urlParamsObject = {
        populate: [
            "navbar.logo",
            "navbar.navLink"
        ],
        locale: lang,
    };
    return await fetchAPI(path, urlParamsObject, options);
}

export async function generateMetadata({ params } : { params: {lang: string}}): Promise<Metadata> {
    const global = await getGlobal(params.lang);

    if (!global.data) return FALLBACK_SEO;

    const { siteName, siteDescription, favicon } = global.data;

    return {
        title: siteName,
        description: siteDescription,
        icons: {
            icon: [new URL(favicon, getStrapiURL())],
        },
    };
}

export default async function RootLayout({children, params}: {
    readonly children: React.ReactNode;
    readonly params: { lang: string };
}) {
    const global = await getGlobal(params.lang);

    if (!global.data) return (<ErrorPage />);

    console.log(global.data);

    const navbar = global.data.navbar;
    const navbarLogoUrl = getStrapiMedia(
        navbar.logo.url
    );
    return (
        <html suppressHydrationWarning lang="en">
        <head>
            <title>{global.data.siteName}</title>
            <meta name="description" content={global.data.metaDescription}/>
        </head>
        <body className={`bg-[#FCFCFC] dark:bg-black ${font.className}`}>
        <Providers>
            <Navbar
                links={navbar.navLink}
                logoUrl={navbarLogoUrl}
                logoText={navbar.logo.alternativeText}
            />

            <main className="dark:bg-black dark:text-gray-100 min-h-screen">
                {children}
            </main>

            <Index/>
        </Providers>
        </body>
        </html>
    );
}