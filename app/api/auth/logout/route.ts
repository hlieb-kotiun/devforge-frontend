import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";

type ApiErrorResponse = {
  message?: string;
};

const noContentStatuses = new Set([204, 205, 304]);

const createResponse = (
  data: unknown,
  status: number,
  setCookie: unknown,
) => {
  const response = noContentStatuses.has(status)
    ? new NextResponse(null, { status })
    : NextResponse.json(data ?? null, { status });
  const cookies = Array.isArray(setCookie) ? setCookie : [setCookie];

  for (const cookie of cookies) {
    if (typeof cookie === "string") {
      response.headers.append("set-cookie", cookie);
    }
  }

  return response;
};

export async function POST(request: NextRequest) {
  try {
    const response = await api.post("/auth/logout", undefined, {
      headers: {
        cookie: request.headers.get("cookie") ?? "",
      },
    });

    return createResponse(
      response.data,
      response.status,
      response.headers["set-cookie"],
    );
  } catch (error) {
    if (axios.isAxiosError<ApiErrorResponse>(error)) {
      return createResponse(
        error.response?.data ?? { message: "Failed to log out" },
        error.response?.status ?? 500,
        error.response?.headers?.["set-cookie"],
      );
    }

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
