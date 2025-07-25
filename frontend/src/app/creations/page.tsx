"use client";
import {useCallback, useEffect, useState} from "react";
import Loader from "@/components/Common/Loader";
import {getStrapiMedia} from "@/app/utils/api-helpers";
import Link from "next/link";
import {useCategoryFilter} from "./CategoryFilterContext";
import {getDataCollection} from "@/app/utils/get-data-page";

const BlogPage = () => {

    interface Meta {
        pagination: {
            start: number;
            limit: number;
            total: number;
        };
    }

    const [meta, setMeta] = useState<Meta | undefined>();
    const [data, setData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);
    const PAGE_LIMIT = 5;
    const {selectedCategory} = useCategoryFilter();
    const filteredData = selectedCategory
        ? data.filter((creation: any) =>
            creation.creation_categories.some((cat: any) => cat.slug === selectedCategory)
        )
        : data;

    const fetchData = useCallback(async (start: number, limit: number) => {
        setIsLoading(true);
        try {
            const responseData = await getDataCollection('/creations', {
                sort: {createdAt: "desc"},
                populate: {
                    cover: {fields: ["url"]},
                    creation_categories: {populate: "*"},
                },
                pagination: {
                    start: start,
                    limit: limit,
                },
            });

            if (start === 0) {
                setData(responseData.data);
            } else {
                setData((prevData: any[]) => [...prevData, ...responseData.data]);
            }
            setMeta(responseData.meta);
        } catch (error) {
            console.error("Error fetching blog data:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const loadMoreCreations = () => {
        if (meta && meta.pagination) {
            const nextCreations = meta.pagination.start + meta.pagination.limit;
            fetchData(nextCreations, PAGE_LIMIT);
        } else {
            console.error("Meta or pagination is undefined.");
        }
    }

    useEffect(() => {
        fetchData(0, PAGE_LIMIT);
    }, [fetchData]);

    if (isLoading) return <Loader/>;

    return (
        <div>
            <div className="flex flex-wrap justify-center gap-4">
                {data.length === 0 ? (
                    <p className="text-gray-500">Aucune création trouvée.</p>
                ) : (
                    filteredData.map((creation: any) => (
                        <Link
                            href={`/creations/${creation.slug}`}
                            key={creation.id}
                            className="flex justify-center items-center basis-1/2 md:basis-1/5"
                        >
                            <img
                                src={getStrapiMedia(creation.cover.url)}
                                alt={creation.title}
                                className="w-96 h-full object-cover rounded-lg shadow-lg max-h-96 hover:shadow-xl transition-shadow duration-300"
                            />
                        </Link>
                    ))
                )}
            </div>
            {meta && meta.pagination &&
                meta.pagination.start + meta.pagination.limit < meta.pagination.total && (
                    <div className="flex justify-center">
                        <button
                            type="button"
                            className="px-6 py-3 text-sm rounded-lg hover:underline dark:bg-gray-900 dark:text-gray-400"
                            onClick={loadMoreCreations}
                        >
                            Charger plus de créations...
                        </button>
                    </div>
                )}
        </div>
    );

};

export default BlogPage;