import qs from "qs";
import {getStrapiURL} from "./api-helpers";

const strapiToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface FetchOptions {
    method?: Method;
    body?: any;
    isPrivate?: boolean;
    urlParamsObject?: Record<string, any>;
}

export async function fetchAPI(
    path: string,
    {method = "GET", body, urlParamsObject = {}}: FetchOptions = {}
) {
    if (!strapiToken) throw new Error("Le token Strapi n'est pas défini.");

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${strapiToken}`,
    };

    const queryString = qs.stringify(urlParamsObject);
    const requestUrl = `${getStrapiURL(
        `/api${path}${queryString ? `?${queryString}` : ""}`
    )}`;

    const options: RequestInit = {
        method,
        headers,
        next: {revalidate: 60},
    };

    if (body) options.body = JSON.stringify(body);

    try {
        const response = await fetch(requestUrl, options);
        return await response.json();
    } catch (error) {
        console.error(error);
        throw new Error("Erreur lors de la requête Strapi.");
    }
}