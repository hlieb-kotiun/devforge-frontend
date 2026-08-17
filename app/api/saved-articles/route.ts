import { NextRequest, NextResponse } from "next/server";
import { isAxiosError } from "axios";
import { api } from "../api";
import { logErrorResponse } from "../_utils/utils";

type ApiErrorResponse = {
  message?: string;
};

export async function GET(request: NextRequest) {
  try {
    const page = request.nextUrl.searchParams.get("page") ?? "1";
    const limit = request.nextUrl.searchParams.get("limit") ?? "6";

    const res = await api.get("/saved-articles", {
      params: { page, limit },
      headers: { cookie: request.headers.get("cookie") ?? "" },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError<ApiErrorResponse>(error)) {
      logErrorResponse(error.response?.data);

      return NextResponse.json(
        {
          message:
            error.response?.data?.message ?? "Failed to load saved articles",
        },
        { status: error.response?.status ?? 500 },
      );
    }

    logErrorResponse({ message: (error as Error).message });

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
