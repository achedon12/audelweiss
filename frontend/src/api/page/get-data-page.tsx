import {fetchAPI} from "@/app/utils/fetch-api";

const privateToken = process.env.STRAPI_API_TOKEN;
const publicToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

export interface UrlParamObject {
    filters?: Record<string, any>;               // e.g. { title: { $contains: 'foo' } }
    populate?: string | string[] | Record<string, any>; // e.g. '*', ['author','comments'], ou { author: { populate: '*' } }
    locale?: string;                             // e.g. 'en', 'fr'
    sort?: Record<string, 'asc' | 'desc'> | string[]; // e.g. { createdAt: 'desc' } ou ['createdAt:desc']
    fields?: string[];                           // e.g. ['title','excerpt']
    pagination?: { page?: number; pageSize?: number; start?: number; limit?: number };

    [key: string]: any;                          // pour les paramètres complémentaires
}

const makeOptions = (token: string) => {
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

export async function getDataPage(path: string, urlParamsObject: UrlParamObject = {}): Promise<any> {
    if (!privateToken) {
        throw new Error("The Strapi API Token environment variable is not set.");
    }

    const options = makeOptions(privateToken);

    return await fetchAPI(path, urlParamsObject, options);
}

export async function getDataCollection(path: string, urlParamsObject: UrlParamObject = {}): Promise<any> {
    if (!publicToken) {
        throw new Error("The Strapi Public API Token environment variable is not set.");
    }

    const options = makeOptions(publicToken);

    return fetchAPI(path, urlParamsObject, options);
}