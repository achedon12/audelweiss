import {fetchAPI} from '@/app/utils/fetch-api';
import Creation from '@/app/views/creation';
import type {Metadata} from 'next';
import {getCreationBySlug} from "@/api/creation-by-slug";

async function getMetaData(slug: string) {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/creations`;
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

export default async function CreationRoute({params}: { params: { slug: string } }) {
    const {slug} = params;
    const data = await getCreationBySlug(slug);
    if (data.data.length === 0) return <h2>Création non trouvée</h2>;
    return <Creation data={data.data[0]}/>;
}

export async function generateStaticParams() {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/creations`;
    const options = {headers: {Authorization: `Bearer ${token}`}};
    const articlesResponse = await fetchAPI(
        path,
        {
            populate: ['creation_categories'],
        },
        options
    );

    return articlesResponse.data.map(
        (creation: {
            slug: string;
            category: {
                slug: string;
            };
        }) => ({slug: creation.slug, category: creation.slug})
    );
}