import { type NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const responseHeadersToStrip = new Set([
  "connection",
  "content-encoding",
  "content-length",
  "etag",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
]);

type HeadersWithSetCookie = Headers & {
  getSetCookie?: () => string[];
};

function getSetCookies(headers: Headers): string[] {
  const getSetCookie = (headers as HeadersWithSetCookie).getSetCookie;

  if (getSetCookie) {
    return getSetCookie.call(headers);
  }

  const setCookie = headers.get("set-cookie");
  return setCookie ? [setCookie] : [];
}

function createResponse(upstream: Response): NextResponse {
  const headers = new Headers();

  for (const [name, value] of upstream.headers) {
    const normalizedName = name.toLowerCase();

    if (
      normalizedName === "set-cookie" ||
      responseHeadersToStrip.has(normalizedName)
    ) {
      continue;
    }

    headers.append(name, value);
  }

  for (const cookie of getSetCookies(upstream.headers)) {
    headers.append("set-cookie", cookie);
  }

  return new NextResponse(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers,
  });
}

function createUpstreamHeaders(request: NextRequest): Headers {
  const headers = new Headers();
  const contentType = request.headers.get("content-type");
  const cookie = request.headers.get("cookie");
  const accept = request.headers.get("accept");

  // Keep the original multipart boundary while intentionally not forwarding
  // transport headers such as content-length, host, or connection.
  if (contentType) {
    headers.set("content-type", contentType);
  }

  if (cookie) {
    headers.set("cookie", cookie);
  }

  if (accept) {
    headers.set("accept", accept);
  }

  return headers;
}

export async function PATCH(request: NextRequest) {
  const backendUrl = process.env.BACKEND_URL?.replace(/\/+$/, "");

  if (!backendUrl) {
    return NextResponse.json(
      { message: "Avatar service is not configured" },
      { status: 500 },
    );
  }

  try {
    // Do not call request.formData(): rebuilding FormData would create a new
    // boundary. Forwarding the raw bytes preserves the uploaded file exactly.
    const body = await request.arrayBuffer();
    const upstream = await fetch(`${backendUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: createUpstreamHeaders(request),
      body,
      cache: "no-store",
      redirect: "manual",
    });

    return createResponse(upstream);
  } catch (error) {
    console.error("Failed to proxy avatar upload", error);

    return NextResponse.json(
      { message: "Failed to upload avatar" },
      { status: 502 },
    );
  }
}
