"use client";
import React, {createContext, useContext, useEffect, useState} from "react";
import {ThemeProvider} from "next-themes";

type User = {
    id: number;
    username: string;
    email: string;
};

type AuthContextType = {
    user: User | null;
    token: string | null;
    login: (identifier: string, password: string) => Promise<boolean>;
    register: (email: string, username: string) => Promise<boolean>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    token: null,
    login: async () => false,
    register: async () => false,
    logout: () => {
    },
});

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

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
        const strongPassword = Math.random().toString(36).slice(-8);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/auth/local/register`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, strongPassword, username}),
            });
            if (!res.ok) return false;
            const data = await res.json();
            setUser(data.user);
            setToken(data.jwt);
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.jwt);

            await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/send-email`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    to: email,
                    subject: "Welcome to Our Platform",
                    text: `Hello ${username},\n\nYour account has been created successfully.\n\nUsername: ${username}\nPassword: ${strongPassword}\n\nPlease change your password after logging in for the first time.\n\nBest regards,\nThe Team`,
                }),
            });
            return true;
        } catch {
            return false;
        }
    }

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{user, token, login, register, logout}}>
            <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
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