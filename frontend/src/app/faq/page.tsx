import {getDataPage} from "@/api/page/get-data-page";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const FaqPage = async ({params}: { params: { lang: string } }) => {

    const pageContent = await getDataPage('/faq-page', {
        locale: params.lang,
        populate: '*',
    });

    const {questions} = pageContent.data;

    return (
        <div className="h-full w-full flex flex-col items-center">
            <div className="w-full max-w-4xl flex flex-col gap-8 pb-10 px-4">
                <h1 className="text-center text-4xl font-bold mt-8">FAQ</h1>
                <div className="flex flex-col gap-4">
                    {
                        questions.map((question: any) => (
                            <details
                                key={question.id}
                                className="group rounded-lg p-4 cursor-pointer transition-all duration-300"
                            >
                                <summary className="text-xl text-awpink font-bold list-none marker:hidden">
                                    {question.question}
                                </summary>
                                <div className="mt-2 text-left animate-fadeIn">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            ul: ({node, ...props}) => <ul className="list-disc pl-5" {...props} />,
                                            ol: ({node, ...props}) => <ol className="list-decimal pl-5" {...props} />,
                                            li: ({node, ...props}) => <li className="my-1" {...props} />,
                                            p: ({node, ...props}) => <p className="my-2" {...props} />,
                                            a: ({node, ...props}) => (
                                                <a
                                                    className="text-awpink"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    {...props}
                                                />
                                            ),

                                        }}
                                    >
                                        {question.response}
                                    </ReactMarkdown>
                                </div>
                            </details>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default FaqPage;
