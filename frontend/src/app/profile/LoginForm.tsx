import {useState} from "react";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
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
                Se connecter
            </button>
        </form>
    );
}
