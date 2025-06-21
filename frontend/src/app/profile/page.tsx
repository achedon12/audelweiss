"use client";
import React from "react";
import {useAuth} from "@/app/providers";
import LoginOrRegisterForm from "./LoginOrRegisterForm";

const ProfilePage = () => {
    const { user } = useAuth();

    if (!user) {
        return <LoginOrRegisterForm />;
    }

    return null;
};

export default ProfilePage;