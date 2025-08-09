import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_APP_URL}/auth`, req.url));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

        // Optional: You can attach user data to request headers for API routes
        const requestHeaders = new Headers(req.headers);
        requestHeaders.set("x-user", JSON.stringify(decoded));

        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_APP_URL}/not_found`, req.url));
    }
}

export const config = {
    matcher: ["/dashboard/:path*", "/profile/:path*", "/api/protected/:path*"],
};
