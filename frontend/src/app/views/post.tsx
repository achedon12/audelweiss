import {formatDate, getStrapiMedia} from '@/app/utils/api-helpers';
import Image from 'next/image';
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

interface Article {
    id: number;
    title: string;
    description: string;
    slug: string;
    publishedAt: string;
    cover: {
        url: string;
    };
    category: {
        slug: string;
        name: string;
    };
    content: string;
}

export default function Post({data}: { data: Article }) {
    const {title, description, publishedAt, cover} = data;
    const imageUrl = getStrapiMedia(cover.url);

    return (
        <article className="space-y-8 flex flex-col items-center justify-center py-8 px-4 md:px-8">
            <div className="w-[80%] max-w-7xl mx-auto space-y-6 flex flex-col items-center">
                <div className="flex flex-col md:flex-row gap-8">
                    {imageUrl && (
                        <div className="flex-shrink-0">
                            <Image
                                src={imageUrl}
                                alt="article cover image"
                                width={400}
                                height={400}
                                className="h-full object-cover rounded-lg shadow-lg"
                            />
                        </div>
                    )}
                    <div className="space-y-6 flex-grow">
                        <h1 className="leading-tight text-5xl font-bold">{title}</h1>
                        <p>Catégorie(s): <span className="text-aworange">{data.category.name}</span></p>
                        <p className="text-gray-500">
                            Publié le <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
                        </p>
                        <p>{description}</p>
                    </div>
                </div>

                <div
                    className="w-[80%]"
                >
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            h1: ({node, ...props}) => <h1 className="my-4 text-4xl text-left uppercase" {...props} />,
                            h2: ({node, ...props}) => <h2
                                className="my-4 text-3xl font-bold text-awsalmon" {...props} />,
                            h3: ({node, ...props}) => <h3
                                className="my-4 text-2xl font-bold text-aworange" {...props} />,
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
                            table: ({node, ...props}) => (
                                <table
                                    className="table-auto w-full border-collapse border border-gray-300" {...props} />
                            ),
                            th: ({node, ...props}) => (
                                <th className="border border-gray-300 p-2 bg-gray-100" {...props} />
                            ),
                            td: ({node, ...props}) => (
                                <td className="border border-gray-300 p-2" {...props} />
                            ),
                            p: ({node, ...props}) => <p className="my-4" {...props} />,
                        }}>
                        {data.content}
                    </ReactMarkdown>
                </div>
            </div>
        </article>
    );
}