import { MercadoPagoConfig, Preference } from "mercadopago";
import type {
    CreatePreferencePayload,
    PreferencePayer,
    PreferenceBackUrl,
} from "mercadopago/models/preferences/create-payload.model";
import { NextApiRequest, NextApiResponse } from "next";
import { GetCartAndUser } from "@/utils/getCartAndUser";

export default function paymentMercadoPagoHandler(
    req: NextApiRequest,
    res: NextApiResponse<{ global: string | undefined }>
) {
    console.log("Se empezo el proceso");

    const { cart, user }: any = GetCartAndUser()();

    const mercadopago = new MercadoPagoConfig({
        accessToken: process.env.MP_ACCESS_TOKEN as string,
    });

    const preferenceOptions: CreatePreferencePayload | any = {
        binary_mode: true,
        items: [
            {
                title: `${cart.products.title} - Nombre de la marca`,
                description: `${cart.products.description}`,
                picture_url: `${cart.products.image}`,
                quantity: 1 as number,
                currency_id: "ARS",
                unit_price: cart.products.price as number,
            },
        ],
        payer: {
            name: user.email as string,
            surname: user.email.split(" ")[1] ?? ("TGB" as string),
            email: user.email as string,
        } as PreferencePayer,
        back_urls: {
            success: "https://success.com",
            failure: "https://failure.com",
            pending: "https://pending.com",
        } as PreferenceBackUrl,
        auto_return: "approved",
    };

    console.log("se empieza con las preferencias");
    const preference = new Preference(mercadopago);

    preference
        .create(preferenceOptions)
        .then(function (result) {
            res.status(200).json({ global: result.id });
        })
        .catch((error: any) => {
            res.status(500).json({ global: error });
        });
}
