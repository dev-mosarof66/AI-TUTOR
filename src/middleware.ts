import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from 'jose'


export async function middleware(req: NextRequest) {


    try {
        const token = req.cookies.get("token")?.value;
        console.log('token in middleware : ', token)
        if (!token) {
            return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_APP_URL}/auth`, req.url));
        }
        const secret = new TextEncoder().encode(process.env.JWT_SECRET)
        const { payload } = await jose.jwtVerify(token, secret);
        const requestHeaders = new Headers(req.headers);
        requestHeaders.set("user", JSON.stringify(payload));
        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    } catch (error) {
        console.log('error in middleware : ', error)
        return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_APP_URL}/not_found`, req.url));
    }
}

export const config = {
    matcher: ["/dashboard/:path*", "/profile/:path*"],
};
