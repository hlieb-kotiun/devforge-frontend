import type { NextResponse } from "next/server";

/**
 * Пробрасує Set-Cookie з Express у відповідь браузеру як є, зі збереженням
 * усіх атрибутів (HttpOnly, Secure, SameSite, Max-Age).
 */
export function forwardSetCookie(
    response: NextResponse,
    setCookie: string | string[] | undefined,
): NextResponse {
    if (!setCookie) return response;

    const cookies = Array.isArray(setCookie) ? setCookie : [setCookie];

    for (const cookie of cookies) {
        response.headers.append("set-cookie", cookie);
    }

    return response;
}

export function logErrorResponse(errorObj: unknown): void {
    const green = "\x1b[32m";
    const yellow = "\x1b[33m";
    const reset = "\x1b[0m";
    console.log(`${green}> ${yellow}Error Response Data:${reset}`);
    console.dir(errorObj, { depth: null, colors: true });
}