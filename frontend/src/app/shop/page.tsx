import { getStrapiMedia } from "@/app/utils/api-helpers";
import { fetchAPI } from "@/app/utils/fetch-api";

const shopBannerPicUrl = getStrapiMedia('/uploads/bg3.png.webp');

async function getCreations() {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    if (!token) throw new Error("Le token API n'est pas défini.");

    const path = "/creations";
    const urlParamsObject = {
        populate: ["cover", "creation_categories"],
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };

    const response = await fetchAPI(path, urlParamsObject, options);
    return response.data;
}

export default async function ShopPage() {
    const creations = await getCreations();

    return (
        <div>
            <div
                className="flex flex-col items-center justify-center h-[40vh] w-full bg-center bg-cover text-white relative"
                style={{ backgroundImage: `url('${shopBannerPicUrl}')` }}
            >
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative z-10 text-center">
                    <h1 className="text-4xl">BOUTIQUE</h1>
                    <div className="flex pt-5 justify-center gap-2">
                        <a className="underline" href="../">Accueil</a>
                        <p>{'>'} Boutique</p>
                    </div>
                </div>
            </div>

            <section className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {creations?.map((creation: any) => {
                    const { id, cover, creation_categories, title } = creation;
                    console.log(creation)
                    const imageUrl = cover?.url || null;
                    const categories = creation_categories || [];

                    return (
                        <article key={id} className="border p-4 rounded shadow flex flex-col">
                            {imageUrl && (
                                <img
                                    src={getStrapiMedia(imageUrl)}
                                    alt={title}
                                    className="mb-4 w-full h-48 object-cover rounded"
                                />
                            )}

                            <div className="mb-2 text-sm text-awsalmon text-center">
                                {categories.length > 0 && (
                                    <span>
                                        {categories
                                            .map((cat: any) => cat.name.toUpperCase()) // Majuscules
                                            .join(" / ")} {/* " / " en guise de séparateur */}
                                    </span>
                                )}
                            </div>

                            <h2 className="text-xl mb-2 text-center">{title}</h2>
                        </article>
                    );
                })}
            </section>

        </div>
    );
}
