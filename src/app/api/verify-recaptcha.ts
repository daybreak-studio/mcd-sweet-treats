// This is for page router — for our potential transition
// pages/api/verify-recaptcha.ts
// pages/api/verify-recaptcha.ts
import { NextApiResponse, NextApiRequest } from "next";

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      const { token } = await req.body;

      if (!RECAPTCHA_SECRET_KEY) {
        return res.status(400).json({
          message:
            "Server secret key empty, please configure environment variable.",
          success: false,
        });
      }

      if (!token) {
        return res.status(400).json({
          message: "Token is required",
          success: false,
        });
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

      if (data.success) {
        return res.status(200).json({
          message: "reCAPTCHA verified successfully",
          success: true,
        });
      } else {
        return res.status(400).json({
          message: "reCAPTCHA verification failed",
          errors: data["error-codes"],
          success: false,
        });
      }
    } catch (error) {
      let errorMessage = "Internal server error";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return res.status(500).json({
        message: errorMessage,
        errors: [errorMessage],
        success: false,
      });
    }
  } else {
    return res.status(405).json({
      message: "Method Not Allowed",
      success: false,
    });
  }
}
