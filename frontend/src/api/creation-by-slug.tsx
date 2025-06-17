import {fetchAPI} from "@/app/utils/fetch-api";

export async function getCreationBySlug(slug: string) {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/creations`;
    const urlParamsObject = {
        filters: {slug},
        populate: {
            cover: {fields: ['url']},
            creation_categories: {fields: ['name']},
        },
    };
    const options = {headers: {Authorization: `Bearer ${token}`}};
    return await fetchAPI(path, urlParamsObject, options);
}