import { NextRequest, NextResponse } from "next/server";

const API_URL = "http://localhost:5000";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(
  request: NextRequest,
  { params }: RouteContext,
) {
  const { id } = await params;

  const response = await fetch(
    `${API_URL}/saved-articles/${id}`,
    {
      method: "POST",
      headers: {
        cookie: request.headers.get("cookie") ?? "",
      },
    },
  );

  const data = await response.json().catch(() => null);

  return NextResponse.json(data, {
    status: response.status,
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteContext,
) {
  const { id } = await params;

  const response = await fetch(
    `${API_URL}/saved-articles/${id}`,
    {
      method: "DELETE",
      headers: {
        cookie: request.headers.get("cookie") ?? "",
      },
    },
  );

  const data = await response.json().catch(() => null);

  return NextResponse.json(data, {
    status: response.status,
  });
}