import { NextResponse } from 'next/server';

//const protectedPrefixes = ['/dashboard'];
//const publicPaths = ['/public/login', '/public/register', '/'];

export function middleware() {
    /*const token = req.headers.get('Authorization');
    const path = req.nextUrl.pathname;

    const isProtected = protectedPrefixes.some(prefix => path.startsWith(prefix));
    const isPublic = publicPaths.includes(path);

    console.log(token);
    
    if (isProtected && !token) {
        console.log(`Redirecting to login from protected: ${path}`);
        return NextResponse.redirect(new URL('/public/login', req.url));
    }
    
    if (isPublic && token) {
        console.log(`Redirecting to dashboard from public: ${path}`);
        return NextResponse.redirect(new URL('/dashboard/main', req.url));
    }*/

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};