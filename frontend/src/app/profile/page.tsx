"use client";
import React from "react";
import {useAuth} from "@/app/providers";
import LoginOrRegisterForm from "./LoginOrRegisterForm";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProfilePage = () => {
    const {user} = useAuth();

    return user ? null : (
        <div className="w-full h-full mt-16">
            <LoginOrRegisterForm />
        </div>
    );
};

export default ProfilePage;