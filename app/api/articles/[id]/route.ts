import { type NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

function createUpstreamHeaders(request: NextRequest): Headers {
  const headers = new Headers();
  const contentType = request.headers.get("content-type");
  const cookie = request.headers.get("cookie");
  const accept = request.headers.get("accept");

  if (contentType) headers.set("content-type", contentType);
  if (cookie) headers.set("cookie", cookie);
  if (accept) headers.set("accept", accept);

  return headers;
}

async function handleUpdate(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const backendUrl = process.env.BACKEND_URL?.replace(/\/+$/, "");

  if (!backendUrl) {
    return NextResponse.json(
      { message: "Article service is not configured" },
      { status: 500 }
    );
  }

  try {
    const body = await request.arrayBuffer();

    const upstream = await fetch(`${backendUrl}/articles/${id}`, {
      method: "PATCH",
      headers: createUpstreamHeaders(request),
      body,
      cache: "no-store",
    });

    const headers = new Headers();
    const contentType = upstream.headers.get("content-type");
    if (contentType) headers.set("content-type", contentType);

    const data = await upstream.text();
    return new NextResponse(data, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers,
    });
  } catch (error) {
    console.error("Failed to proxy article edit", error);
    return NextResponse.json(
      { message: "Failed to update article" },
      { status: 502 }
    );
  }
}

export { handleUpdate as PATCH, handleUpdate as PUT };