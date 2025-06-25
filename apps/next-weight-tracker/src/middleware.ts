import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ['/dashboard/main', '/dashboard/profile', '/dashboard/history'];
const publicRoutes = ['/public/login', '/public/register', '/'];

export function middleware(req: NextRequest) {
    const token = req.cookies.get('refresh_token')?.value;
    const path = req.nextUrl.pathname;

    const isProtected = protectedRoutes.includes(path);
    const isPublic = publicRoutes.includes(path);

    if (isProtected && !token) {
        return NextResponse.redirect(new URL('/public/login', req.url));
    }

    if (isPublic && token && !path.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/dashboard/main', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)'],
};