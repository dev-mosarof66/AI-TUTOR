/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {

        return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_APP_URL}/pricing/cancel`, req.url), 303)
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Unknown error" }, { status: 500 });
    }
}
