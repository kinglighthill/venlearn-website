import { addData } from "@/services/firestore.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const {token, firstName, lastName, email, message } = await request.json()

    if (!token) {
      return NextResponse.json({ success: false, message: "Missing token" }, { status: 400 });
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!secretKey) {
      console.error("RECAPTCHA_SECRET_KEY is not defined");
      return NextResponse.json({ success: false, message: "Server configuration error" }, { status: 500 });
    }

    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;
    
    const response = await fetch(verificationUrl, {
      method: 'POST',
    });

    const data = await response.json();

    if (data.success && data.score >= 0.5) {
      await addData ({ first_name: firstName, last_name: lastName, email, message})
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ 
        success: false, 
        message: "CAPTCHA verification failed", 
        score: data.score,
        'error-codes': data['error-codes'] 
      }, { status: 403 });
    }
  } catch (error) {
    console.log("Error: ", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
