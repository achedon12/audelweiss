"use client";
import {ReactNode, useEffect, useState} from "react";
import {fetchAPI} from "@/app/utils/fetch-api";
import {CategoryFilterProvider, useCategoryFilter} from "./CategoryFilterContext";

const CategoryButtons = ({categories}: { categories: any[] }) => {
    const {selectedCategory, setSelectedCategory} = useCategoryFilter();

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
                    onClick={() => setSelectedCategory(cat.slug)}
                >
                    {cat.name}
                </button>
            ))}
        </div>
    );
}

export default function Layout({children}: { children: ReactNode }) {
    const [categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
                if (!token) throw new Error("Strapi API token is not defined");
                const path = "/creation-categories";
                const options = {headers: {Authorization: `Bearer ${token}`}};
                const response = await fetchAPI(path, {sort: {name: "asc"}}, options);
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
            <CategoryButtons categories={categories}/>
            {children}
        </CategoryFilterProvider>
    );
}