"use client";
import React from "react";
import Slider from "react-slick";
import { useFetchUser } from "@/providers/AuthContext";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProfilePage = () => {
    const { user, loading } = useFetchUser();

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Chargement...</div>;
    }

    if (user) {
        return (
            <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Bienvenue, {user.name} 👋</h1>
                <p className="text-gray-600">Ton email: {user.email}</p>
            </div>
        );
    }

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        adaptiveHeight: true,
    };

    return (
        <div className="max-w-md mx-auto">
            <Slider {...settings}>
                <div className="p-6 bg-white rounded-xl shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">Connexion</h2>
                    <LoginForm />
                </div>
                <div className="p-6 bg-white rounded-xl shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">Inscription</h2>
                    <RegisterForm />
                </div>
            </Slider>
        </div>
    );
};

export default ProfilePage;
