import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {getDataPage} from "@/app/utils/get-data-page";

const ConfidentialityPage = async ({params}: { params: { lang: string } }) => {

    const pageContent = await getDataPage('/confidentiality-page', {
        locale: params.lang,
        populate: '*',
    });

    const {title, content} = pageContent.data;

    return (
        <div className="h-full w-full flex flex-col items-center">
            <div className="w-full max-w-4xl flex flex-col gap-8 pb-10 px-4 text-left">
                <h1 className="text-4xl text-center uppercase">{title}</h1>
                <p className="font-bold">Dernière mise à jour
                    : {new Date(pageContent.data.updatedAt).toLocaleDateString("fr-FR")}</p>
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        h1: ({node, ...props}) => <h1 className="text-4xl text-center uppercase" {...props} />,
                        h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-awsalmon" {...props} />,
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

export default ConfidentialityPage;
