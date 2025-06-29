"use client";
import {useSearchParams} from "next/navigation";
import React, {useEffect, useState} from "react";
import {useAuth} from "@/app/providers";
import FormInput from "@/components/FormInput/FormInput";
import {create, get} from "@/app/utils/get-data-page";
import Swal from "sweetalert2";

type Country = {
    name: string;
    slug: string;
}

const Page = () => {
    const {user} = useAuth();
    const searchParams = useSearchParams();
    const type = searchParams.get("type");
    const typeId = searchParams.get("typeId");
    const [userAvailableCountries, setUserAvailableCountries] = useState<Country[]>([]);
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        companyName: "",
        country: "",
        street: "",
        zip: "",
        city: "",
        email: user?.email || "",
    });

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const data = await get("/user-available-countries");
                setUserAvailableCountries(data.data);
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };

        fetchCountries();
    }, []);

    const toOptions = (countries: Country[] = []) =>
        countries.map((c) => ({label: c.name, key: c.slug}));

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await create(`/user-adresses`, {
                ...formData,
                user: user?.id,
                user_address_type: typeId,
            });
            // Swal.fire({
            //     icon: 'success',
            //     title: 'Adresse enregistrée',
            //     text: "Votre adresse a été enregistrée avec succès.",
            //     toast: true,
            //     position: 'top-end',
            //     timer: 3000,
            //     showConfirmButton: false
            // });
            // setFormData({
            //     firstname: "",
            //     lastname: "",
            //     companyName: "",
            //     country: "",
            //     street: "",
            //     zip: "",
            //     city: "",
            //     email: user?.email || "",
            // });
            // window.location.href = `/profile/address`;
        } catch {
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: "Une erreur s'est produite lors de l'enregistrement de l'adresse.",
                toast: true,
                position: 'top-end',
                timer: 3000,
                showConfirmButton: false
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="col-span-4 p-8">
            <h2 className="text-xl font-bold mb-4">
                {type === "BILLING" ? "Adresse de facturation" : "Adresse de livraison"}
            </h2>
            <div className="grid grid-cols-2 gap-10">
                <FormInput
                    label="Prénom"
                    type="text"
                    value={formData.firstname}
                    onChange={handleChange}
                    name="firstname"
                    required
                />
                <FormInput
                    label="Nom"
                    type="text"
                    value={formData.lastname}
                    onChange={handleChange}
                    name="lastname"
                    required
                />
            </div>
            <FormInput
                label="Nom de l'entreprise (facultatif)"
                type="text"
                name="companyName"
                placeholder="Nom de l'entreprise"
                value={formData.companyName}
                onChange={handleChange}
            />
            <FormInput
                label="Pays/région"
                type="select"
                name="country"
                placeholder="Selectionnez un pays/région"
                value={formData.country}
                onChange={handleChange}
                options={toOptions(userAvailableCountries)}
                required
            />
            <FormInput
                label="Adresse"
                type="text"
                name="street"
                placeholder="Adresse"
                value={formData.street}
                onChange={handleChange}
                required
            />
            <FormInput
                label="Code postal"
                type="text"
                name="zip"
                placeholder="Code postal"
                value={formData.zip}
                onChange={handleChange}
                required
            />
            <FormInput
                label="Ville"
                type="text"
                name="city"
                placeholder="Ville"
                value={formData.city}
                onChange={handleChange}
                required
            />
            <FormInput
                label="Email"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <button type="submit" className="bg-awpastel text-awblack cursor-pointer py-2 w-1/2 mt-4 hover:bg-awsalmon transition-colors duration-300">
                Enregistrer l'adresse
            </button>
        </form>
    );
};

export default Page;