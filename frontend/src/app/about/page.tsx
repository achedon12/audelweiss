import React from 'react';
import {getDataPage} from "@/app/utils/get-data-page";

const AboutPage = async ({params}: { params: { lang: string } }) => {
    const pageContent = await getDataPage('/about', {
        locale: params.lang,
        populate: '*',
    });

    console.log(pageContent);

    const {title} = pageContent.data;

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">{title}</h1>
            <p className="text-lg text-gray-700">hello world</p>
        </div>
    );
}

export default AboutPage;