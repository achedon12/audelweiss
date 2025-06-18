"use client";
import {formatDate, getStrapiMedia} from '@/app/utils/api-helpers';
import Image from 'next/image';
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import CreationComment from "@/components/Creation/CreationComment";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
    superLargeDesktop: {
        breakpoint: {max: 4000, min: 1280},
        items: 4,
    },
    desktop: {
        breakpoint: {max: 1280, min: 1024},
        items: 3,
    },
    tablet: {
        breakpoint: {max: 1024, min: 640},
        items: 2,
    },
    mobile: {
        breakpoint: {max: 640, min: 0},
        items: 1,
    },
};

const Creation = ({data, comments}) => {

    const {title, description, publishedAt, cover, realisationTime} = data;
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
                        <p className="flex flex-wrap gap-2">Catégorie(s):
                            {data.creation_categories.map((category) => (
                                <a href={`/creations?category=${category.name.toLowerCase()}`}
                                   key={category.id}
                                   title={category.name}
                                   aria-label={category.name}
                                   className="text-awpink">{category.name}</a>
                            ))}
                        </p>
                        <p className="text-gray-500">
                            Publié le <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
                        </p>
                        <p>{description}</p>
                        {realisationTime && (
                            <p className="bg-awsalmon/50 p-2 rounded-lg text-dark">
                                Temps de réalisation : {realisationTime}
                            </p>
                        )}
                    </div>
                </div>

                <div
                    className="w-[50%]"
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
                    <CreationComment slug={data.slug}/>
                    <div className="w-full mt-8">
                        <h2 className="text-2xl font-bold mb-4">Commentaires</h2>
                        {comments && comments.length > 0 ? (
                            <Carousel
                                responsive={responsive}
                                additionalTransfrom={0}
                                arrows
                                infinite
                                containerClass="py-2"
                                itemClass="px-2"
                            >
                                {comments.map(c => (
                                    <div key={c.id} className="bg-white rounded-lg shadow-md p-4">
                                        <div className="flex items-center mb-2">
                                            <span className="font-semibold">{c.name}</span>
                                        </div>
                                        <p className="text-gray-700 mb-2">{c.comment}</p>
                                        <p className="text-sm text-gray-500">
                                            Publié le {formatDate(c.publishedAt)}
                                        </p>
                                    </div>
                                ))}
                            </Carousel>
                        ) : (
                            <p className="text-gray-500">Aucun commentaire pour le moment.</p>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
};

export default Creation;