import { NextResponse } from "next/server";
import { isAxiosError } from "axios";
import { api } from "../../api";

export async function GET() {
  try {
    const response = await api.get("/users", {
      params: { page: 1, perPage: 6 },
    });

    return NextResponse.json({ creators: response.data.authors }, {
      status: response.status,
    });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { error: error.message },
        { status: error.response?.status ?? 500 },
      );
    }
  }
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
}
