import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";

type ApiErrorResponse = {
  message?: string;
};

export async function PATCH(request: NextRequest) {
  try {
    const formData = await request.formData();
    const response = await api.patch("/users/me/avatar", formData, {
      headers: {
        cookie: request.headers.get("cookie") ?? "",
      },
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    if (axios.isAxiosError<ApiErrorResponse>(error)) {
      return NextResponse.json(
        error.response?.data ?? { message: "Failed to upload avatar" },
        { status: error.response?.status ?? 500 },
      );
    }

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
