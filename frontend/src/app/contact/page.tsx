import {fetchAPI} from "@/app/utils/fetch-api";
import {getStrapiMedia} from "@/app/utils/api-helpers";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ContactForm from "../../app/components/ContactForm/Index";

const ContactPage = async ({params}: { params: { lang: string } }) => {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    if (!token) throw new Error("The Strapi API Token environment variable is not set.");

    const getContact = async (lang: string) => {
        const path = `/contact-page`;
        const options = {headers: {Authorization: `Bearer ${token}`}};
        const urlParamsObject = {locale: lang, populate: ["image"]};
        return await fetchAPI(path, urlParamsObject, options);
    };

    const getContactRequests = async (lang: string) => {
        const path = `/contact-requests`;
        const options = {headers: {Authorization: `Bearer ${token}`}};
        const urlParamsObject = {locale: lang};
        return await fetchAPI(path, urlParamsObject, options);
    };

    const pageContent = await getContact(params.lang);
    const contactRequests = await getContactRequests(params.lang);

    const {title, description, image, imageDescription} = pageContent.data;
    const optionsList = contactRequests.data;

    const ContactImgUrl = getStrapiMedia(image.url);

    return (
        <div className="h-full w-full flex flex-col items-center">
            <div className="w-full max-w-6xl flex flex-col gap-8 pb-10 px-4">
                <h1 className="text-center text-4xl font-bold mt-8">{title}</h1>

                <div className="flex flex-col md:flex-row gap-12 items-center mt-8">
                    <ContactForm optionsList={optionsList}/>
                    <div className="w-full md:w-1/2 flex flex-col gap-6 text-center md:text-left">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                p: ({node, ...props}) => <p className="text-base leading-relaxed" {...props} />,
                                a: ({node, ...props}) => (
                                    <a
                                        className="text-awpink underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        {...props}
                                    />
                                ),
                            }}
                        >
                            {description}
                        </ReactMarkdown>

                        <div className="flex flex-col items-center md:items-start gap-2">
                            <img
                                src={ContactImgUrl}
                                alt={imageDescription || "Contact image"}
                                className="w-48 h-auto object-contain"
                            />
                            {imageDescription && (
                                <p className="text-xs text-gray-500 text-center md:text-left">{imageDescription}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
