"use client";
import {useRouter, useSearchParams} from "next/navigation";
import React, {useEffect, useState} from "react";
import {useAuth} from "@/app/providers";
import FormInput from "@/components/FormInput/FormInput";
import {create, get, update} from "@/app/utils/get-data-page";
import Swal from "sweetalert2";

type Country = {
    id: number;
    name: string;
    slug: string;
};

const Page = () => {
    const {user} = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const type = searchParams.get("type");
    const typeId = searchParams.get("typeId");
    const addressId = searchParams.get("addressId");
    const [userAvailableCountries, setUserAvailableCountries] = useState<Country[]>([]);    const [formData, setFormData] = useState({
        firstname: "",
        name: "",
        companyName: "",
        country: "",
        address: "",
        zipcode: "",
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

        const fetchAddress = async () => {
            if (addressId) {
                try {
                    const data = await get(`/user-adresses/${addressId}`, {populate: "*"});
                    const addr = data.data;
                    setFormData({
                        firstname: addr.firstname || "",
                        name: addr.name || "",
                        companyName: addr.companyName || "",
                        country: addr.country?.id ? String(addr.country.id) : "",
                        address: addr.address || "",
                        zipcode: addr.zipcode || "",
                        city: addr.city || "",
                        email: addr.email || user?.email || "",
                    });
                } catch (error) {
                    console.error("Erreur lors du chargement de l'adresse:", error);
                }
            }
        };

        fetchCountries();
        fetchAddress();
    }, [addressId, user?.email]);

    const toOptions = (countries: Country[] = []) =>
        (countries ?? []).map((c) => ({ label: c.name, key: String(c.id) }));

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = {
                user: user?.id,
                user_address_type: Number(typeId),
                ...formData,
                country: Number(formData.country)
            };
            let response;
            if (addressId) {
                response = await update(`/user-adresses/${addressId}`, {data: payload});
            } else {
                response = await create("/user-adresses", {data: payload});
            }

            if (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Adresse enregistrée',
                    text: 'Votre adresse a été enregistrée avec succès.',
                    toast: true,
                    position: 'top-end',
                    timer: 3000,
                    showConfirmButton: false
                });
                router.push("/profile/address");
            }
        } catch {
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: "Une erreur s&apos;est produite lors de l&apos;enregistrement de l&apos;adresse.",
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
                    value={formData.name}
                    onChange={handleChange}
                    name="name"
                    required
                />
            </div>
            <FormInput
                label="Nom de l&apos;entreprise (facultatif)"
                type="text"
                name="companyName"
                placeholder="Nom de l&apos;entreprise"
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
                name="address"
                placeholder="Adresse"
                value={formData.address}
                onChange={handleChange}
                required
            />
            <FormInput
                label="Code postal"
                type="text"
                name="zipcode"
                placeholder="Code postal"
                value={formData.zipcode}
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
            <button type="submit"
                    className="bg-awpastel text-awblack cursor-pointer py-2 w-1/2 mt-4 hover:bg-awsalmon transition-colors duration-300">
                {addressId ? "Modifier l'adresse" : "Enregistrer l'adresse"}
            </button>
        </form>
    );
};

export default Page;