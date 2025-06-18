"use client";
import Image from "next/image";
import Link from "next/link";
import {formatDate, getStrapiMedia} from "@/app/utils/api-helpers";
import {ReactNode, useEffect} from "react";

interface Article {
    id: number;
    title: string;
    description: string;
    slug: string;
    publishedAt: string;
    cover: {
        url: string;
    };
    category: {
        slug: string;
        name: string;
    };
    content: string;
}

export default function PostList(
    {
        data: articles,
        children,
    }: {
        data: Article[];
        children?: ReactNode;
    }
) {

    useEffect(() => {
        window.scrollTo(0, 0);
        console.log(articles)
    }, []);

    return (
        <section className="container p-6 mx-auto space-y-6 sm:space-y-12 flex flex-col items-center">
            <div className="space-y-6 w-[80%]">
                {articles.map((article, idx) => {
                    const imageUrl = getStrapiMedia(
                        article.cover.url
                    );

                    const category = article.category;

                    return (
                        <Link
                            href={`/blog/${category?.slug}/${article.slug}`}
                            key={article.id}
                            className={`group hover:no-underline focus:no-underline flex flex-col lg:flex-row ${
                                idx % 2 === 0 ? "lg:flex-row-reverse" : ""
                            } items-center gap-6`}
                        >
                            {imageUrl && (
                                <Image
                                    alt="presentation"
                                    width="1024"
                                    height="512"
                                    className="object-cover w-full lg:w-1/2 h-64 lg:h-auto"
                                    src={imageUrl}
                                />
                            )}
                            <div
                                className="space-y-2 lg:w-1/2 text-left flex flex-col justify-between gap-2 items-start">
                                <span
                                    className="text-xs font-semibold text-white p-3 uppercase bg-aworange rounded-full">
                                    {category?.name || "Sans catégorie"}
                                </span>
                                <h3 className="text-2xl font-semibold group-focus:underline">
                                    {article.title}
                                </h3>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs dark:text-gray-400">
                                        {formatDate(article.publishedAt)}
                                    </span>
                                </div>
                                <p className="py-4">{article.description}</p>
                                <span
                                    className="text-s text-awpink font-semibold underline group-hover:text-aworange transition-colors">
                                    Lire l'article
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </div>
            {children && children}
        </section>
    );
}