import {fetchAPI} from "@/app/utils/fetch-api";

export async function getCreationBySlug(slug: string) {
    const path = `/creations`;
    const urlParamsObject = {
        filters: {slug},
        populate: {
            cover: {fields: ['url']},
            creation_categories: {fields: ['name']},
        },
    };
    return await fetchAPI(path, {urlParamsObject});
}

export async function getCreationCommentBySlug(slug: string) {
    const path = `/creation-comments`;
    const urlParamsObject = {
        filters: {creation: {slug}, isPublish: true},
    };
    return await fetchAPI(path, {urlParamsObject});
}