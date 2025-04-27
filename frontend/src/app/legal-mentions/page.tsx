import {fetchAPI} from "@/app/utils/fetch-api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const LegalsMentionsPage = async ({params}: { params: { lang: string } }) => {
    const getLegalsMentions = async (lang: string): Promise<any> => {
        const token = process.env.STRAPI_API_TOKEN;

        if (!token) throw new Error("The Strapi API Token environment variable is not set.");

        const path = `/legals-mentions-page`;
        const options = {headers: {Authorization: `Bearer ${token}`}};

        const urlParamsObject = {
            locale: lang
        }
        return await fetchAPI(path, urlParamsObject, options);
    }

    const pageContent = await getLegalsMentions(params.lang);

    const {title, content} = pageContent.data;

    return (
        <div className="h-full w-full flex flex-col items-center">
            <div className="w-full max-w-[50%] flex flex-col gap-8 pb-10 px-4 text-left">
                <h1 className="text-center text-4xl font-bold mt-8">{title}</h1>
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        h1: ({node, ...props}) => <h1 className="text-4xl text-center uppercase" {...props} />,
                        h2: ({node, ...props}) => <h2 className="text-xl font-bold" {...props} />,
                        a: ({node, ...props}) => (
                            <a
                                className="text-awpink"
                                target="_blank"
                                rel="noopener noreferrer"
                                {...props}
                            />
                        ),

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

export default LegalsMentionsPage;
