"use client";
import {useCallback, useEffect, useState} from "react";
import Loader from "@/components/Common/Loader";
import Blog from "@/views/blog-list";
import PageHeader from "@/components/PageHeader";
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

    const fetchData = useCallback(async (start: number, limit: number) => {
        setIsLoading(true);
        try {
            const responseData = await getDataCollection('/articles', {
                sort: {createdAt: "desc"},
                populate: {
                    cover: {fields: ["url"]},
                    category: {populate: "*"},
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

    const loadMorePosts = () => {
        if (meta && meta.pagination) {
            const nextPosts = meta.pagination.start + meta.pagination.limit;
            fetchData(nextPosts, PAGE_LIMIT);
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
            <PageHeader heading="Blog" text="Actualités ou simplement informations complémentaires à mes créations 😊"/>
            <Blog data={data}>
                {meta && meta.pagination &&
                    meta.pagination.start + meta.pagination.limit < meta.pagination.total && (
                        <div className="flex justify-center">
                            <button
                                type="button"
                                className="px-6 py-3 text-sm rounded-lg hover:underline dark:bg-gray-900 dark:text-gray-400"
                                onClick={loadMorePosts}
                            >
                                Load more posts...
                            </button>
                        </div>
                    )}
            </Blog>
        </div>
    );

};

export default BlogPage;