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
      from: "East Digital <contact@eastdigital.in>",
      to: [email],
      subject: "Thank you for contacting East Digital - We'll respond within 24 hours",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank you for contacting East Digital</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #e74c3c; padding-bottom: 20px; }
            .logo { font-size: 28px; font-weight: bold; color: #e74c3c; margin-bottom: 10px; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 8px; margin-bottom: 20px; }
            .details { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; color: #666; font-size: 14px; margin-top: 30px; }
            ul { list-style: none; padding: 0; }
            li { padding: 8px 0; border-bottom: 1px solid #eee; }
            .highlight { color: #e74c3c; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">EAST DIGITAL</div>
            <p>3D Visualization & Architectural Rendering</p>
          </div>
          
          <div class="content">
            <h1 style="color: #e74c3c;">Thank you for contacting us, ${name}!</h1>
            <p>We have received your inquiry and will get back to you <span class="highlight">within 24 hours</span> with a detailed response.</p>
            
            <div class="details">
              <h3>Your inquiry details:</h3>
              <ul>
                <li><strong>Name:</strong> ${name}</li>
                <li><strong>Email:</strong> ${email}</li>
                ${phone ? `<li><strong>Phone:</strong> ${phone}</li>` : ''}
                ${company ? `<li><strong>Company:</strong> ${company}</li>` : ''}
                ${projectType ? `<li><strong>Project Type:</strong> ${projectType}</li>` : ''}
                <li><strong>Message:</strong> ${message}</li>
              </ul>
            </div>
            
            <p>Meanwhile, feel free to explore our portfolio at <a href="https://eastdigital.in/projects" style="color: #e74c3c;">eastdigital.in/projects</a></p>
          </div>
          
          <div class="footer">
            <p><strong>East Digital</strong><br>
            Email: contact@eastdigital.in | Phone: +91-99105 68689<br>
            2nd Floor, JSV Hyundai Building, Near Engineering College, Lucknow, UP, India - 226021</p>
          </div>
        </body>
        </html>
      `,
    });

    // Send notification email to admin
    const adminEmailResponse = await resend.emails.send({
      from: "East Digital Contact Form <contact@eastdigital.in>",
      to: ["contact@eastdigital.in"],
      subject: `🔔 New Contact Form Submission from ${name} - ${projectType || 'General Inquiry'}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #e74c3c; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .logo { font-size: 24px; font-weight: bold; margin-bottom: 5px; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .contact-details { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #e74c3c; }
            .message-box { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
            .priority { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 10px 0; }
            ul { list-style: none; padding: 0; }
            li { padding: 8px 0; border-bottom: 1px solid #eee; }
            .highlight { color: #e74c3c; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">EAST DIGITAL</div>
            <p>New Contact Form Submission</p>
          </div>
          
          <div class="content">
            <div class="priority">
              <strong>⏰ Action Required:</strong> New inquiry received - Please respond within 24 hours
            </div>
            
            <div class="contact-details">
              <h3>Contact Information:</h3>
              <ul>
                <li><strong>Name:</strong> ${name}</li>
                <li><strong>Email:</strong> <a href="mailto:${email}">${email}</a></li>
                ${phone ? `<li><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></li>` : ''}
                ${company ? `<li><strong>Company:</strong> ${company}</li>` : ''}
                ${projectType ? `<li><strong>Project Type:</strong> <span class="highlight">${projectType}</span></li>` : ''}
                <li><strong>Submitted:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</li>
              </ul>
            </div>
            
            <div class="message-box">
              <h3>Message:</h3>
              <p style="background: #f8f9fa; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${message}</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="mailto:${email}?subject=Re: Your inquiry about ${projectType || 'our services'}" 
                 style="background: #e74c3c; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Reply Now
              </a>
            </div>
          </div>
        </body>
        </html>
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