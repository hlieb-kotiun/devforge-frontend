import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";
import { parseSetCookie } from "cookie";
import { cookies } from "next/headers";
import axios from "axios";

type ApiErrorResponse = {
  message: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const apiRes = await api.post("/auth/login", body);
    const cookieStore = await cookies();
    const setCookie = apiRes.headers["set-cookie"];

    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

      for (const cookieStr of cookieArray) {
        const parsed = parseSetCookie(cookieStr);

        if (parsed.value) {
          cookieStore.set(parsed.name, parsed.value, parsed);
        }
      }
    }

    return NextResponse.json(apiRes.data, { status: apiRes.status });
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
