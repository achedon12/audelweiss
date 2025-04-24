export function getStrapiURL(path = '') {
    return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'}${path}`;
}

export function getStrapiMedia(url: string | undefined): string {
    if (url == null) {
        return '';
    }

    if (url.startsWith('http') || url.startsWith('//')) {
        return url;
    }

    return `${getStrapiURL()}${url}`;
}

export function formatDate(dateString: string) {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'long', day: 'numeric'};
    return date.toLocaleDateString('en-US', options);
}

export const delay = (time: number) => new Promise((resolve) => setTimeout(() => resolve(1), time));
