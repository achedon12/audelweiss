"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getStrapiMedia } from "@/app/utils/api-helpers";
import { fetchAPI } from "@/app/utils/fetch-api";

const shopBannerPicUrl = getStrapiMedia("/uploads/bg3.png.webp");

async function getProducts() {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    if (!token) throw new Error("Le token API n'est pas défini.");

    const path = "/products";
    const urlParamsObject = {
        populate: ["cover", "product_categories"],
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };

    const response = await fetchAPI(path, urlParamsObject, options);
    return response.data;
}


type SortOption =
    | "popularity"
    | "rating"
    | "date"
    | "priceAsc"
    | "priceDesc";

export default function ShopPage() {
    const router = useRouter()
    const [creations, setCreations] = useState<any[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [filteredCreations, setFilteredCreations] = useState<any[]>([]);
    const [allCategories, setAllCategories] = useState<Record<string, number>>({});
    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

    const [categoryOpen, setCategoryOpen] = useState(true);
    const [priceOpen, setPriceOpen] = useState(true);

    const [sortOption, setSortOption] = useState<SortOption>("popularity");

    const [minRating, setMinRating] = useState(0);

    useEffect(() => {
        async function load() {
            const data = await getProducts();
            setCreations(data);
            console.log(data);
            const prices = data
                .map((item: any) => item.price)
                .filter((price: any) => typeof price === "number" && !isNaN(price));

            const realMin = prices.length > 0 ? Math.min(...prices) : 0;
            const realMax = prices.length > 0 ? Math.max(...prices) : 1000;

            setMinPrice(realMin);
            setMaxPrice(realMax);
            setPriceRange([realMin, realMax]);

            const categoryCount: Record<string, number> = {};
            data.forEach((item: any) => {
                item.product_categories?.forEach((cat: any) => {
                    categoryCount[cat.name] = (categoryCount[cat.name] || 0) + 1;
                });
            });
            setAllCategories(categoryCount);
            setFilteredCreations(data);
        }
        load();
    }, []);

    useEffect(() => {
        setPriceRange([minPrice, maxPrice]);
    }, [minPrice, maxPrice]);

    const applyFiltersAndSort = () => {
        let filtered = creations.filter((item) => {
            const inCategory =
                selectedCategories.length === 0 ||
                item.product_categories?.some((cat: any) =>
                    selectedCategories.includes(cat.name)
                );

            const inPrice = item.price >= priceRange[0] && item.price <= priceRange[1];

            const hasMinRating = (item.note || 0) >= minRating;

            return inCategory && inPrice && hasMinRating;
        });

        if (search.trim() !== "") {
            filtered = filtered.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        filtered.sort((a, b) => {
            switch (sortOption) {
                case "popularity":
                    return // does nothing (?)

                case "rating":
                    return (b.note || 0) - (a.note || 0);

                case "date":
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

                case "priceAsc":
                    return a.price - b.price;

                case "priceDesc":
                    return b.price - a.price;

                default:
                    return 0;
            }
        });

        setFilteredCreations(filtered);
    };

    const handleCheckboxChange = (category: string) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    };

    const handleApplyFilter = () => {
        applyFiltersAndSort();
    };

    const handleClearFilters = () => {
        const prices = creations
            .map((item: any) => item.price)
            .filter((price: any) => typeof price === "number" && !isNaN(price));
        const realMin = prices.length > 0 ? Math.min(...prices) : 0;
        const realMax = prices.length > 0 ? Math.max(...prices) : 1000;

        setSelectedCategories([]);
        setSearch("");
        setMinPrice(realMin);
        setMaxPrice(realMax);
        setPriceRange([realMin, realMax]);
        setSortOption("popularity");
        setMinRating(0);
        setFilteredCreations(creations);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);

        if (value.trim() === "") {
            setSuggestions([]);
            return;
        }

        const matches = creations
            .map((c) => c.name)
            .filter((name) => name.toLowerCase().startsWith(value.toLowerCase()));

        setSuggestions(matches.slice(0, 5));
    };

    useEffect(() => {
        applyFiltersAndSort();
    }, [sortOption]);

    const StarRatingSelector = ({
                                    rating,
                                    onChange,
                                }: {
        rating: number;
        onChange: (newRating: number) => void;
    }) => {
        return (
            <div className="flex space-x-1 cursor-pointer select-none">
                {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                        key={star}
                        onClick={() => onChange(star)}
                        xmlns="http://www.w3.org/2000/svg"
                        fill={star <= rating ? "#F87171" : "none"}
                        viewBox="0 0 24 24"
                        stroke="#F87171"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.074 6.36a1 1 0 00.95.69h6.713c.969 0 1.371 1.24.588 1.81l-5.435 3.95a1 1 0 00-.364 1.118l2.074 6.36c.3.921-.755 1.688-1.54 1.118l-5.435-3.95a1 1 0 00-1.176 0l-5.435 3.95c-.785.57-1.838-.197-1.54-1.118l2.074-6.36a1 1 0 00-.364-1.118L2.34 11.787c-.783-.57-.38-1.81.588-1.81h6.713a1 1 0 00.95-.69l2.074-6.36z"
                        />
                    </svg>
                ))}
            </div>
        );
    };

    return (
        <div>
            <div
                className="flex flex-col items-center justify-center h-[40vh] w-full bg-center bg-cover text-white relative"
                style={{ backgroundImage: `url('${shopBannerPicUrl}')` }}
            >
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative z-10 text-center">
                    <h1 className="text-4xl">BOUTIQUE</h1>
                    <div className="flex pt-5 justify-center gap-2">
                        <a className="underline" href="../">
                            Accueil
                        </a>
                        <p>{">"} Boutique</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 p-6">
                <aside className="w-full lg:w-64 border-r pr-4 sticky top-6 self-start ml-40 mt-20">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            value={search}
                            onChange={handleSearchChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-awsalmon"
                        />
                        {suggestions.length > 0 && (
                            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 shadow text-sm max-h-48 overflow-y-auto">
                                {suggestions.map((name) => (
                                    <li
                                        key={name}
                                        onClick={() => {
                                            setSearch(name);
                                            const match = creations.find((c) => c.name === name);
                                            setFilteredCreations(match ? [match] : []);
                                            setSuggestions([]);
                                        }}
                                        className="px-3 py-2 hover:bg-awsalmon/10 cursor-pointer"
                                    >
                                        {name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div>
                        <h2
                            onClick={() => setCategoryOpen(!categoryOpen)}
                            className="mt-10 text-awsalmon font-semibold text-sm uppercase mb-3 flex justify-between items-center cursor-pointer select-none"
                        >
                            Catégories
                            <span className="text-awsalmon text-lg">{categoryOpen ? "v" : ">"}</span>
                        </h2>

                        {categoryOpen && (
                            <ul className="space-y-2 text-sm">
                                {Object.entries(allCategories).map(([name, count]) => (
                                    <li key={name} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id={name}
                                            checked={selectedCategories.includes(name)}
                                            onChange={() => handleCheckboxChange(name)}
                                            className="accent-awsalmon"
                                        />
                                        <label htmlFor={name} className="cursor-pointer">
                                            {name} <span className="text-xs text-gray-500">({count})</span>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="pt-6 border-t mt-6">
                        <h2
                            onClick={() => setPriceOpen(!priceOpen)}
                            className="text-awsalmon font-semibold text-sm uppercase mb-3 flex justify-between items-center cursor-pointer select-none"
                        >
                            Prix
                            <span className="text-awsalmon text-lg">{priceOpen ? "v" : ">"}</span>
                        </h2>

                        {priceOpen && (
                            <>
                                <div className="flex flex-col gap-2 mb-4">
                                    {/* Slider prix */}
                                    <div className="relative h-6">
                                        <input
                                            type="range"
                                            min={minPrice}
                                            max={maxPrice}
                                            step={1}
                                            value={priceRange[0]}
                                            onChange={(e) => {
                                                const newMin = Number(e.target.value);
                                                if (newMin <= priceRange[1]) {
                                                    setPriceRange([newMin, priceRange[1]]);
                                                    setMinPrice(newMin);
                                                }
                                            }}
                                            className="range-slider pointer-events-none absolute w-full h-2 appearance-none bg-transparent z-10"
                                        />
                                        <input
                                            type="range"
                                            min={minPrice}
                                            max={maxPrice}
                                            step={1}
                                            value={priceRange[1]}
                                            onChange={(e) => {
                                                const newMax = Number(e.target.value);
                                                if (newMax >= priceRange[0]) {
                                                    setPriceRange([priceRange[0], newMax]);
                                                    setMaxPrice(newMax);
                                                }
                                            }}
                                            className="range-slider pointer-events-none absolute w-full h-2 appearance-none bg-transparent z-20"
                                        />
                                        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-2 bg-gray-200 rounded" />
                                        <div
                                            className="absolute top-1/2 -translate-y-1/2 h-2 bg-awsalmon rounded"
                                            style={{
                                                left: `${((priceRange[0] - minPrice) / (maxPrice - minPrice)) * 100}%`,
                                                right: `${100 - ((priceRange[1] - minPrice) / (maxPrice - minPrice)) * 100}%`,
                                            }}
                                        />
                                    </div>

                                    <div className="flex justify-between text-xs text-gray-600 px-1">
                                        <span>{priceRange[0]} €</span>
                                        <span>{priceRange[1]} €</span>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex flex-col w-1/2">
                                        <label className="text-xs text-gray-600 mb-1">Prix min</label>
                                        <input
                                            type="number"
                                            min={minPrice}
                                            max={priceRange[1]}
                                            value={minPrice}
                                            onChange={(e) => {
                                                const value = Number(e.target.value);
                                                if (value <= maxPrice) {
                                                    setMinPrice(value);
                                                    setPriceRange([value, priceRange[1]]);
                                                }
                                            }}
                                            className="border px-2 py-1 rounded text-sm"
                                        />
                                    </div>

                                    <div className="flex flex-col w-1/2">
                                        <label className="text-xs text-gray-600 mb-1">Prix max</label>
                                        <input
                                            type="number"
                                            min={priceRange[0]}
                                            max={maxPrice}
                                            value={maxPrice}
                                            onChange={(e) => {
                                                const value = Number(e.target.value);
                                                if (value >= minPrice) {
                                                    setMaxPrice(value);
                                                    setPriceRange([priceRange[0], value]);
                                                }
                                            }}
                                            className="border px-2 py-1 rounded text-sm"
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="pt-6 border-t mt-6">
                        <h2 className="text-awsalmon font-semibold text-sm uppercase mb-3 select-none">
                            ÉVALUATIONS
                        </h2>
                        <div className="flex">
                            <StarRatingSelector rating={minRating} onChange={setMinRating} />
                            <p className="pl-2">et au-delà</p>
                        </div>
                    </div>

                    <div className="flex gap-4 mt-4">
                        <button
                            onClick={handleClearFilters}
                            className="flex-1 pl-2 pr-2 bg-white border border-none text-black py-2 text-sm hover:cursor-pointer hover:text-pink-400 hover:bg-gray-100 transition"
                        >
                            Effacer les filtres
                        </button>
                        <button
                            onClick={handleApplyFilter}
                            className="flex-1 bg-black text-white py-2 text-sm rounded hover:bg-pink-400 hover:cursor-pointer transition"
                        >
                            Appliquer
                        </button>
                    </div>
                </aside>

                <section className="flex flex-col flex-1 mr-40 mt-5">
                    <div className="mb-4 ml-auto w-fit flex items-center gap-2">
                        <select
                            id="sort"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value as SortOption)}
                            className="text-sm border rounded px-3 py-1"
                        >
                            <option value="popularity">Popularité</option>
                            <option value="rating">Note</option>
                            <option value="date">Date</option>
                            <option value="priceAsc">Prix croissant</option>
                            <option value="priceDesc">Prix décroissant</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {filteredCreations.map((creation) => (
                            <div
                                key={creation.id}
                                className="border border-gray-200 rounded-md shadow-sm hover:shadow-md cursor-pointer overflow-hidden text-center"
                                onClick={() => router.push(`/product/${creation.slug}`)}
                            >
                                <div className="relative w-full aspect-square">
                                    <img
                                        src={getStrapiMedia(creation.cover?.url)}
                                        alt={creation.name}
                                        className="object-cover w-full h-full"
                                    />
                                    <button
                                        className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black text-white text-base px-4 py-2 rounded hover:bg-pink-400 hover:cursor-pointer transition"
                                        onClick={() => router.push(`/product/${creation.slug}`)}
                                    >
                                        + Ajouter au panier
                                    </button>
                                </div>

                                <div className="p-4 flex flex-col items-center">
                                    <p className="text-xs text-awsalmon mb-1 uppercase tracking-wide">
                                        {creation.product_categories?.map((cat: any) => cat.name).join(", ")}
                                    </p>
                                    <div className="flex items-center space-x-1 mb-1 justify-center">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill={i < Math.round(creation.note || 0) ? "#F87171" : "none"}
                                                viewBox="0 0 24 24"
                                                stroke="#F87171"
                                                className="w-4 h-4"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.074 6.36a1 1 0 00.95.69h6.713c.969 0 1.371 1.24.588 1.81l-5.435 3.95a1 1 0 00-.364 1.118l2.074 6.36c.3.921-.755 1.688-1.54 1.118l-5.435-3.95a1 1 0 00-1.176 0l-5.435 3.95c-.785.57-1.838-.197-1.54-1.118l2.074-6.36a1 1 0 00-.364-1.118L2.34 11.787c-.783-.57-.38-1.81.588-1.81h6.713a1 1 0 00.95-.69l2.074-6.36z"
                                                />
                                            </svg>
                                        ))}
                                    </div>
                                    <h3 className="font-semibold text-lg mb-1">{creation.name}</h3>
                                    <p className="font-bold text-awsalmon mb-2">{creation.price} €</p>
                                </div>
                            </div>

                        ))}
                    </div>

                </section>
            </div>
        </div>
    );
}
