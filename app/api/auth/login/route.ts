import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";
import { forwardSetCookie } from "../../_utils/utils";
import axios from "axios";

type ApiErrorResponse = {
  message: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const apiRes = await api.post("/auth/login", body);

    return forwardSetCookie(
      NextResponse.json(apiRes.data, { status: apiRes.status }),
      apiRes.headers["set-cookie"],
    );
  } catch (error) {
    if (axios.isAxiosError<ApiErrorResponse>(error)) {
      const status = error.response?.status;
      if (status === 401) {
        return NextResponse.json(
          { message: "Incorrect email or password" },
          { status: error.response?.status ?? 500 },
        );
      }

      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 500 },
      );
    }
  }
}
