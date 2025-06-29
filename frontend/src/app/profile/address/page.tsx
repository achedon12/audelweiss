"use client";

import React, {useEffect, useState} from "react";
import {useAuth} from "@/app/providers";
import {get} from "@/app/utils/get-data-page";
import {useRouter} from "next/navigation";

type AddressType = {
    id: string;
    name: string;
    slug: string;
}

type Address = {
    user: any;
    user_address_type: any;
    lastname?: string;
    firstname?: string;
    street?: string;
    zip?: string;
    city?: string;
    country?: string;
} | null;

const AddressComponent: React.FC<{ address: Address, type: AddressType }> = ({address, type}) => {
    const router = useRouter();
    const handleAdd = () => {
        if (type) {
            router.push(`/profile/address/form?type=${type.id}`);
        }
    };

    return (
        <div>
            <h3 className="text-xl font-semibold mb-2 text-awblack">
                {type?.name === "BILLING" ? "Adresse de facturation" : type?.name === "DELIVERY" ? "Adresse de livraison" : "Adresse"}
            </h3>
            <p
                className={"my-4 text-right text-green-700 font-bold text-sm cursor-pointer underline"}
                onClick={handleAdd}
            >
                Ajouter {type?.name === "BILLING" ? "Adresse de facturation" : type?.name === "DELIVERY" ? "Adresse de livraison" : "Adresse"}
            </p>
            {address ? (
                <div>
                    <div>{address.street}</div>
                    <div>
                        {address.zip} {address.city}
                    </div>
                    <div>{address.country}</div>
                </div>
            ) : (
                <p className="text-sm italic text-awblack">
                    Vous n’avez pas encore défini ce type d’adresse.
                </p>
            )}
        </div>
    );
};

const Page = () => {
    const {user} = useAuth();
    const [userAddress, setUserAddress] = useState<Address>(null);
    const [adressTypes, setAddressTypes] = useState<AddressType[]>([]);

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const data = await get(`/user-adresses`, {
                    filters: {user: {id: {$eq: user?.id}}},
                    populate: "*"
                });
                const res = data.data;
                if (res && res.length > 0) {
                    setUserAddress(res);
                }
            } catch (error) {
                console.error("Erreur lors du chargement des adresses:", error);
            }
        };

        const fetchAddressTypes = async ()=> {
            try {
                const data = await get(`/user-address-types`, {
                    populate: "*"
                });
                const addressTypes = data.data;
                if (addressTypes && addressTypes.length > 0) {
                    setAddressTypes(addressTypes);
                }
            } catch (error) {
                console.error("Erreur lors du chargement des types d'adresses:", error);
            }
        }

        if (user?.id) {
            fetchAddress();
            fetchAddressTypes();
        }
    }, [user?.id]);

    return (
        <div className="col-span-4 p-8">
            <p className="text-awblack text-sm">
                Les adresses suivantes seront utilisées par défaut sur la page de commande.
            </p>
            <div className="grid grid-cols-2 gap-10 mt-8">
                {adressTypes.map((type) => {
                    const address = userAddress?.find((addr) => addr.user_address_type?.id === type.id);
                    return (
                        <AddressComponent key={type.id} address={address} type={type} />
                    );
                })}
            </div>
        </div>
    );
};

export default Page;