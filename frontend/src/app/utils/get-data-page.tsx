import {fetchAPI} from "@/app/utils/fetch-api";

export async function getDataPage(path: string, urlParamsObject = {}) {
    return fetchAPI(path, {urlParamsObject});
}

export async function getDataCollection(path: string, urlParamsObject = {}) {
    return fetchAPI(path, {urlParamsObject});
}

export async function get(path: string, urlParamsObject = {}) {
    return fetchAPI(path, {urlParamsObject});
}

export async function create(path: string, body: any) {
    return fetchAPI(path, {method: "POST", body});
}

export async function update(path: string, body: any) {
    return fetchAPI(path, {method: "PUT", body});
}

export async function remove(path: string) {
    return fetchAPI(path, {method: "DELETE"});
}