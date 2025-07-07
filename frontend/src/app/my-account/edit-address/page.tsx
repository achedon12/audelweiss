"use client";

import React, {useEffect, useState} from "react";
import {useAuth} from "@/app/providers";
import {get} from "@/app/utils/get-data-page";
import {useRouter} from "next/navigation";

type AddressType = {
    id: string;
    documentId: string;
    name: string;
    slug: string;
}

type Address = {
    id: string;
    documentId: string;
    user: any;
    user_address_type: any;
    firstname: string,
    name: string,
    companyName: string,
    country: any,
    address: string,
    zipcode: string,
    city: string,
} | null;

const AddressComponent: React.FC<{ address: Address, type: AddressType }> = ({address, type}) => {
    const router = useRouter();
    const handleAction = () => {
        if (type) {
            if (address) {
                router.push(`/profile/address/form?typeId=${type.id}&type=${type.name}&addressId=${address.documentId}`);
            } else {
                router.push(`/profile/address/form?typeId=${type.id}&type=${type.name}`);
            }
        }
    };

    return (
        <div>
            <h3 className="text-xl font-semibold mb-2 text-awblack">
                {type?.name === "BILLING" ? "Adresse de facturation" : type?.name === "DELIVERY" ? "Adresse de livraison" : "Adresse"}
            </h3>
            <p
                className={"my-4 text-right text-green-700 font-bold text-sm cursor-pointer underline"}
                onClick={handleAction}
            >
                {address
                    ? (type?.name === "BILLING" ? "Modifier l'adresse de facturation" : type?.name === "DELIVERY" ? "Modifier l'adresse de livraison" : "Modifier l'adresse")
                    : (type?.name === "BILLING" ? "Ajouter une adresse de facturation" : type?.name === "DELIVERY" ? "Ajouter une adresse de livraison" : "Ajouter une adresse")
                }
            </p>
            {address ? (
                <div className={"italic text-awblack flex flex-col gap-2 mt-4"}>
                    {address.companyName && <div>{address.companyName}</div>}
                    <div>
                        {address.firstname} {address.name}
                    </div>
                    <div>{address.address}</div>
                    <div>
                        {address.zipcode} {address.city}
                    </div>
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
                    const address = userAddress?.find((addr: { user_address_type: { id: string; }; }) => addr.user_address_type?.id === type.id);
                    return (
                        <AddressComponent key={type.id} address={address} type={type} />
                    );
                })}
            </div>
        </div>
    );
};

export default Page;