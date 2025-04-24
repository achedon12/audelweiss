import {fetchAPI} from "@/app/utils/fetch-api";

const SellersPage = async ({ params } : { params: {lang: string}}) => {

    const getSellers = async (lang: string): Promise<any> => {
        const token = process.env.STRAPI_API_TOKEN;

        if (!token) throw new Error("The Strapi API Token environment variable is not set.");

        const path = `/sellers-page`;
        const options = {headers: {Authorization: `Bearer ${token}`}};

        const urlParamsObject = {
            populate: [
                "articles"
            ],
            locale: lang,
        }
        return await fetchAPI(path, urlParamsObject, options);
    }

    const pageContent = await getSellers(params.lang);
    const { title, subtitle, articles } = pageContent.data;

    console.log('pageContent', pageContent);

    return (
        <div className="h-full w-full flex flex-col items-center">
            <div className="w-[80%]">
                <header className="text-center">
                    <h1 className="uppercase text-4xl">{title}</h1>
                    <p>{subtitle}</p>
                </header>
                <section>
                    {
                        articles.map((article: any) => (
                            <article key={article.id} className="my-4">
                                <h2 className="text-2xl">{article.title}</h2>
                                <span>{article.place}</span>
                                <p>{article.content}</p>
                            </article>
                        ))
                    }
                </section>
            </div>
        </div>
    );
};

export default SellersPage;