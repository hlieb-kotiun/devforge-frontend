import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";
import { forwardSetCookie } from "../../_utils/utils";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const apiRes = await api.post("/auth/register", body);

    return forwardSetCookie(
      NextResponse.json(apiRes.data, { status: apiRes.status }),
      apiRes.headers["set-cookie"],
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;

      if (status === 409) {
        return NextResponse.json(
          { message: "User with this email already exists" },
          { status: 409 },
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
}
