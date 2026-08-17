import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";
import { api } from "../../api";
import { logErrorResponse } from "../../_utils/utils";

const SESSION_COOKIES = ["accessToken", "refreshToken", "sessionId"];

export async function POST(request: NextRequest) {
  try {
    await api.post("/auth/logout", null, {
      headers: { cookie: request.headers.get("cookie") ?? "" },
    });
  } catch (error) {
    // Навіть якщо сесії на беку вже немає, локальні cookie все одно чистимо,
    // інакше користувач залишиться "залогіненим" на фронті.
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
    } else {
      logErrorResponse({ message: (error as Error).message });
    }
  }

  const cookieStore = await cookies();

  for (const name of SESSION_COOKIES) {
    cookieStore.delete(name);
  }

  return new NextResponse(null, { status: 204 });
}
