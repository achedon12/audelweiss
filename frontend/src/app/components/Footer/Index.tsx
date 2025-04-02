export default function Footer() {
    return (
        <footer className="bg-awblack p-2">
            <div className="w-[80%] ml-auto mr-auto">
                <section className="flex flex-col md:flex-row gap-2 items-baseline justify-center mt-2 md:mt-5">
                    <article className="flex flex-col gap-3 w-full md:w-1/3">
                        <h3 className="text-center md:text-left">Besoin d'aide ?</h3>
                        <ul className="flex flex-col gap-2 text-aworange text-center md:text-left">
                            <a href="#">Points de vente physiques</a>
                            <a href="#">Livraison</a>
                            <a href="#">Foire aux questions</a>
                            <a href="#">Me contacter</a>
                        </ul>
                    </article>
                    <article className="flex flex-col items-center gap-3 w-full md:w-1/3">
                        <img src="" alt="logo"/>
                        <p className="text-center">
                            Chaque pièce est imaginée et réalisée à la main dans les Hautes-Alpes, avec passion et
                            créativité. Un mélange d’authenticité, d’expérimentation et d’énergie positive pour apporter
                            douceur et harmonie à votre quotidien.
                        </p>
                        <p className="text-center">
                            Retrouvez-moi sur Instagram pour suivre les actus 🧶✨
                        </p>
                        <a href="#" className="flex items-center justify-center p-2 border-1 border-aworange rounded-full">
                            <img src="" alt="instagram"/>
                        </a>
                    </article>
                    <article className="flex flex-col gap-3 w-full md:w-1/3">
                        <h3 className="text-center md:text-right">Liens utiles</h3>
                        <ul className="flex flex-col gap-2 text-aworange text-center md:text-right">
                            <a href="#">CGV</a>
                            <a href="#">Mentions légales</a>
                            <a href="#">Politique de confidentialité</a>
                        </ul>
                    </article>
                </section>
            </div>
        </footer>
    );
}