import { NextRequest, NextResponse } from "next/server";
import { api } from "../../../api";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../../../_utils/utils";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ ownerId: string }> }
) {
  try {
    const { ownerId } = await params;
    const page = request.nextUrl.searchParams.get("page") ?? "1";
    const limit = request.nextUrl.searchParams.get("limit") ?? "12";

    const res = await api.get(`/articles/author/${ownerId}`, {
      params: { page, limit },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status ?? 500 }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}