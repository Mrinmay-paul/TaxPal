import { NextRequest, NextResponse } from "next/server";


export function proxy(request: NextRequest){
    // const token = request.cookies.get('token')?.value;
    const token = localStorage.getItem('token');
    const isAuthPage = request.nextUrl.pathname.startsWith('/user/login') || request.nextUrl.pathname.startsWith('/user/sign-up');

    if(!token && !isAuthPage){
        return NextResponse.redirect(new URL('/user/login', request.url));
    }

    if(token && isAuthPage){
        return NextResponse.redirect(new URL('/view/dashboard', request.url));
    }

    return NextResponse.next();

    
}

export const config = {
    matcher: [
        '/view/:path*',
        '/login',
        '/sign-up',
    ]
}