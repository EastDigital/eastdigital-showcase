import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType?: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, company, projectType, message }: ContactEmailRequest = await req.json();

    console.log("Processing contact form submission:", { name, email, projectType });

    // Send confirmation email to user
    const userEmailResponse = await resend.emails.send({
      from: "East Digital <eastdigitalcompany@gmail.com>",
      to: [email],
      subject: "Thank you for contacting East Digital",
      html: `
        <h1>Thank you for contacting us, ${name}!</h1>
        <p>We have received your inquiry and will get back to you within 24 hours.</p>
        <p><strong>Your inquiry details:</strong></p>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          ${phone ? `<li><strong>Phone:</strong> ${phone}</li>` : ''}
          ${company ? `<li><strong>Company:</strong> ${company}</li>` : ''}
          ${projectType ? `<li><strong>Project Type:</strong> ${projectType}</li>` : ''}
          <li><strong>Message:</strong> ${message}</li>
        </ul>
        <p>Best regards,<br>East Digital Team</p>
      `,
    });

    // Send notification email to admin
    const adminEmailResponse = await resend.emails.send({
      from: "East Digital Contact Form <eastdigitalcompany@gmail.com>",
      to: ["eastdigitalcompany@gmail.com"],
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Contact Details:</strong></p>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          ${phone ? `<li><strong>Phone:</strong> ${phone}</li>` : ''}
          ${company ? `<li><strong>Company:</strong> ${company}</li>` : ''}
          ${projectType ? `<li><strong>Project Type:</strong> ${projectType}</li>` : ''}
        </ul>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <p>Please respond to this inquiry promptly.</p>
      `,
    });

    console.log("Emails sent successfully:", { userEmailResponse, adminEmailResponse });

    return new Response(JSON.stringify({ 
      success: true,
      userEmailId: userEmailResponse.data?.id,
      adminEmailId: adminEmailResponse.data?.id
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);