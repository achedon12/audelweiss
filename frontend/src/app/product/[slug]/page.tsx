import { notFound } from "next/navigation";
import { fetchAPI } from "@/app/utils/fetch-api";
import ProductClient from "./ProductClient";

type Params = {
    params: {
        slug: string;
    };
};

async function getProductBySlug(slug: string) {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    if (!token) throw new Error("Le token API n'est pas défini.");

    const path = "/products";

    const urlParamsObject = {
        filters: { slug: { $eq: slug } },
        populate: ["cover", "product_categories"],
    };

    const response = await fetchAPI(path, { urlParamsObject, method: "GET" });
    return response.data.length > 0 ? response.data[0] : null;
}

async function getProductCommentBySlug(slug: string) {
    const path = `/product-comments`;
    const urlParamsObject = {
        filters: { product: { slug }, isPublish: true },
    };

    return await fetchAPI(path, { urlParamsObject });
}

export default async function ProductPage({ params }: Params) {
    const product = await getProductBySlug(params.slug);
    const comments = await getProductCommentBySlug(params.slug);
    console.log(comments);
    if (!product) notFound();

    return <ProductClient product={product} comments={comments} />;
}
