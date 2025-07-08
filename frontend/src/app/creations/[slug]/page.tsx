import Creation from '@/views/creation';
import type {Metadata} from 'next';
import {getCreationBySlug, getCreationCommentBySlug} from "@/app/utils/creation-by-slug";
import {getDataCollection} from "@/app/utils/get-data-page";

async function getMetaData(slug: string) {
    const response = await getDataCollection('/creations', {
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

export default async function CreationRoute({params}: { params: { slug: string } }) {
    const {slug} = await params;

    const data = await getCreationBySlug(slug);
    console.log('data', data);
    const comments = await getCreationCommentBySlug(slug);

    if (data.data.length === 0) return <h2>Création non trouvée</h2>;
    return <Creation data={data.data[0]} comments={comments.data}/>;
}

export async function generateStaticParams() {
    const articlesResponse = await getDataCollection(
        '/creations',
        {
            populate: ['creation_categories'],
        }
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