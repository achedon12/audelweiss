import React, {useState} from "react";
import {useAuth} from "@/app/providers";
import {useRouter} from "next/navigation";

export default function LoginOrRegisterForm() {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState<string | null>(null);

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerError, setRegisterError] = useState<string | null>(null);

    const { login, register } = useAuth();
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError(null);
        const success = await login(loginEmail, loginPassword);
        if (success) {
            router.push("/profile");
        } else {
            setLoginError("Identifiants invalides.");
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setRegisterError(null);
        const userName = registerEmail.split("@")[0];
        const success = await register(registerEmail, userName);
        if (success) {
            router.push("/profile");
        } else {
            setRegisterError("Erreur lors de l&apos;inscription. Veuillez réessayer.");
        }
    };

    return (
        <section className="grid grid-cols-1 lg:grid-cols-8 bg-white h-[50rem]">
            <div className="bg-awcement h-full"></div>
            <div className="bg-awgraylight h-full col-span-2"></div>

            <form onSubmit={handleLogin} className="col-span-2 pl-8 py-8">
                <h2 className="font-bold text-xl text-awblack">Se connecter</h2>
                <div className="pl-8 py-16">
                    <label className="block mb-2 text-sm text-awblack required">Identifiant ou e-mail</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-awsalmon text-awblack"
                        value={loginEmail}
                        onChange={e => setLoginEmail(e.target.value)}
                        required
                    />
                    <label className="block mb-2 text-sm text-awblack required mt-6">Mot de passe</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="w-full p-2 border border-awsalmon mb-4 pr-10 text-awblack"
                            value={loginPassword}
                            onChange={e => setLoginPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-awblack"
                            onClick={() => setShowPassword(v => !v)}
                            tabIndex={-1}
                            aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                    </div>
                    {loginError && <div className="text-red-500">{loginError}</div>}
                    <div className="flex justify-between items-center">
                        <button type="submit" className="bg-awpastel text-awblack font-bold py-2 cursor-pointer w-1/2 hover:bg-awsalmon transition-colors duration-300">
                            Se connecter
                        </button>
                        <div className="flex items-center">
                            <input type="checkbox" id="rememberMe" className="mr-2" />
                            <label htmlFor="rememberMe" className="text-sm text-awblack">Se souvenir de moi</label>
                        </div>
                    </div>
                    <div className="mt-4">
                        <a href="/forgot-password" className="text-awsalmon underline cursor-pointer font-bold">Mot de passe perdu ?</a>
                    </div>
                </div>
            </form>

            <form onSubmit={handleRegister} className="col-span-2 pl-8 py-8">
                <h2 className="font-bold text-xl text-awblack">S'inscrire</h2>
                <div className="pl-8 py-16">
                    <label className="block mb-2 text-sm text-awblack required">E-mail</label>
                    <input
                        type="email"
                        className="w-full p-2 border border-awsalmon text-awblack"
                        value={registerEmail}
                        onChange={e => setRegisterEmail(e.target.value)}
                        required
                    />
                    <p className="mt-4 text-sm">Un lien permettant de définir un nouveau mot de passe sera envoyé à votre adresse e-mail.</p>
                    <p className="mt-4 text-sm">
                        Tes données personnelles seront utilisées pour améliorer ton expérience sur ce site, gérer l’accès à ton compte et pour d’autres raisons détaillées dans notre [politique de confidentialité].
                    </p>
                    {registerError && <div className="text-red-500">{registerError}</div>}
                    <button type="submit" className="bg-awpastel text-awblack font-bold py-2 cursor-pointer w-1/2 mt-4 hover:bg-awsalmon transition-colors duration-300">
                        S'inscrire
                    </button>
                </div>
            </form>
        </section>
    );
}