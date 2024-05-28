// app/api/verify-recaptcha/route.ts
import { NextRequest, NextResponse } from "next/server";

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!RECAPTCHA_SECRET_KEY) {
      return NextResponse.json(
        {
          message:
            "Server sercret key empty, please configure environment variable.",
          success: false,
        },
        { status: 400 },
      );
    }

    if (!token) {
      return NextResponse.json(
        { message: "Token is required", success: false },
        { status: 400 },
      );
    }

    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: RECAPTCHA_SECRET_KEY,
          response: token,
        }).toString(),
      },
    );

    const data = await response.json();
    console.log(data);

    if (data.success) {
      return NextResponse.json({
        message: "reCAPTCHA verified successfully",
        success: true,
      });
    } else {
      return NextResponse.json(
        {
          message: "reCAPTCHA verification failed",
          errors: data["error-codes"],
          success: false,
        },
        { status: 400 },
      );
    }
  } catch (error) {
    let errorMessage = "Internal server error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      { message: errorMessage, errors: [errorMessage], success: false },
      { status: 500 },
    );
  }
}
