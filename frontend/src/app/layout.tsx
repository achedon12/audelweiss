import "./globals.css";
import {Inter} from "next/font/google";
import {Providers} from "@/app/providers";
import Index from "@/components/ScrollToTop";
import {fetchAPI} from "@/app/utils/fetch-api";
import Navbar from "@/components/Navbar";
import React from "react";
import ErrorPage from "@/app/error/page";
import {getStrapiMedia} from "@/app/utils/api-helpers";


const inter = Inter({subsets: ["latin"]});

async function getGlobal(lang: string): Promise<any> {
    const token = process.env.STRAPI_API_TOKEN;

    if (!token) throw new Error("The Strapi API Token environment variable is not set.");

    const path = `/global`;
    const options = {headers: {Authorization: `Bearer ${token}`}};

    const urlParamsObject = {
        populate: [
            "header.logo",
            "header.navLink"
        ],
        locale: lang,
    };
    return await fetchAPI(path, urlParamsObject, options);
}

export default async function RootLayout({children, params}: {
    readonly children: React.ReactNode;
    readonly params: { lang: string };
}) {
    const global = await getGlobal(params.lang);

    if (!global.data) return (<ErrorPage />);

    const navbar = global.data.header;
    const navbarLogoUrl = getStrapiMedia(
        navbar.logo.url
    );
    return (
        <html suppressHydrationWarning lang="en">
        <head>
            <title>{global.data.siteName}</title>
            <meta name="description" content={global.data.metaDescription}/>
        </head>
        <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <Providers>
            <Navbar
                links={navbar.navLink}
                logoUrl={navbarLogoUrl}
                logoText={navbar.logo.alternativeText}
            />
            {children}
            <Index/>
        </Providers>
        </body>
        </html>
    );
}