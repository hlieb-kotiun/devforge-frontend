import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";
import axios from "axios";

type ApiErrorResponse = {
  message: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const apiRes = await api.post("/auth/login", body);
    const setCookie = apiRes.headers["set-cookie"];
    const response = NextResponse.json(apiRes.data, { status: apiRes.status });

    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

      for (const cookieStr of cookieArray) {
        response.headers.append("set-cookie", cookieStr);
      }
    }

    return response;
  } catch (error) {
    if (axios.isAxiosError<ApiErrorResponse>(error)) {
      return NextResponse.json(
        { message: error.response?.data?.message ?? "Login failed" },
        { status: error.response?.status ?? 500 },
      );
    }

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
