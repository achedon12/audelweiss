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
import Footer from "@/app/components/Footer";

const font = DM_Sans({subsets: ["latin"]});

async function getGlobal(lang: string): Promise<any> {
    const token = process.env.STRAPI_API_TOKEN;

    if (!token) throw new Error("The Strapi API Token environment variable is not set.");

    const path = `/global`;
    const options = {headers: {Authorization: `Bearer ${token}`}};

    const urlParamsObject = {
        populate: [
            "navbar.logo",
            "navbar.navLink",
            "navbar.iconLink",
            "navbar.iconLink.icon",
            "favicon",
            "footer.leftColumn",
            "footer.leftColumn.link",
            "footer.rightColumn",
            "footer.rightColumn.link",
            "footer.logo",
            "footer.socialMedias",
            "footer.socialMedias.icon",
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
    const navbar = global.data.navbar;
    const navbarLogoUrl = getStrapiMedia(
        navbar.logo.url
    );
    const footerLogoUrl = getStrapiMedia(
        global.data.footer.logo.url
    );
    const faviconUrl = getStrapiMedia(global.data.favicon.url);
    return (
        <html suppressHydrationWarning lang="en">
        <head>
            <title>{global.data.siteName}</title>
            <meta name="description" content={global.data.metaDescription}/>
            <link rel="icon" href={faviconUrl} type="image/png"/>
        </head>
        <body className={`bg-white ${font.className}`}>
        <Providers>
            <Navbar
                links={navbar.navLink}
                logoUrl={navbarLogoUrl}
                logoText={navbar.logo.alternativeText}
                iconLinks={navbar.iconLink}
            />

            <main className="bg-white min-h-screen">
                {children}
            </main>

            <Index/>
            <Footer
                leftColumn={global.data.footer.leftColumn}
                rightColumn={global.data.footer.rightColumn}
                logo={footerLogoUrl}
                centerText={global.data.footer.centerText}
                socialMedias={global.data.footer.socialMedias}
                credentials={global.data.footer.credentials}
                mediaDescription={global.data.footer.mediaDescription}
            />
        </Providers>
        </body>
        </html>
    );
}