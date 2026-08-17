import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const apiRes = await api.post("/auth/register", body);
    const setCookie = apiRes.headers["set-cookie"];
    const response = NextResponse.json(apiRes.data, {
      status: apiRes.status,
    });

    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

      for (const cookieStr of cookieArray) {
        response.headers.append("set-cookie", cookieStr);
      }
    }

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = error.response?.data as {
        message?: string;
      };

      return NextResponse.json(
        {
          message: data?.message ?? "Registration failed",
        },
        {
          status: error.response?.status ?? 500,
        },
      );
    }

    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 500,
      },
    );
  }
}
