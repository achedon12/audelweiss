import {getStrapiMedia} from "@/app/utils/api-helpers";
import Image from "next/image";

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

export default function BlogSection({title, articles}: {
    title: string,
    articles: any[]
}) {
    return (
        <div className="relative w-full py-16">
            <h1 className="text-center text-4xl font-bold uppercase text-awblack mb-8">{title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl mx-auto">
                {articles.map((article) => (
                    <div key={article.id} className="bg-white p-0 overflow-hidden cursor-pointer relative group">
                        <div className="relative w-full aspect-square">
                            <a href={`/blog/${article.slug}`} className="absolute inset-0 z-10">
                                <Image
                                    src={getStrapiMedia(article.cover.url)}
                                    alt={article.title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ease-in-out"
                                    fill
                                />
                                <div className="absolute inset-0 bg-awsalmon/40"/>
                                <div
                                    className="absolute top-3 left-3 bg-white/80 text-awsalmon text-xs font-semibold px-2 py-1 rounded">
                                    {article.category?.name}
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center p-4">
                                    <h2 className="text-2xl font-bold text-white drop-shadow-lg px-2">{article.title}</h2>
                                </div>
                                <div className="absolute bottom-0 left-0 w-full">
                                    <div className="border-t border-white/60 mx-4 mb-2"/>
                                    <div className="text-white text-xs text-left mb-3 px-4">
                                        {formatDate(article.publishedAt)}
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}