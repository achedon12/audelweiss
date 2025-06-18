import {useState} from "react";
import {setToken} from "@/providers/auth";
import {useRouter} from "next/navigation";

const RegisterForm = () => {
    const router = useRouter();

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/auth/local/register`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        username: userName,
                    }),
                    method: 'POST',
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Erreur lors de l'inscription");
            }

            setToken(response);
            router.push('/profile');

        } catch (error) {
            console.error("Erreur lors de l'inscription :", error);
            alert("Une erreur s'est produite lors de l'inscription. Veuillez réessayer.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                placeholder="Nom d'utilisateur"
                className="w-full p-2 border rounded"
                value={userName}
                onChange={e => setUserName(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Email"
                className="w-full p-2 border rounded"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Mot de passe"
                className="w-full p-2 border rounded"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
            />
            <button type="submit" className="w-full bg-awsalmon text-white py-2 rounded">
                S’inscrire
            </button>
        </form>
    );
}

export default RegisterForm;