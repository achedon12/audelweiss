import Post from '@/views/post';
import type {Metadata} from 'next';
import {getDataCollection} from "@/api/page/get-data-page";

async function getPostBySlug(slug: string) {
    return await getDataCollection('/articles', {
        filters: {slug},
        populate: {
            cover: {fields: ['url']},
            category: {fields: ['name']},
        },
    });
}

async function getMetaData(slug: string) {
    const response = await getDataCollection('/articles', {
        filters: {slug},
        populate: {seo: {populate: '*'}},
    });
    return response.data;
}

export async function generateMetadata({params}: { params: { slug: string } }): Promise<Metadata> {
    const {slug} = await params;
    const meta = await getMetaData(slug);
    const metadata = meta[0]?.seo || {
        metaTitle: 'Default Title',
        metaDescription: 'Default description'
    };

    return {
        title: metadata.metaTitle || 'Default Title',
        description: metadata.metaDescription || 'Default description',
    };
}

export default async function PostRoute({params}: { params: { slug: string } }) {
    const {slug} = await params;
    const data = await getPostBySlug(slug);
    if (data.data.length === 0) return <h2>no post found</h2>;
    return <Post data={data.data[0]}/>;
}

export async function generateStaticParams() {
    const articleResponse = await getDataCollection('/articles', {
        populate: ['category'],
    });

    return articleResponse.data.map(
        (article: {
            slug: string;
            category: {
                slug: string;
            };
        }) => ({slug: article.slug, category: article.slug})
    );
}