import {fetchAPI} from "@/app/utils/fetch-api";


const AboutPage = async ({params}: { params: { lang: string } }) => {
    const getAbout = async (lang: string): Promise<any> => {
        const token = process.env.STRAPI_API_TOKEN;

        if (!token) throw new Error("The Strapi API Token environment variable is not set.");

        const path = "/about-page";
        const options = {headers: {Authorization: `Bearer ${token}`}};

        const urlParamsObject = {
            locale: lang,
        }
        return await fetchAPI(path, urlParamsObject, options);
    }

    const pageContent = await getAbout(params.lang);

    const {title, content} = pageContent.data;

    return (
        <div className="">
            <div className="">
                <div className="">
                    <div className="">
                        <div className="">
                            <div className="">
                                <div className="">
                                    <h2 className=""> créatrice embrunaise - passionnée - curieuse -</h2></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div
                        className="">
                        <div className="">
                            <span className="">
                                <img data-lazyloaded="1"
                                     src="https://audelweiss.fr/wp-content/uploads/2025/02/4104fbf5c55d4d538cff844b8c94c2e3-scaled.webp"
                                     fetchPriority="high" decoding="async"
                                     width="2560" height="1520"
                                     data-src="https://audelweiss.fr/wp-content/uploads/2025/02/4104fbf5c55d4d538cff844b8c94c2e3-scaled.webp"
                                     alt="" title="4104fbf5c55d4d538cff844b8c94c2e3"
                                     data-srcset="https://audelweiss.fr/wp-content/uploads/2025/02/4104fbf5c55d4d538cff844b8c94c2e3-scaled.webp 2560w, https://audelweiss.fr/wp-content/uploads/2025/02/4104fbf5c55d4d538cff844b8c94c2e3-1280x760.webp 1280w, https://audelweiss.fr/wp-content/uploads/2025/02/4104fbf5c55d4d538cff844b8c94c2e3-980x582.webp 980w, https://audelweiss.fr/wp-content/uploads/2025/02/4104fbf5c55d4d538cff844b8c94c2e3-480x285.webp 480w"
                                     data-sizes="(min-width: 0px) and (max-width: 480px) 480px, (min-width: 481px) and (max-width: 980px) 980px, (min-width: 981px) and (max-width: 1280px) 1280px, (min-width: 1281px) 2560px, 100vw"
                                     className="wp-image-22127 entered litespeed-loaded"
                                     data-ll-status="loaded"
                                     sizes="(min-width: 0px) and (max-width: 480px) 480px, (min-width: 481px) and (max-width: 980px) 980px, (min-width: 981px) and (max-width: 1280px) 1280px, (min-width: 1281px) 2560px, 100vw"
                                     srcSet="https://audelweiss.fr/wp-content/uploads/2025/02/4104fbf5c55d4d538cff844b8c94c2e3-scaled.webp 2560w, https://audelweiss.fr/wp-content/uploads/2025/02/4104fbf5c55d4d538cff844b8c94c2e3-1280x760.webp 1280w, https://audelweiss.fr/wp-content/uploads/2025/02/4104fbf5c55d4d538cff844b8c94c2e3-980x582.webp 980w, https://audelweiss.fr/wp-content/uploads/2025/02/4104fbf5c55d4d538cff844b8c94c2e3-480x285.webp 480w"/>
                            </span>
                        </div>
                        <div className="">
                            <span className="">
                                <img data-lazyloaded="1"
                                     src="https://audelweiss.fr/wp-content/uploads/2025/02/pexels-anete-lusina-4792084-scaled.jpg.webp"
                                     decoding="async" width="2560" height="1709"
                                     data-src="https://audelweiss.fr/wp-content/uploads/2025/02/pexels-anete-lusina-4792084-scaled.jpg.webp"
                                     alt="" title="pexels-anete-lusina-4792084"
                                     data-srcset="https://audelweiss.fr/wp-content/uploads/2025/02/pexels-anete-lusina-4792084-scaled.jpg.webp 2560w, https://audelweiss.fr/wp-content/uploads/2025/02/pexels-anete-lusina-4792084-1280x855.jpg.webp 1280w, https://audelweiss.fr/wp-content/uploads/2025/02/pexels-anete-lusina-4792084-980x654.jpg.webp 980w, https://audelweiss.fr/wp-content/uploads/2025/02/pexels-anete-lusina-4792084-480x320.jpg.webp 480w"
                                     data-sizes="(min-width: 0px) and (max-width: 480px) 480px, (min-width: 481px) and (max-width: 980px) 980px, (min-width: 981px) and (max-width: 1280px) 1280px, (min-width: 1281px) 2560px, 100vw"
                                     className="wp-image-22256 entered litespeed-loaded"
                                     loading="lazy" data-ll-status="loaded"
                                     sizes="(min-width: 0px) and (max-width: 480px) 480px, (min-width: 481px) and (max-width: 980px) 980px, (min-width: 981px) and (max-width: 1280px) 1280px, (min-width: 1281px) 2560px, 100vw"
                                     srcSet="https://audelweiss.fr/wp-content/uploads/2025/02/pexels-anete-lusina-4792084-scaled.jpg.webp 2560w, https://audelweiss.fr/wp-content/uploads/2025/02/pexels-anete-lusina-4792084-1280x855.jpg.webp 1280w, https://audelweiss.fr/wp-content/uploads/2025/02/pexels-anete-lusina-4792084-980x654.jpg.webp 980w, https://audelweiss.fr/wp-content/uploads/2025/02/pexels-anete-lusina-4792084-480x320.jpg.webp 480w"/>
                            </span>
                        </div>
                    </div>
                    <div className="">
                        <div className="">
                            <div className="">
                                <h1>À propos de<br/>la créatrice</h1>
                                <p>Je m’appelle Audrey, créatrice de la marque <em>@audelweiss.craft</em>.</p>
                                <p>J’ai grandi à <strong>Embrun</strong>, une petite ville nichée
                                    <strong>au cœur des Hautes-Alpes</strong>, entourée de montagnes et de paysages grandioses.
                                    Ces racines alpines ont forgé mon amour de la nature et de l’authenticité, des valeurs
                                qui m’accompagnent toujours aujourd’hui.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="">
                <div className="">
                    <div className="">
                        <div className="">
                            <div className="">
                                <h2>Un retour aux sources</h2>
                                <p>En 2022, lassée par la vie à Lyon (que je n’ai jamais vraiment aimé),
                                    j’ai choisi de revenir m’établir dans l’Embrunais pour retrouver un équilibre
                                    de vie et nourrir mon inspiration créative.&nbsp;</p>
                            </div>
                        </div>
                        <div className="">
                            <span className="">
                                <img data-lazyloaded="1"
                                     src="https://audelweiss.fr/wp-content/uploads/2025/02/montagne.svg"
                                     decoding="async"
                                     data-src="https://audelweiss.fr/wp-content/uploads/2025/02/montagne.svg"
                                     alt="" title="montagne"
                                     className="wp-image-22113 entered litespeed-loaded"
                                     loading="lazy" data-ll-status="loaded"/>
                            </span>
                        </div>
                    </div>
                    <div className="">
                        <div className="">
                            <div className="et_pb_text_inner">
                                <h2>La découverte du crochet</h2>
                                <p>C’est au cours du
                                deuxième semestre 2024 que j’ai découvert une nouvelle passion : le crochet. Ce fut
                                une révélation. Rapidement, j’ai commencé à créer des pièces uniques, à la fois
                                positives et colorées, avec l’envie d’apporter un peu de douceur et de joie dans le
                                quotidien des autres. Chaque création est imprégnée de l’énergie du Reiki, une
                                discipline que je pratique depuis 2021.</p>
                            </div>
                        </div>
                        <div className="">
                            <span className="et_pb_image_wrap ">
                                <img data-lazyloaded="1"
                                     src="https://audelweiss.fr/wp-content/uploads/2025/02/crochet-positif.svg"
                                     decoding="async"
                                     data-src="https://audelweiss.fr/wp-content/uploads/2025/02/crochet-positif.svg"
                                     alt="" title="crochet positif"
                                     className="wp-image-22516 entered litespeed-loaded"
                                     loading="lazy" data-ll-status="loaded"/>
                            </span>
                        </div>
                    </div>
                    <div className="">
                        <div className="">
                            <div className="et_pb_text_inner">
                                <h2>L’origine de la marque</h2>
                                <p>Le nom de ma marque, <strong>Audelweiss</strong>, n’est pas anodin. Il est né de l’association de
                                mon premier et de mon troisième prénom, Edelweiss, éponyme de cette fleur rare qui
                                pousse en altitude et symbolise la pureté et la résilience. Ce choix reflète mon
                                attachement profond à mes montagnes haut-alpines.</p>
                            </div>
                        </div>
                        <div className="">
                            <span className="et_pb_image_wrap ">
                                <img data-lazyloaded="1"
                                     src="https://audelweiss.fr/wp-content/uploads/2025/02/edelweiss.svg"
                                     decoding="async"
                                     data-src="https://audelweiss.fr/wp-content/uploads/2025/02/edelweiss.svg"
                                     alt="" title="edelweiss"
                                     className="wp-image-22517 entered litespeed-loaded"
                                     loading="lazy" data-ll-status="loaded"/>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="">
                        <div className="">
                            <div className="">
                                <p>Avec Audelweiss Craft, je vous invite à découvrir
                                un univers où se mêlent créativité, bien-être et amour du fait main.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="">
                        <div className="">
                            <div className="">
                                <h2>Mon parcours professionnel</h2>
                                <p>Après des études en informatique et en création de sites internet, je me suis installée à Lyon pour
                                développer mes compétences dans le digital. Le web, en constante évolution, m’a
                                permis d’<strong>explorer la création sous diverses formes, alliant technique et
                                    esthétique</strong>. Cette immersion dans la conception digitale a posé les
                                bases de ma démarche artistique. Aujourd’hui freelance spécialisée en développement
                                web et design UI/UX, je transmets également mon savoir en tant que formatrice.</p>
                                <p>Cette aventure créative s’est enrichie avec ma découverte du crochet, une
                                    nouvelle forme d’expression artistique qui me permet d’allier matières, couleurs
                                    et énergie.</p>
                                </div>
                        </div>
                        <div className="">
                            <a className="" href="https://audreyhossepian.fr" target="_blank" data-icon="$">Découvrir mon site
                                freelance</a>
                        </div>
                    </div>
                    <div className="">
                        <div className="">
                            <span className="et_pb_image_wrap ">
                                <img data-lazyloaded="1"
                                     src="https://audelweiss.fr/wp-content/uploads/2025/02/moidev.jpg.webp"
                                     decoding="async" width="1323" height="992"
                                     data-src="https://audelweiss.fr/wp-content/uploads/2025/02/moidev.jpg.webp"
                                     alt="" title="moidev"
                                     data-srcset="https://audelweiss.fr/wp-content/uploads/2025/02/moidev.jpg.webp 1323w, https://audelweiss.fr/wp-content/uploads/2025/02/moidev-1280x960.jpg.webp 1280w, https://audelweiss.fr/wp-content/uploads/2025/02/moidev-980x735.jpg.webp 980w, https://audelweiss.fr/wp-content/uploads/2025/02/moidev-480x360.jpg.webp 480w"
                                     data-sizes="(min-width: 0px) and (max-width: 480px) 480px, (min-width: 481px) and (max-width: 980px) 980px, (min-width: 981px) and (max-width: 1280px) 1280px, (min-width: 1281px) 1323px, 100vw"
                                     className="wp-image-22515 entered litespeed-loaded"
                                     loading="lazy" data-ll-status="loaded"
                                     sizes="(min-width: 0px) and (max-width: 480px) 480px, (min-width: 481px) and (max-width: 980px) 980px, (min-width: 981px) and (max-width: 1280px) 1280px, (min-width: 1281px) 1323px, 100vw"
                                     srcSet="https://audelweiss.fr/wp-content/uploads/2025/02/moidev.jpg.webp 1323w, https://audelweiss.fr/wp-content/uploads/2025/02/moidev-1280x960.jpg.webp 1280w, https://audelweiss.fr/wp-content/uploads/2025/02/moidev-980x735.jpg.webp 980w, https://audelweiss.fr/wp-content/uploads/2025/02/moidev-480x360.jpg.webp 480w"/>
                            </span>
                        </div>
                        <div className="">
                            <span className="et_pb_image_wrap ">
                                <img data-lazyloaded="1"
                                     src="https://audelweiss.fr/wp-content/uploads/2025/02/bg-bureau.jpg.webp"
                                     decoding="async" width="1050" height="700"
                                     data-src="https://audelweiss.fr/wp-content/uploads/2025/02/bg-bureau.jpg.webp"
                                     alt="" title="bg-bureau"
                                     data-srcset="https://audelweiss.fr/wp-content/uploads/2025/02/bg-bureau.jpg.webp 1050w, https://audelweiss.fr/wp-content/uploads/2025/02/bg-bureau-980x653.jpg.webp 980w, https://audelweiss.fr/wp-content/uploads/2025/02/bg-bureau-480x320.jpg.webp 480w"
                                     data-sizes="(min-width: 0px) and (max-width: 480px) 480px, (min-width: 481px) and (max-width: 980px) 980px, (min-width: 981px) 1050px, 100vw"
                                     className="wp-image-22514 entered litespeed-loaded"
                                     loading="lazy" data-ll-status="loaded"
                                     sizes="(min-width: 0px) and (max-width: 480px) 480px, (min-width: 481px) and (max-width: 980px) 980px, (min-width: 981px) 1050px, 100vw"
                                     srcSet="https://audelweiss.fr/wp-content/uploads/2025/02/bg-bureau.jpg.webp 1050w, https://audelweiss.fr/wp-content/uploads/2025/02/bg-bureau-980x653.jpg.webp 980w, https://audelweiss.fr/wp-content/uploads/2025/02/bg-bureau-480x320.jpg.webp 480w"/>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}