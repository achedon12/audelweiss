"use client";
import NextLink from "next/link";
import Image from "next/image";
import {useEffect, useState} from "react";
import {getStrapiMedia} from "@/app/utils/api-helpers";

interface FooterLink {
    id: number;
    url: string;
    isExternal: boolean;
    text: string;
}

interface FooterColumn {
    id: number;
    title: string;
    link: Array<FooterLink>;
}

function FooterLink({url, text, orientation}: { url: string; text: string; orientation: "left" | "right" }) {
    return (
        <li className={`flex ${orientation === "left" ? "justify-center md:justify-between md:flex-row" : "justify-center md:justify-end md:flex-row"}`}>
            <NextLink
                href={url}
                className={`flex items-center -mb-1 text-base text-aworange`}
            >
                {text}
            </NextLink>
        </li>
    );
}

function FooterColumn({title, link, orientation}: {
    title: string;
    link: Array<FooterLink>;
    orientation: "left" | "right"
}) {
    return (
        <article className="flex flex-col gap-3 w-full md:w-[20%]">
            <h3 className={`text-center md:${orientation === "left" ? "text-left" : "text-right"} text-white font-bold text-xl`}>{title}</h3>
            <ul className="flex flex-col gap-2 text-aworange text-center md:text-left">
                {link.map((link: FooterLink) => (
                    <FooterLink key={link.id} url={link.url} text={link.text} orientation={orientation}/>
                ))}
            </ul>
        </article>
    );
}

export default function Footer({
                                   leftColumn,
                                   rightColumn,
                                   logo,
                                   centerText,
                                   socialMedias,
                                   credentials,
                                   mediaDescription
                               }: {
    leftColumn: FooterColumn;
    rightColumn: FooterColumn;
    logo: string | null;
    centerText: string;
    socialMedias: Array<{ url: string, icon: { url: string, alternativeText: string } }>;
    credentials: string;
    mediaDescription: string;
}) {
    const [isLargeScreen, setIsLargeScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 768);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <footer className="bg-awblack p-2">
            <section
                className={`flex flex-col ${isLargeScreen ? "md:flex-row" : "flex-col"} gap-2 items-baseline justify-between mx-auto pt-10 w-[80%]`}>
                {isLargeScreen ? (
                    <>
                        <FooterColumn title={leftColumn.title} link={leftColumn.link} orientation="left"/>
                        <div className="flex flex-col items-center gap-3 w-full md:w-[50%]">
                            {logo && <Image src={logo} alt="logo" width={200} height={20} priority/>}
                            <p className="text-center text-awgray text-base leading-8">{centerText}</p>
                        </div>
                        <FooterColumn title={rightColumn.title} link={rightColumn.link} orientation="right"/>
                    </>
                ) : (
                    <>
                        <div className="flex flex-col items-center gap-3 w-full">
                            {logo && <Image src={logo} alt="logo" width={200} height={20} priority/>}
                            <p className="text-center text-awgray text-base leading-8">{centerText}</p>
                        </div>
                        <FooterColumn title={leftColumn.title} link={leftColumn.link} orientation="left"/>
                        <FooterColumn title={rightColumn.title} link={rightColumn.link} orientation="right"/>
                    </>
                )}
            </section>
            <section className="flex flex-col items-center gap-6 mx-auto pb-16 w-[80%]">
                <p className="text-center text-awgray text-base">{mediaDescription}</p>
                <div className="flex gap-2">
                    {socialMedias.map((item: { url: string, icon: { url: string, alternativeText: string } }) => (
                        <NextLink key={item.icon.url} href={item.url} target="_blank"
                                  className="flex items-center justify-center p-4 border-1 border-awgray rounded-full">
                            {getStrapiMedia(item.icon.url) &&
                                <Image src={getStrapiMedia(item.icon.url)}
                                       alt={item.icon.alternativeText || "social media icon"} width={20} height={20}/>
                            }
                        </NextLink>
                    ))}
                </div>
            </section>
            <section className="mx-auto w-[80%] py-6 border-t border-awgray">
                <h3 className='text-center text-awgray text-base'>
                    {credentials}
                </h3>
            </section>
        </footer>
    );
}