import React, {useState} from "react";
import {useAuth} from "@/app/providers";
import {useRouter} from "next/navigation";
import FormInput from "@/components/FormInput/FormInput";

export default function LoginOrRegisterForm() {
    const [loginEmail, setLoginEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState<string | null>(null);

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerError, setRegisterError] = useState<string | null>(null);

    const {login, register} = useAuth();
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError(null);
        const success = await login(loginEmail, password);
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
            setRegisterError("Erreur lors de l'inscription. Veuillez réessayer.");
        }
    };

    return (
        <>
            <form onSubmit={handleLogin} className="col-span-2 pl-8 py-8">
                <h2 className="font-bold text-xl text-awblack">Se connecter</h2>
                <div className="pl-8 py-16">
                    <FormInput
                        label="Identifiant ou e-mail"
                        type="text"
                        value={loginEmail}
                        onChange={e => setLoginEmail(e.target.value)}
                        required
                        name="login"
                        autoComplete="username"
                    />
                    <FormInput
                        label="Mot de passe"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        name="password"
                        autoComplete="current-password"
                    />
                    {loginError && <div className="text-red-500">{loginError}</div>}
                    <div className="flex justify-between items-center">
                        <button type="submit"
                                className="bg-awpastel text-awblack font-bold py-2 cursor-pointer w-1/2 hover:bg-awsalmon transition-colors duration-300">
                            Se connecter
                        </button>
                        <div className="flex items-center">
                            <input type="checkbox" id="rememberMe" className="mr-2"/>
                            <label htmlFor="rememberMe" className="text-sm text-awblack">Se souvenir de moi</label>
                        </div>
                    </div>
                    <div className="mt-4">
                        <a href="/forgot-password" className="text-awsalmon underline cursor-pointer font-bold">
                            Mot de passe perdu ?
                        </a>
                    </div>
                </div>
            </form>

            <form onSubmit={handleRegister} className="col-span-2 pl-8 py-8">
                <h2 className="font-bold text-xl text-awblack">S'inscrire</h2>
                <div className="pl-8 py-16">
                    <FormInput
                        label="E-mail"
                        type="email"
                        value={registerEmail}
                        onChange={e => setRegisterEmail(e.target.value)}
                        required
                        name="register"
                        autoComplete="email"
                    />
                    <p className="mt-4 text-sm">
                        Un lien permettant de définir un nouveau mot de passe sera envoyé à votre adresse e-mail.
                    </p>
                    <p className="mt-4 text-sm">
                        Tes données personnelles seront utilisées pour améliorer ton expérience sur ce site, gérer l’accès à ton compte et pour d’autres raisons détaillées dans notre [politique de confidentialité].
                    </p>
                    {registerError && <div className="text-red-500">{registerError}</div>}
                    <button type="submit"
                            className="bg-awpastel text-awblack font-bold py-2 cursor-pointer w-1/2 mt-4 hover:bg-awsalmon transition-colors duration-300">
                        S'inscrire
                    </button>
                </div>
            </form>
        </>
    );
}