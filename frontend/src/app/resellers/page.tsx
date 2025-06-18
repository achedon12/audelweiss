import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {getStrapiMedia} from '@/app/utils/api-helpers';
import {getDataPage} from "@/api/page/get-data-page";

const SellersPage = async ({params}: { params: { lang: string } }) => {

    const pageContent = await getDataPage('/sellers-page', {
        populate: {
            "articles": {
                populate: {
                    image: {fields: ["url"]},
                },
            }
        },
        locale: params.lang,
    });
    const {title, subtitle, articles} = pageContent.data;

    return (
        <div className="h-full w-full flex flex-col items-center">
            <div className="w-[60%]">
                <header className="text-center flex flex-col items-center gap-4">
                    <h1 className="uppercase text-4xl">{title}</h1>
                    <p className="w-[50%]">{subtitle}</p>
                </header>
                <section>
                    {
                        articles.map((article: any) => (
                            <article key={article.id} className="my-4 flex flex-row gap-2">
                                <img src={getStrapiMedia(article.image.url)} alt={article.title}
                                     className="w-1/4 h-auto object-cover shadow-lg"/>
                                <div className="my-4 flex flex-col">
                                    <h2 className="text-2xl uppercase">{article.title}</h2>
                                    <span className="text-awgraylight">{article.place}</span>
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            ul: ({node, ...props}) => <ul className="list-disc pl-5" {...props} />,
                                            ol: ({node, ...props}) => <ol className="list-decimal pl-5" {...props} />,
                                            li: ({node, ...props}) => <li className="my-1" {...props} />,
                                        }}>
                                        {article.content}
                                    </ReactMarkdown>
                                </div>
                            </article>
                        ))
                    }
                </section>
            </div>
        </div>
    );
};

export default SellersPage;
