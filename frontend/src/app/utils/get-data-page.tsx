import {fetchAPI} from "@/app/utils/fetch-api";

const privateToken = process.env.STRAPI_API_TOKEN;
const publicToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

export interface UrlParamObject {
    filters?: Record<string, any>;
    populate?: string | string[] | Record<string, any>;
    locale?: string;
    sort?: Record<string, 'asc' | 'desc'> | string[];
    fields?: string[];
    pagination?: { page?: number; pageSize?: number; start?: number; limit?: number };

    [key: string]: any;
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