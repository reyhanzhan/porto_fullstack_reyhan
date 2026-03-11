import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactSchema } from "@/lib/validations";
import nodemailer from "nodemailer";

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = contactSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: validated.error.errors[0].message },
        { status: 400 }
      );
    }

    // Save to database
    const message = await db.contactMessage.create({
      data: validated.data,
    });

    // Send email notification
    const contactEmail = process.env.CONTACT_EMAIL || "reyhanrizqi01@gmail.com";

    try {
      await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
        to: contactEmail,
        replyTo: validated.data.email,
        subject: `[Portfolio] ${validated.data.subject || "New Contact Message"} — from ${validated.data.name}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 32px; border-radius: 12px 12px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Message</h1>
              <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0;">From your portfolio website</p>
            </div>
            <div style="background: #ffffff; padding: 32px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #374151; width: 120px;">Name</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827;">${validated.data.name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #374151;">Email</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827;">
                    <a href="mailto:${validated.data.email}" style="color: #6366f1;">${validated.data.email}</a>
                  </td>
                </tr>
                ${validated.data.company ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #374151;">Company</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827;">${validated.data.company}</td>
                </tr>` : ""}
                ${validated.data.subject ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #374151;">Subject</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827;">${validated.data.subject}</td>
                </tr>` : ""}
              </table>
              <div style="margin-top: 24px;">
                <p style="font-weight: 600; color: #374151; margin: 0 0 8px;">Message</p>
                <div style="background: #f9fafb; padding: 16px; border-radius: 8px; color: #374151; line-height: 1.6; white-space: pre-wrap;">${validated.data.message}</div>
              </div>
              <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #f3f4f6;">
                <p style="font-size: 12px; color: #9ca3af; margin: 0;">Message ID: ${message.id} • Saved to database</p>
              </div>
            </div>
          </div>
        `,
      });
    } catch (emailError) {
      // Log email error but don't fail the request — message is already saved to DB
      console.error("Failed to send email notification:", emailError);
    }

    return NextResponse.json({ success: true, id: message.id }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
