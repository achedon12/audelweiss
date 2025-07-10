import {getDataPage} from "@/app/utils/get-data-page";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {getStrapiMedia} from "@/app/utils/api-helpers";

const AboutPage = async ({params}: { params: { lang: string } }) => {
    const pageContent = await getDataPage('/about', {
        locale: params.lang,
        populate: '*',
    });

    console.log(pageContent);

    const {title, about_creator, about_creator_img, about_creator_illustration, about_career, about_career_img, about_career_illustration, about_motivations, inter_text, bg_text} = pageContent.data;

    const aboutCreatorImgUrl = getStrapiMedia(about_creator_img.url)
    const aboutCreatorIllustrationUrl = getStrapiMedia(about_creator_illustration.url)
    const aboutCareerImgUrl = getStrapiMedia(about_career_img.url)
    const aboutCareerIllustrationUrl = getStrapiMedia(about_career_illustration.url)

    const about_motivations_split = about_motivations.split('_').map(section => section.trim());

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="flex items-end mb-64">
                <div>
                    <img className="aspect-[6/7] object-cover object-[70%] w-10/12"
                        src={aboutCreatorImgUrl}
                        alt="Image de la créatrice"
                    />
                    <img className="aspect-[1/2] object-cover object-[70%] absolute w-1/8 translate-x-[-40%] translate-y-[-70%] rounded-full shadow-lg border-4 border-white"
                        src={aboutCreatorIllustrationUrl}
                        alt="Illustration de couture"

                    />
                </div>
                <div className="my-22">
                    <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        h1: ({...props}) => <h1 className="text-7xl font-bold mb-8" {...props} />,
                        p: ({...props}) => <p className="leading-8" {...props} />,
                    }}>{about_creator}
                    </ReactMarkdown>
                </div>
            </div>
            <div className="my-16 flex gap-8">
                {about_motivations_split.map((section, index) => (
                    <div key={index} className="prose max-w-none flex-1">
                        <p className="text-4xl py-4 text-awsalmon">{index}</p>
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                h1: ({...props}) => <h1 className="text-3xl uppercase" {...props} />,
                                p: ({...props}) => <p className="leading-8" {...props} />,
                            }}
                        >{section}
                        </ReactMarkdown>
                    </div>
                ))}
            </div>
            <p className="text-awsalmon py-6 text-3xl text-center">{inter_text}</p>
            <div className="flex flex-col-reverse lg:flex-row items-center gap-16 my-48">
                <div className="lg:w-1/2">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            h1: ({...props}) => <h1 className="text-3xl uppercase mb-8" {...props} />,
                            p: ({...props}) => <p className="leading-8 py-2" {...props} />,
                            a: ({...props}) => <a className="text-awsalmon" {...props} />,
                        }}>
                        {about_career}
                    </ReactMarkdown>
                </div>
                <div className="lg:w-1/2 relative">
                    <img className="aspect-[1/2] object-cover object-[70%] absolute -top-20 -right-5 z-0 w-3/7 rounded-full shadow-lg border-4 border-white"
                         src={aboutCareerIllustrationUrl}
                         alt="Illustration de programmation"
                    />
                    <img className="aspect-[6/7] object-cover object-[70%] relative z-10 w-full max-w-sm"
                        src={aboutCareerImgUrl}
                        alt="Image de la créatrice"
                    />
                </div>
            </div>
        </div>
    );
}

export default AboutPage;