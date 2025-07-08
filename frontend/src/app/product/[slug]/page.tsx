import Link from "next/link";
import { notFound } from "next/navigation";
import {fetchAPI} from "@/app/utils/fetch-api";
import {getStrapiMedia} from "@/app/utils/api-helpers";
import AddToCart from "@/app/product/[slug]/AddToCart";

type Params = {
    params: {
        slug: string;
    };
};

async function getProductBySlug(slug: string) {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    if (!token) throw new Error("Le token API n'est pas défini.");

    const path = "/products?populate=*";
    const urlParamsObject = {
        filters: { slug: slug },
        populate: ["cover", "product_categories"],
    };
    const options = {
        headers: { Authorization: `Bearer ${token}` },
    };

    const response = await fetchAPI(path, urlParamsObject, options);

    return response.data.length > 0 ? response.data[0] : null;
}


export default async function ProductPage({ params }: Params) {
    const product = await getProductBySlug(params.slug);

    if (!product) {
        notFound();
    }

    return (
        <div>
            <nav className="text-sm text-white mb-4 bg-awsalmon m-0 pl-75 pt-5 pb-5">
                <ol className="list-reset flex">
                    <li>
                        <Link href="/" className="underline">
                            Accueil
                        </Link>
                    </li>
                    <li className="mx-2">/</li>
                    <li>
                        <Link href="/shop" className="underline">
                            Boutique
                        </Link>
                    </li>
                    <li className="mx-2">/</li>
                    <li>{product.name}</li>
                </ol>
            </nav>

            <div className="ml-80 mt-20 mr-80 pb-20">
                <div className="flex pb-20">
                    <img
                        src={getStrapiMedia(product.cover?.url)}
                        alt={product.name}
                        className="mr-20"
                        style={{
                            width: "60vh",
                            height: "60vh",
                            objectFit: "cover",
                        }}
                    />

                    <div>
                        <h2 className="text-4xl mb-2">{product.name}</h2>
                        <div className="flex mb-10">
                            <p>Catégorie(s) :</p>
                            <p className="text-awsalmon">{product.product_categories?.map((cat: any) => cat.name).join(", ")}</p>
                        </div>
                        <div className="flex items-center space-x-1 mb-1">
                            {[...Array(5)].map((_, i) => (
                                <svg
                                    key={i}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill={i < Math.round(product.note || 0) ? "#F87171" : "none"}
                                    viewBox="0 0 24 24"
                                    stroke="#F87171"
                                    className="w-4 h-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.074 6.36a1 1 0 00.95.69h6.713c.969 0 1.371 1.24.588 1.81l-5.435 3.95a1 1 0 00-.364 1.118l2.074 6.36c.3.921-.755 1.688-1.54 1.118l-5.435-3.95a1 1 0 00-1.176 0l-5.435 3.95c-.785.57-1.838-.197-1.54-1.118l2.074-6.36a1 1 0 00-.364-1.118L2.34 11.787c-.783-.57-.38-1.81.588-1.81h6.713a1 1 0 00.95-.69l2.074-6.36z"
                                    />
                                </svg>
                            ))}
                        </div>
                        <p className="mt-5">
                            {product.short_description}
                        </p>
                        <h2 className="text-3xl text-pink-400 mt-6">{product.price} €</h2>

                        <AddToCart product={product} />

                    </div>
                </div>
                <div className="flex">
                    <div>
                        <h2 className="text-2xl pb-5">DESCRIPTION DU PRODUIT</h2>
                        <p>{product.long_description}</p>
                    </div>
                    <div className="ml-20 mr-40">
                        <h2 className="text-2xl pb-5 whitespace-nowrap">INFORMATIONS</h2>
                        <div className="flex">
                            <p className="mr-5 whitespace-nowrap">Composition :</p>
                            <p className="whitespace-nowrap">{product.composition}</p>
                        </div>
                        <div className="flex pt-5">
                            <p className="mr-5">Lavage en machine :</p>
                            <p className="whitespace-nowrap">{product.washing_machine ? "Oui" : "Non"}</p>
                        </div>

                        <h2 className="text-2xl pb-5 pt-5 whitespace-nowrap">AUTRES INFORMATIONS</h2>
                        <div className="flex">
                            <p className="mr-5">Poids :</p>
                            <p className="whitespace-nowrap">{product.weight} kg</p>
                        </div>
                        <div className="flex pt-5">
                            <p className="mr-5">Dimensions :</p>
                            <p className="whitespace-nowrap">{product.dimensions}</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
