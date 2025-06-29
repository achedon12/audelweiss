"use client";

import React, {useEffect, useState} from "react";
import {useAuth} from "@/app/providers";
import {get} from "@/app/utils/get-data-page";

type AddressType = "BILLING" | "DELIVERY";
type Address = {
    street?: string;
    zip?: string;
    city?: string;
    country?: string;
    type?: AddressType;
} | null;

type AddressComponentProps = {
    type: AddressType;
    address: Address;
};

const AddressComponent: React.FC<AddressComponentProps> = ({ type, address }) => (
    <div>
        <h3 className="text-xl font-semibold mb-2 text-awblack">
            {type === "BILLING" ? "Adresse de facturation" : "Adresse de livraison"}
        </h3>
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

const Page = () => {
    const { user } = useAuth();
    const [userBillingAddress, setUserBillingAddress] = useState<Address>(null);
    const [userDeliveryAddress, setUserDeliveryAddress] = useState<Address>(null);

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const data = await get(`/user-adresses`, {
                    urlParamsObject: {
                        filters: { user: { id: { $eq: user?.id } } },
                        populate: {
                            user: {populate: "*" },
                            userAddressType: {populate: "*" },
                        }
                    }
                });
                const res = data.data;
                if (res && res.length > 0) {
                    console.log(res)
                    const billingAddress = res.find((address: Address) => address.type === "BILLING") || null;
                    const deliveryAddress = res.find((address: Address) => address.type === "DELIVERY") || null;
                    setUserBillingAddress(billingAddress);
                    setUserDeliveryAddress(deliveryAddress);
                }
            } catch (error) {
                console.error("Erreur lors du chargement des adresses:", error);
            }
        };
        if (user?.id) fetchAddress();
    }, [user?.id]);

    return (
        <div className="col-span-4 p-8">
            <p className="text-awblack text-sm">
                Les adresses suivantes seront utilisées par défaut sur la page de commande.
            </p>
            <div className="grid grid-cols-2 gap-10 mt-8">
                <AddressComponent type="BILLING" address={userBillingAddress} />
                <AddressComponent type="DELIVERY" address={userDeliveryAddress} />
            </div>
        </div>
    );
};

export default Page;