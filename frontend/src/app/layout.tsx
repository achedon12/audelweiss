import "./globals.css";
import {DM_Sans} from "next/font/google";
import {Providers} from "@/app/providers";
import Index from "@/components/ScrollToTop";
import Navbar from "@/components/Navbar";
import React from "react";
import ErrorPage from "@/app/error/page";
import {getStrapiMedia} from "@/app/utils/api-helpers";
import Footer from "@/components/Footer";
import {getDataPage} from "@/app/utils/get-data-page";

const font = DM_Sans({subsets: ["latin"]});

export default async function RootLayout({children, params}: {
    readonly children: React.ReactNode;
    readonly params: { lang: string };
}) {
    const global = await getDataPage('/global', {
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
        locale: params.lang,
    });

    if (!global.data) return (<ErrorPage/>);
    const navbar = global.data.navbar;
    const navbarLogoUrl = getStrapiMedia(navbar.logo.url);
    const footerLogoUrl = getStrapiMedia(global.data.footer.logo.url);
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

            <main className="bg-white text-black">
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