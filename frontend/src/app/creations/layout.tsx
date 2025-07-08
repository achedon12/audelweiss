"use client";
import {ReactNode, useEffect, useState} from "react";
import {usePathname, useSearchParams} from "next/navigation";
import {CategoryFilterProvider, useCategoryFilter} from "./CategoryFilterContext";
import {getDataCollection} from "@/app/utils/get-data-page";

const CategoryButtons = ({categories}: { categories: any[] }) => {
    const {selectedCategory, setSelectedCategory} = useCategoryFilter();
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get("category");

    useEffect(() => {
        if (categoryParam && categories.some(cat => cat.slug === categoryParam)) {
            setSelectedCategory(categoryParam);
        }
    }, [categoryParam, categories, setSelectedCategory]);

    return (
        <div className="flex items-center justify-center flex-wrap gap-2 mb-6">
            <button
                className={`hover:cursor-pointer px-4 py-2 rounded border border-awsalmon
                                        ${!selectedCategory ? "bg-awsalmon/50 text-white" : "text-awsalmon"}
                                        transition-colors duration-200
                                    `}
                onClick={() => setSelectedCategory(null)}
            >
                Toutes
            </button>
            {categories.map(cat => (
                <button
                    key={cat.id}
                    className={`hover:cursor-pointer px-4 py-2 rounded border border-awsalmon
                                            ${selectedCategory === cat.slug ? "bg-awsalmon/50 text-white" : "text-awsalmon"}
                                            transition-colors duration-200
                                        `}
                    onClick={() => setSelectedCategory(cat.slug.toLowerCase())}
                >
                    {cat.name}
                </button>
            ))}
        </div>
    );
}

export default function Layout({children}: { children: ReactNode }) {
    const [categories, setCategories] = useState<any[]>([]);
    const pathname = usePathname();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getDataCollection('/creation-categories', {sort: {name: "asc"}});
                if (!response || !response.data) throw new Error("Failed to fetch categories");
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <CategoryFilterProvider>
            {pathname === "/creations" && <CategoryButtons categories={categories}/>}
            {children}
        </CategoryFilterProvider>
    );
}