"use client";
import React, {createContext, useContext, useEffect, useState} from "react";
import ReactDOMServer from "react-dom/server";
import {ThemeProvider} from "next-themes";
import {useRouter} from "next/navigation";
import MailConfirmation from "@/templates/mailConfirmation";

type User = {
    id: number;
    username: string;
    email: string;
    firstname?: string;
    lastname?: string;
    createdAt: string;
    updatedAt: string;
};

type AuthContextType = {
    user: User | null;
    token: string | null;
    login: (identifier: string, password: string) => Promise<boolean>;
    register: (email: string, username: string) => Promise<boolean>;
    logout: () => void;
    setUser?: (user: User | null) => void;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    token: null,
    login: async () => false,
    register: async () => false,
    logout: () => {},
    setUser: () => {},
});

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");
        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
    }, []);

    const login = async (identifier: string, password: string) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/auth/local`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({identifier, password}),
            });
            if (!res.ok) return false;
            const data = await res.json();
            setUser(data.user);
            setToken(data.jwt);
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.jwt);
            return true;
        } catch {
            return false;
        }
    };

    const register = async (email: string, username: string) => {
        const password = Math.random().toString(36).slice(-8) + "!" + Math.random().toString(36).slice(-4);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/auth/local/register`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password, username}),
            });
            if (!res.ok) return false;
            const data = await res.json();
            setUser(data.user);
            setToken(data.jwt);
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.jwt);

            await sendConfirmationEmail(email, username, password, data.jwt);
            return true;
        } catch {
            return false;
        }
    }

    const sendConfirmationEmail = async (email: string, username: string, password: string, jwt: string) => {
        try {
            const html = ReactDOMServer.renderToStaticMarkup(
                <MailConfirmation
                    username={username}
                    password={password}
                    accountLink={`${process.env.FRONTEND_URL}/profile`}
                    cgvLink={`${process.env.FRONTEND_URL}/cgv`}
                />
            );
            await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/send-email`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    to: email,
                    subject: "Welcome to Our Platform",
                    html
                }),
            });
        } catch (error) {
            console.error("Failed to send confirmation email:", error);
        }
    }

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        router.push("/profile");
    };

    return (
        <AuthContext.Provider value={{user, token, login, register, logout, setUser}}>
            <ThemeProvider attribute="class" enableSystem={false} defaultTheme="light">
                {children}
            </ThemeProvider>
        </AuthContext.Provider>
    );
}

export function Providers({children}: {children: React.ReactNode}) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}