import {fetchAPI} from "@/app/utils/fetch-api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const DeliveryPage = async ({params}: { params: { lang: string } }) => {
    const getDelivery = async (lang: string): Promise<any> => {
        const token = process.env.STRAPI_API_TOKEN;

        if (!token) throw new Error("The Strapi API Token environment variable is not set.");

        const path = `/delivery-page`;
        const options = {headers: {Authorization: `Bearer ${token}`}};

        const urlParamsObject = {
            locale: lang,
        }
        return await fetchAPI(path, urlParamsObject, options);
    }

    const pageContent = await getDelivery(params.lang);
    const {content} = pageContent.data;

    return (
        <div className="h-full w-full flex flex-col items-center">
            <div className="w-[80%] flex flex-col gap-4 pb-10">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        h1: ({node, ...props}) => <h1 className="text-4xl text-center uppercase" {...props} />,
                        h2: ({node, ...props}) => <h2 className="text-3xl font-bold text-awsalmon" {...props} />,
                        h3: ({node, ...props}) => <h3 className="text-2xl font-bold text-aworange" {...props} />,
                        a: ({node, ...props}) => <a className="text-awpink" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc pl-5" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal pl-5" {...props} />,
                        li: ({node, ...props}) => <li className="my-1" {...props} />,
                    }}>
                    {content}
                </ReactMarkdown>
            </div>
        </div>
    );
};

export default DeliveryPage;
