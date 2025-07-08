export default function CommandPage() {

    return(
        <div>
            <div className="flex flex-col items-center pt-10 pb-20">
                <h1 className="text-3xl font-semibold">Merci pour votre commande !</h1>
                <p className="pt-6 pb-6">Votre commande a bien été prise en compte. Vous pouvez dès à présent consulter votre facture.</p>
                <button className="bg-black text-white p-2 pl-4 pr-4 hover:bg-pink-400 transition hover:cursor-pointer">Consulter ma facture</button>
            </div>
        </div>
    );
}