"use client";
import React from "react";
import {useAuth} from "@/app/providers";
import LoginOrRegisterForm from "./LoginOrRegisterForm";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProfilePage = () => {
    const {user} = useAuth();

    return user ? (
        <div className="max-w-md mx-auto p-8 bg-white">
            <h1 className="text-2xl font-bold mb-4">Bienvenue, {user.username} 👋</h1>
            <p className="text-gray-600">Ton email: {user.email}</p>
        </div>
    ) : (
        <div className="w-full h-full mt-16">
            <LoginOrRegisterForm />
        </div>
    );
};

export default ProfilePage;