import {fetchAPI} from '@/app/utils/fetch-api';
import Post from '@/app/views/post';
import type {Metadata} from 'next';

async function getPostBySlug(slug: string) {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/articles`;
    const urlParamsObject = {
        filters: {slug},
        populate: {
            cover: {fields: ['url']},
            category: {fields: ['name']},
        },
    };
    const options = {headers: {Authorization: `Bearer ${token}`}};
    return await fetchAPI(path, urlParamsObject, options);
}

async function getMetaData(slug: string) {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/articles`;
    const urlParamsObject = {
        filters: {slug},
        populate: {seo: {populate: '*'}},
    };
    const options = {headers: {Authorization: `Bearer ${token}`}};
    const response = await fetchAPI(path, urlParamsObject, options);
    return response.data;
}

export async function generateMetadata({params}: { params: { slug: string } }): Promise<Metadata> {
    const meta = await getMetaData(params.slug);
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
    const {slug} = params;
    const data = await getPostBySlug(slug);
    if (data.data.length === 0) return <h2>no post found</h2>;
    return <Post data={data.data[0]}/>;
}

export async function generateStaticParams() {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/articles`;
    const options = {headers: {Authorization: `Bearer ${token}`}};
    const articleResponse = await fetchAPI(
        path,
        {
            populate: ['category'],
        },
        options
    );

    return articleResponse.data.map(
        (article: {
            slug: string;
            category: {
                slug: string;
            };
        }) => ({slug: article.slug, category: article.slug})
    );
}