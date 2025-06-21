import {fetchAPI} from "@/app/utils/fetch-api";

export async function getDataPage(path: string, urlParamsObject = {}) {
    return fetchAPI(path, {isPrivate: true, urlParamsObject});
}

export async function getDataCollection(path: string, urlParamsObject = {}) {
    return fetchAPI(path, {isPrivate: false, urlParamsObject});
}

export async function create(path: string, body: any) {
    return fetchAPI(path, {method: "POST", body, isPrivate: true});
}

export async function update(path: string, body: any) {
    return fetchAPI(path, {method: "PUT", body, isPrivate: true});
}

export async function remove(path: string) {
    return fetchAPI(path, {method: "DELETE", isPrivate: true});
}