"use client";

import React, {useState} from "react";
import {getStrapiMedia} from "@/app/utils/api-helpers";
import Image from "next/image";

export  default function ProductSection({ products }: { products: any[] }) {
    const [hovered, setHovered] = useState<number | null>(null);
    const [mouse, setMouse] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    return (
        <div className="relative w-full">
            <section className="w-full flex flex-col ml-auto mr-auto md:flex-row items-center md:justify-between md:w-[80%] p-16 md:pr-0 md:pl-0">
                {products.map((product, idx) => (
                    <article
                        key={product.id}
                        className="relative flex flex-col gap-2 w-full md:w-1/4 overflow-hidden md:overflow-visible group"
                    >
                        {product.cover?.url && (
                            <div
                                className="relative w-full"
                                onMouseEnter={() => setHovered(idx)}
                                onMouseLeave={() => setHovered(null)}
                                onMouseMove={e => setMouse({ x: e.clientX, y: e.clientY })}
                            >
                                <Image
                                    src={getStrapiMedia(product.cover.url)}
                                    alt={product.title}
                                    className="object-cover w-full h-72 group-hover:scale-105 transition-transform duration-300"
                                    width={400}
                                    height={400}
                                />
                                {hovered === idx && (
                                    <div
                                        className="flex flex-col fixed z-50 pointer-events-none"
                                        style={{
                                            left: mouse.x + 10,
                                            top: mouse.y + 10,
                                        }}
                                    >
                                        <div className="bg-awsalmon text-white px-4 pt-2 text-right text-xl uppercase font-bold shadow-lg">
                                            {product.title}
                                        </div>
                                        <div className="bg-awsalmon text-white px-4 pb-2 text-right uppercase shadow-lg inline-block">
                                            {product.creation_categories?.map((cat: any) => cat.name).join(" / ")}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </article>
                ))}
            </section>
        </div>
    );
}