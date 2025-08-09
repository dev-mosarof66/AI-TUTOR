import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import generateTransactionId from '@/utils/tranIdGenerator'

const STORE_ID = process.env.STORE_ID as string;
const STORE_PASSWORD = process.env.STORE_PASSWORD as string;
const BASE_URL = process.env.BASE_URL as string;

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const tran_id = generateTransactionId(body.product_name)

        const data = {
            total_amount: body.total_amount * 123,
            tran_id,
            currency: "BDT",
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/success`,
            fail_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/fail`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/cancel`,
            ipn_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/ipn`,
            shipping_method: "NO",
            product_name: body.product_name,
            product_category: "General",
            product_profile: "general",
            cus_name: body.cus_name,
            cus_email: body.cus_email,
            cus_add1: body.cus_add1,
            cus_city: body.cus_city,
            cus_country: "Bangladesh",
            cus_phone: body.cus_phone,
        };

        const formData = new URLSearchParams();
        formData.append("store_id", STORE_ID);
        formData.append("store_passwd", STORE_PASSWORD);
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value as string);
        });

        const response = await axios.post(
            `${BASE_URL}gwprocess/v4/api.php`,
            formData.toString(),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );

        const result = response.data;

        if (result.status === 'FAILED') {
            return NextResponse.json(
                { error: "Failed to initiate payment", data: null },
                { status: 500 }
            );
        }

        if (!result.GatewayPageURL) {
            return NextResponse.json(
                { error: "Failed to initiate payment", data: null },
                { status: 500 }
            );
        }
        return NextResponse.json({

            gatewayUrl: result.GatewayPageURL,

        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Unknown error" },
            { status: 500 }
        );
    }
}
