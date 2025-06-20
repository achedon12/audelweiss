import {getStrapiMedia} from "@/app/utils/api-helpers";
import React from "react";
import ErrorPage from "@/app/error/page";
import AnimatedText from "@/components/AnimatedText/AnimatedText";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import ProductSection from "@/components/ProductSection/ProductSection";
import CategoriesSection from "@/components/CategoriesSection/CategoriesSection";
import {getDataPage} from "@/app/utils/get-data-page";
import BlogSection from "@/components/BlogSection/BlogSection";

const images = {
    navbarLogo: getStrapiMedia('/uploads/bg2-e1739024515127.png.webp'),
    pub: getStrapiMedia('/uploads/tag.png.webp'),
    pubLogo: getStrapiMedia('/uploads/made-in-france.png.webp'),
};

function BannerSection({banner}: { banner: any }) {
    return (
        <div className="relative w-full">
            <Image src={images.navbarLogo} alt="bg" className="h-[80vh] w-full object-cover object-left" width={1920}
                   height={1080}/>
            <section
                className="absolute top-1/2 right-1/2 md:right-1/4 w-[80%] md:w-1/2 transform translate-x-1/2 -translate-y-1/2 text-left flex flex-col gap-2 text-black items-baseline">
                <h1 className="md:text-6xl font-bold text-xl">
                    {banner.title_beginPart} <br/>
                    <AnimatedText texts={banner.title_coloredText}/><br/>
                    {banner.title_endPart}
                </h1>
                <p>{banner.secondTitle}</p>
                <a href={banner.buttonRedirecting.url}
                   className="group relative inline-flex items-center overflow-hidden bg-awblack p-3 pr-0 hover:pr-3 text-awgraylight transition-all duration-300 hover:bg-awpink hover:text-black">
                    {banner.buttonRedirecting.text}
                    <Image src="/arrow-right.svg" alt="arrow"
                           className="ml-2 h-4 w-4 transform opacity-0 translate-x-full transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                           width={16} height={16}/>
                </a>
            </section>
            <div className="absolute right-1/2 md:right-1/6 transform translate-x-1/2 top-1/5 -translate-y-1/2">
                <div className="relative w-1/2 h-1/2">
                    <Image src={images.pub} alt="publicité" className="w-full h-full object-cover animate-spin-slow"
                           width={400} height={400}/>
                    <Image src={images.pubLogo} alt="logo de la publicité" className="absolute inset-0 m-auto w-1/2"
                           width={200} height={200}/>
                </div>
            </div>
        </div>
    );
}

function ArticleSection({articles}: { articles: any[] }) {
    return (
        <div className="relative w-full">
            <section
                className="relative w-full flex flex-col ml-auto mr-auto md:flex-row md:justify-between md:w-[80%] p-16">
                {articles.map((a, i) => (
                    <article key={a.id}
                             className="relative flex flex-col gap-2 text-left text-black w-full md:w-1/4 overflow-hidden md:overflow-visible">
                        <span className="text-awsalmon text-2xl">{(i + 1).toString().padStart(2, "0")}</span>
                        <h2 className="uppercase text-2xl">{a.title}</h2>
                        <ReactMarkdown>
                            {a.content}
                        </ReactMarkdown>
                        {a.image?.url && (
                            <Image
                                src={getStrapiMedia(a.image.url)}
                                alt={a.image.alternativeText || a.title}
                                className="absolute bottom-0 md:-right-1/2 w-full opacity-50 -right-1/3"
                                width={400}
                                height={400}
                            />
                        )}
                    </article>
                ))}
            </section>
        </div>
    );
}

function TransitionSection({text}: { text: string }) {
    return (
        <section
            className="w-full flex flex-col items-center justify-center p-16 text-awblack text-3xl leading-relaxed">
            <ReactMarkdown
                components={{
                    p: ({node, ...props}) => <p className="prose prose-invert" {...props} />
                }}
            >
                {text}
            </ReactMarkdown>
        </section>
    );
}

function AboutCreatorSection({about}: { about: any }) {
    return (
        <section className="w-full flex items-center justify-center py-16 px-40 text-awblack">
            <div className="w-1/2 pr-8">
                <h2 className="text-[3rem] font-bold mb-4 w-1/2">{about.title}</h2>
                <ReactMarkdown
                    components={{
                        p: ({node, ...props}) => <p className="prose prose-invert leading-loose mt-2" {...props} />
                    }}
                >
                    {about.description}
                </ReactMarkdown>
                <div className="mt-8">
                    <a href={about.buttonRedirecting.url}
                       className="inline-flex items-center px-4 py-2 bg-awsalmon text-awblack hover:bg-awblack hover:text-white transition-colors duration-300">
                        {about.buttonRedirecting.text}
                    </a>
                </div>
            </div>
            <div className="w-1/2 h-auto relative">
                {about.img1?.url && (
                    <Image
                        src={getStrapiMedia(about.img1.url)}
                        alt={about.title}
                        className="h-auto object-cover w-full"
                        width={400}
                        height={500}
                    />
                )}
                {about.img2?.url && (
                    <Image
                        src={getStrapiMedia(about.img2.url)}
                        alt={about.title}
                        className="absolute -bottom-20 -right-20 h-[30rem] w-60 object-cover rounded-full shadow-lg border-4 border-white"
                        width={160}
                        height={288}
                        style={{objectPosition: "center"}}
                    />
                )}
            </div>
        </section>
    );
}

export default async function Page({params}: { readonly params: { lang: string } }) {
    const index = await getDataPage('/index', {
        populate: {
            banner: {populate: "*"},
            IndexArticles: {populate: "*"},
            creations: {populate: "*"},
            categories: {populate: "*"},
            AboutCreator: {populate: "*"},
            articles: {populate: "*"},
        },
        locale: params.lang,
    });
    const data = index.data;
    if (!data) return <ErrorPage/>;
    console.log("Index data:", data);
    return (
        <>
            <BannerSection banner={data.banner}/>
            <ArticleSection articles={data.IndexArticles}/>
            <ProductSection products={data.creations}/>
            <CategoriesSection categories={data.categories} buttonRedirecting={data.banner.buttonRedirecting}/>
            <TransitionSection text={data.TransitionText}/>
            {/* partie boutique quand elle sera faite */}
            {/* <ShopSection products={data.creations}/> */}
            <AboutCreatorSection about={data.AboutCreator}/>
            <BlogSection title={data.BlogTitle} articles={data.articles}/>
        </>
    );
}