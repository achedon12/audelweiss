import {getStrapiMedia} from "@/app/utils/api-helpers";
import {fetchAPI} from "@/app/utils/fetch-api";
import React from "react";
import ErrorPage from "@/app/error/page";

async function getIndex(lang: string): Promise<any> {
    const token = process.env.STRAPI_API_TOKEN;

    if (!token) throw new Error("The Strapi API Token environment variable is not set.");

    const path = `/index`;
    const options = {headers: {Authorization: `Bearer ${token}`}};

    const urlParamsObject = {
        populate: [
            'banner',
        ],
        locale: lang,
    };
    return await fetchAPI(path, urlParamsObject, options);
}


export default async function Page({params}: {
    readonly params: { lang: string };
}) {
    const index = await getIndex(params.lang);
    console.log(index);

    if (!index.data) return (<ErrorPage />);


    const navbarLogoUrl = getStrapiMedia('/uploads/bg2-e1739024515127.png.webp');
    const pubUrl = getStrapiMedia('/uploads/tag.png.webp');
    const pubLogo = getStrapiMedia('/uploads/made-in-france.png.webp');
    const bgImage1 = getStrapiMedia('/uploads/montagne.svg');
    const bgImage2 = getStrapiMedia('/uploads/crochet.svg');
    const bgImage3 = getStrapiMedia('/uploads/reiki.svg');
    const articleUrl1 = getStrapiMedia('/uploads/geocache-400x284.jpg');
    const img1 = getStrapiMedia('/uploads/0b0bc07c-1615-4152-b893-770a637929dc.webp');
    const img2 = getStrapiMedia('/uploads/bandeaufantaisie.jpg');


    return (
        <>
            <div className="relative w-full">
                <img src={navbarLogoUrl} alt="bg" className="h-[80vh] w-full object-cover object-left"/>
                <section
                    className="absolute top-1/2 right-1/2 md:right-1/4 w-[80%] md:w-1/2 transform translate-x-1/2 -translate-y-1/2 text-left flex flex-col gap-2 text-black items-baseline">
                    <h1 className="md:text-6xl font-bold text-xl">
                        Des créations <br/>
                        <span className="text-awpink">uniques</span>
                        <br/>
                        au crochet
                    </h1>
                    <p>
                        Chaque pièce est soigneusement confectionnée à la main dans les Hautes-Alpes. Offrez-vous ou à
                        vos proches un savoir-faire authentique, alliant douceur et originalité.
                    </p>
                    <a
                        href="#"
                        className="group relative inline-flex items-center overflow-hidden bg-awblack p-3 pr-0 hover:pr-3 text-awgraylight transition-all duration-300 hover:bg-awpink hover:text-black"
                    >
                        Découvrir la boutique
                        <img
                            src="/arrow-right.svg"
                            alt="arrow"
                            className="ml-2 h-4 w-4 transform opacity-0 translate-x-full transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                        />
                    </a>
                </section>
                <div className="absolute right-1/2 md:right-1/4 transform translate-x-1/2 top-1/5 -translate-y-1/2">
                    <div className="relative w-1/2 h-1/2">
                        <img
                            src={pubUrl}
                            alt="publicité"
                            className="w-full h-full object-cover animate-spin-slow"
                        />
                        <img
                            src={pubLogo}
                            alt="logo de la publicité"
                            className="absolute inset-0 m-auto w-1/2"
                        />
                    </div>
                </div>
            </div>
            <div className="relative w-full">
                <section
                    className="relative w-full flex flex-col ml-auto mr-auto md:flex-row md:justify-between md:w-[80%] p-8">
                    <article
                        className="relative flex flex-col gap-2 text-left text-black w-full md:w-1/4 overflow-hidden md:overflow-visible">
                        <span className="text-awsalmon text-2xl">01</span>
                        <h2 className="uppercase text-2xl">Artisanats embrunais</h2>
                        <p>
                            Je vis dans les Hautes-Alpes, un cadre qui m’inspire chaque jour. Toutes mes créations sont
                            réalisées ici, à la main, avec des matériaux choisis avec soin. J’aime l’idée de proposer
                            des
                            pièces qui portent en elles un peu de cette authenticité montagnarde.
                        </p>
                        <img src={bgImage1} alt="montagne"
                             className="absolute bottom-0 md:-right-1/2 w-full opacity-50 -right-1/3"/>
                    </article>
                    <article
                        className="relative flex flex-col gap-2 text-left text-black w-full md:w-1/4 md:mt-12 overflow-hidden md:overflow-visible">
                        <span className="text-awsalmon text-2xl">02</span>
                        <h2 className="uppercase text-2xl">Éditions limitées ou sur-mesure</h2>
                        <p>
                            Je suis une créatrice curieuse, toujours en quête de nouvelles idées. J’aime tester des
                            techniques, des couleurs et des matières différentes. Cette envie d’explorer donne naissance
                            à
                            des pièces variées : certaines sont produites en petites séries, d’autres peuvent être
                            personnalisées selon vos goûts et vos besoins.
                        </p>
                        <img src={bgImage2} alt="montagne"
                             className="absolute bottom-0 md:-right-1/2 w-full opacity-50 -right-1/3"/>
                    </article>
                    <article
                        className="relative flex flex-col gap-2 text-left text-black w-full md:w-1/4 overflow-hidden md:overflow-visible">
                        <span className="text-awsalmon text-2xl">03</span>
                        <h2 className="uppercase text-2xl">Énergie et bien-être
                            avec le Reiki</h2>
                        <p>
                            Depuis 2021, je suis certifiée praticienne Reiki. Chaque fois que je crée, je me connecte à
                            cette énergie pour infuser mes pièces d’intentions positives. Mon but est de proposer des
                            créations qui vous apportent à la fois bien-être et harmonie visuelle.
                        </p>
                        <img src={bgImage3} alt="montagne"
                             className="absolute bottom-0 md:-right-1/2 w-full opacity-50 -right-1/3"/>
                    </article>
                </section>
            </div>
            <div className="relative w-full">
                <section
                    className="w-full flex flex-col ml-auto mr-auto md:flex-row items-center md:justify-between md:w-[80%] p-8 md:pr-0 md:pl-0">
                    {[
                        {name: "Léo le bg", type: "à louer", url: articleUrl1},
                        {name: "Mathys le bg", type: "à louer", url: articleUrl1},
                        {name: "Léo le bg", type: "à louer", url: articleUrl1},
                        {name: "Mathys le bg", type: "à louer", url: articleUrl1},
                    ].map((article, index) => (
                        <a
                            key={index}
                            href="#"
                            className={`relative group overflow-hidden block 
                ${index === 0 ? 'block' : 'hidden'}  
                md:block`}
                            data-name={article.name}
                            data-type={article.type}
                        >
                            <img src={article.url} alt="article"
                                 className="object-cover w-54 h-54 transition-transform duration-300 group-hover:scale-110"/>

                            <div
                                className="absolute top-0 left-0 w-full h-full bg-black/50 text-white flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-black/50 transition-all duration-300">
                                <p className="font-bold">{article.name}</p>
                                <p>{article.type}</p>
                            </div>
                        </a>
                    ))}
                </section>
            </div>
            <div className="relative w-full bg-awsalmon">
                <div
                    className="w-full flex flex-col ml-auto mr-auto md:flex-row items-center md:justify-between md:w-[80%] p-8 md:pr-0 md:pl-0">
                    <div className="w-full md:w-1/4 flex flex-col gap-2 items-center justify-center">
                        <section className="relative flex justify-center items-center mt-6 w-[20%]">
                            <div className="relative w-48 h-48">
                                <div
                                    className="absolute bottom-0 left-0 rounded-full border-4 border-gray-600 flex items-center justify-center p-1">
                                    <img src={img1} alt="Christopher Tolkien"
                                         className="artist rounded-full object-cover grayscale"/>
                                </div>
                            </div>
                            <div className="relative w-48 h-48 -ml-24 -mt-16"> {/* Augmenté -mt pour monter plus */}
                                <div
                                    className="absolute top-0 right-0 rounded-full border-4 border-purple-800 flex items-center justify-center p-1">
                                    <img src={img2} alt="J.R.R. Tolkien"
                                         className="artist rounded-full object-cover grayscale"/>
                                </div>
                            </div>
                        </section>

                    </div>
                    <div className="w-full md:w-1/4 flex flex-col gap-2 items-center justify-center">
                        <ul className="flex flex-col gap-3 items-center justify-center">
                            <li
                                className="group relative inline-flex items-center overflow-hidden text-black text-2xl p-3 pr-0 hover:pr-3  transition-all duration-300 hover:text-awpink">
                                <a href="#">Bandeaux</a>
                                <img
                                    src="/arrow-right.svg"
                                    alt="arrow"
                                    className="ml-2 h-4 w-4 transform opacity-0 translate-x-full transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                                />
                            </li>
                            <li
                                className="group relative inline-flex items-center overflow-hidden text-black text-2xl p-3 pr-0 hover:pr-3  transition-all duration-300 hover:text-awpink">
                                <a href="#">Bonnets</a>
                                <img
                                    src="/arrow-right.svg"
                                    alt="arrow"
                                    className="ml-2 h-4 w-4 transform opacity-0 translate-x-full transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                                />
                            </li>
                            <li
                                className="group relative inline-flex items-center overflow-hidden text-black text-2xl p-3 pr-0 hover:pr-3  transition-all duration-300 hover:text-awpink">
                                <a href="#">Accessoires</a>
                                <img
                                    src="/arrow-right.svg"
                                    alt="arrow"
                                    className="ml-2 h-4 w-4 transform opacity-0 translate-x-full transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                                />
                            </li>
                        </ul>
                        <a
                            href="#"
                            className="group relative inline-flex items-center overflow-hidden bg-awblack p-3 pr-0 hover:pr-3 text-awgraylight transition-all duration-300 hover:bg-awpink hover:text-black"
                        >
                            Voir la boutique
                            <img
                                src="/arrow-right.svg"
                                alt="arrow"
                                className="ml-2 h-4 w-4 transform opacity-0 translate-x-full transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                            />
                        </a>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </>
    );
}
