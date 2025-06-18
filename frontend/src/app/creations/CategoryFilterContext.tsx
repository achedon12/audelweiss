"use client";
import {createContext, useContext, useState} from "react";

export const CategoryFilterContext = createContext<{
    selectedCategory: string | null,
    setSelectedCategory: (cat: string | null) => void
}>({
    selectedCategory: null,
    setSelectedCategory: () => {
    }
});

export const useCategoryFilter = () => useContext(CategoryFilterContext);

export function CategoryFilterProvider({children}: { children: React.ReactNode }) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    return (
        <CategoryFilterContext.Provider value={{selectedCategory, setSelectedCategory}}>
            {children}
        </CategoryFilterContext.Provider>
    );
}