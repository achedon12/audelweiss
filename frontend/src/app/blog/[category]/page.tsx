import PageHeader from '@/components/PageHeader';
import BlogList from '@/views/blog-list';
import {getDataCollection} from "@/app/utils/get-data-page";

async function fetchPostsByCategory(filter: string) {
    try {
        return await getDataCollection('/articles', {
            sort: {createdAt: 'desc'},
            filters: {
                category: {
                    slug: filter,
                },
            },
            populate: {
                cover: {fields: ['url']},
                category: {
                    populate: '*',
                }
            },
        });
    } catch (error) {
        console.error(error);
    }
}

export default async function CategoryRoute({params}: { params: { category: string } }) {
    const {category} = await params;
    const {data} = await fetchPostsByCategory(category);

    //TODO: CREATE A COMPONENT FOR THIS
    if (data.length === 0) return <div>Not Posts In this category</div>;

    const {name, description} = data[0]?.category;

    return (
        <div>
            <PageHeader heading={name} text={description}/>
            <BlogList data={data}/>
        </div>
    );
}

export async function generateStaticParams() {
    return [];
}