"use client";

import React, {useState} from "react";
import {getStrapiMedia} from "@/app/utils/api-helpers";
import Image from "next/image";

export default function CategoriesSection({ categories: products, buttonRedirecting: buttonRedirecting }: { categories: any[], buttonRedirecting: any }) {
    const uniqueCategories = React.useMemo(() => {
        const map = new Map();
        products.forEach((product) => {
            product.creation_categories?.forEach((cat: any) => {
                if (!map.has(cat.id)) {
                    map.set(cat.id, { ...cat, product });
                }
            });
        });
        return Array.from(map.values());
    }, [products]);

    const [selected, setSelected] = useState<number>(0);

    const categoriesLeftImages = {
        0: "https://audelweiss.fr/wp-content/uploads/2025/02/0b0bc07c-1615-4152-b893-770a637929dc.webp",
        1: "https://audelweiss.fr/wp-content/uploads/2025/02/bandeaufantaisie.jpg.webp"
    }

    return (
        <div className="relative w-full">
            <div className="bg-awpastel py-16">
                <div className="w-full text-center uppercase text-awsalmon text-sm tracking-widest">
                    • • • • •   les catégories   • • • • •   les catégories   • • • • •    les catégories   • • • • •   les catégories   • • • • •   les catégories   • • • • •    les catégories   • • • • •
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl py-16 mx-auto items-center">
                    <div className="relative h-64 flex items-center justify-center">
                        <div className="absolute -bottom-4 -left-16 w-52 h-96 z-10">
                            <Image src={categoriesLeftImages["0"]} alt={""} className="object-cover object-right rounded-full" fill />
                        </div>
                        <div className="absolute top-16 left-24 w-72 h-80 z-20">
                            <Image src={categoriesLeftImages["1"]} alt={""} className="object-cover" fill />
                        </div>
                    </div>
                    <div className="flex flex-col gap-6 items-center">
                        {uniqueCategories.map((cat, idx) => (
                            <button
                                key={cat.id}
                                onMouseEnter={() => setSelected(idx)}
                                className={`group cursor-pointer flex items-center text-3xl md:text-4xl font-bold uppercase transition-colors duration-300 ${
                                    selected === idx ? "text-awsalmon" : "text-awblack"
                                }`}
                            >
                                <span className="transition-colors duration-300 group-hover:text-awsalmon">{cat.name}</span>
                                {selected === idx && (
                                    <svg
                                        className="ml-4 w-8 h-8 transition-transform duration-300 group-hover:translate-x-2"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                )}
                            </button>
                        ))}

                        <a href={buttonRedirecting.url} className="mt-6 group relative inline-flex items-center overflow-hidden bg-awblack p-3 pr-0 hover:pr-3 text-awgraylight transition-all duration-300 hover:bg-awpink hover:text-black">
                            {buttonRedirecting.text}
                            <Image src="/arrow-right.svg" alt="arrow" className="ml-2 h-4 w-4 transform opacity-0 translate-x-full transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" width={16} height={16} />
                        </a>
                    </div>
                    <div className="flex items-center justify-center h-96">
                        <div className="relative w-64 h-96">
                            {uniqueCategories[selected]?.product?.cover && (
                                <Image
                                    src={getStrapiMedia(uniqueCategories[selected].product.cover.url)}
                                    alt={uniqueCategories[selected].product.title}
                                    className="object-cover"
                                    fill
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}