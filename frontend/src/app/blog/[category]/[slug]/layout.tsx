import {ReactNode} from "react";
import Link from "next/link";
import {fetchAPI} from "@/app/utils/fetch-api";

async function getArticleTitle(slug: string) {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/articles`;
    const urlParamsObject = {
        filters: {slug},
        fields: ['title'],
    };
    const options = {headers: {Authorization: `Bearer ${token}`}};
    const response = await fetchAPI(path, urlParamsObject, options);
    console.log('Response:', response);
    return response.data.length > 0 ? response.data[0].title : 'Article not found';
}

export default async function layout({
     children,
     params,
 }: {
    children: ReactNode,
    params: { category: string; slug: string }
}) {
    const title = await getArticleTitle(params.slug);

    return (
        <div>
            <header className="bg-awsalmon space-y-8 flex flex-col items-center justify-center py-8 px-4 md:px-8">
                <nav className="w-[80%] text-white max-w-7xl mx-auto gap-1 flex flex-row items-center">
                    <Link href="/" className="underline">Accueil</Link> &gt;{" "}
                    <Link href="/blog" className="underline">Blog</Link> &gt;{" "}
                    <Link href={`/blog/${params.category}`}
                          className="underline">{params.category}</Link> &gt;{" "}
                    <span>{title}</span>
                </nav>
            </header>
            {children}
        </div>
    );
}