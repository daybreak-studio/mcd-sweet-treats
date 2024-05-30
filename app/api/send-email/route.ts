// app/api/send-email/route.ts

import { NextResponse } from "next/server";
const mailchimp = require("@mailchimp/mailchimp_transactional")(
  process.env.MAILCHIMP_API_KEY,
);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    const response = await mailchimp.messages.sendTemplate({
      template_name: "video-submit",
      template_content: [],
      message: {
        to: [{ email, type: "to" }],
        from_email: "no-reply@sweetconnections.ai",
        from_name: "Sweet Connections",
        subject: "Your video for grandma is on it's way!",
        headers: {
          "X-MC-PREVIEWTEXT":
            "Hold tight! This video is going to make grandma's day.",
        },
      },
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
