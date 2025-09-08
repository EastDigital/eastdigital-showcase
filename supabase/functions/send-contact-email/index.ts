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
      from: "East Digital <noreply@eastdigital.in>",
      to: [email],
      subject: "Thank you for contacting East Digital - We'll respond within 24 hours",
      reply_to: "contact@eastdigital.in",
      html: `
        <!DOCTYPE html>
        <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="x-apple-disable-message-reformatting">
          <title>Thank you for contacting East Digital</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333333; background-color: #f8fafc; margin: 0; padding: 0; }
            .email-container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
            .header { background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%); color: #ffffff; padding: 40px 30px; text-align: center; }
            .logo { font-size: 32px; font-weight: bold; margin-bottom: 8px; letter-spacing: 2px; }
            .tagline { font-size: 16px; opacity: 0.9; margin: 0; }
            .content { padding: 40px 30px; }
            .greeting { font-size: 24px; color: #2d3748; margin-bottom: 20px; font-weight: 600; }
            .message { font-size: 16px; color: #4a5568; margin-bottom: 30px; line-height: 1.6; }
            .highlight { color: #e74c3c; font-weight: 600; }
            .details-card { background: #f7fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 25px; margin: 25px 0; }
            .details-title { font-size: 18px; color: #2d3748; margin-bottom: 15px; font-weight: 600; }
            .detail-item { padding: 8px 0; border-bottom: 1px solid #e2e8f0; display: flex; }
            .detail-item:last-child { border-bottom: none; }
            .detail-label { font-weight: 600; color: #4a5568; min-width: 120px; }
            .detail-value { color: #2d3748; }
            .cta-section { text-align: center; margin: 30px 0; }
            .cta-text { color: #4a5568; margin-bottom: 15px; }
            .cta-link { display: inline-block; background: #e74c3c; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; }
            .footer { background: #2d3748; color: #cbd5e0; padding: 30px; text-align: center; }
            .company-name { font-size: 20px; font-weight: bold; color: #ffffff; margin-bottom: 10px; }
            .contact-info { font-size: 14px; line-height: 1.6; }
            .contact-info a { color: #e74c3c; text-decoration: none; }
            @media only screen and (max-width: 600px) {
              .content, .header, .footer { padding: 20px !important; }
              .logo { font-size: 24px; }
              .greeting { font-size: 20px; }
              .details-card { padding: 15px; }
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <div class="logo">EAST DIGITAL</div>
              <p class="tagline">3D Visualization & Architectural Rendering</p>
            </div>
            
            <div class="content">
              <h1 class="greeting">Thank you for contacting us, ${name}!</h1>
              <p class="message">
                We have received your inquiry and will get back to you <span class="highlight">within 24 hours</span> 
                with a detailed response tailored to your project needs.
              </p>
              
              <div class="details-card">
                <h3 class="details-title">Your Inquiry Summary</h3>
                <div class="detail-item">
                  <span class="detail-label">Name:</span>
                  <span class="detail-value">${name}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Email:</span>
                  <span class="detail-value">${email}</span>
                </div>
                ${phone ? `
                <div class="detail-item">
                  <span class="detail-label">Phone:</span>
                  <span class="detail-value">${phone}</span>
                </div>` : ''}
                ${company ? `
                <div class="detail-item">
                  <span class="detail-label">Company:</span>
                  <span class="detail-value">${company}</span>
                </div>` : ''}
                ${projectType ? `
                <div class="detail-item">
                  <span class="detail-label">Project Type:</span>
                  <span class="detail-value">${projectType}</span>
                </div>` : ''}
                <div class="detail-item">
                  <span class="detail-label">Message:</span>
                  <span class="detail-value">${message}</span>
                </div>
              </div>
              
              <div class="cta-section">
                <p class="cta-text">While you wait, explore our portfolio of completed projects:</p>
                <a href="https://eastdigital.in/projects" class="cta-link">View Our Portfolio</a>
              </div>
            </div>
            
            <div class="footer">
              <div class="company-name">East Digital</div>
              <div class="contact-info">
                <strong>Email:</strong> <a href="mailto:contact@eastdigital.in">contact@eastdigital.in</a><br>
                <strong>Phone:</strong> <a href="tel:+919910568689">+91-99105 68689</a><br>
                <strong>Address:</strong> 2nd Floor, JSV Hyundai Building, Near Engineering College,<br>
                Lucknow, UP, India - 226021
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    // Send notification email to admin
    const adminEmailResponse = await resend.emails.send({
      from: "East Digital Contact Form <noreply@eastdigital.in>",
      to: ["contact@eastdigital.in"],
      subject: `🔔 New Contact Inquiry: ${name} - ${projectType || 'General Inquiry'}`,
      reply_to: email,
      html: `
        <!DOCTYPE html>
        <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="x-apple-disable-message-reformatting">
          <title>New Contact Form Submission</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333333; background-color: #f8fafc; margin: 0; padding: 0; }
            .email-container { max-width: 650px; margin: 0 auto; background-color: #ffffff; }
            .header { background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: #ffffff; padding: 30px; text-align: center; }
            .logo { font-size: 28px; font-weight: bold; margin-bottom: 8px; letter-spacing: 2px; }
            .subtitle { font-size: 16px; opacity: 0.9; margin: 0; }
            .content { padding: 30px; }
            .alert { background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 20px; margin-bottom: 25px; }
            .alert-icon { font-size: 20px; margin-right: 10px; }
            .section { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 25px; margin-bottom: 20px; }
            .section-title { font-size: 18px; color: #1f2937; margin-bottom: 15px; font-weight: 600; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; }
            .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
            .info-item { background: #ffffff; padding: 12px 15px; border-radius: 6px; border-left: 4px solid #dc2626; }
            .info-label { font-weight: 600; color: #374151; font-size: 14px; }
            .info-value { color: #1f2937; margin-top: 2px; }
            .message-section { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0; }
            .message-content { background: #f9fafb; padding: 15px; border-radius: 6px; white-space: pre-wrap; color: #374151; border-left: 4px solid #6366f1; }
            .cta-section { text-align: center; margin: 30px 0; }
            .cta-button { display: inline-block; background: #dc2626; color: #ffffff; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; }
            .timestamp { text-align: center; color: #6b7280; font-size: 14px; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; }
            .footer { background: #1f2937; color: #d1d5db; padding: 25px; text-align: center; }
            .company-name { font-size: 20px; font-weight: bold; color: #ffffff; margin-bottom: 8px; }
            @media only screen and (max-width: 600px) {
              .content, .header, .footer { padding: 20px !important; }
              .info-grid { grid-template-columns: 1fr; }
              .section { padding: 15px; }
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <div class="logo">EAST DIGITAL</div>
              <p class="subtitle">New Contact Form Submission</p>
            </div>
            
            <div class="content">
              <div class="alert">
                <span class="alert-icon">⚠️</span>
                <strong>Action Required:</strong> New inquiry received - Please respond within 24 hours to maintain our service standards.
              </div>
              
              <div class="section">
                <h3 class="section-title">Contact Information</h3>
                <div class="info-grid">
                  <div class="info-item">
                    <div class="info-label">Full Name</div>
                    <div class="info-value">${name}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Email Address</div>
                    <div class="info-value"><a href="mailto:${email}" style="color: #dc2626; text-decoration: none;">${email}</a></div>
                  </div>
                  ${phone ? `
                  <div class="info-item">
                    <div class="info-label">Phone Number</div>
                    <div class="info-value"><a href="tel:${phone}" style="color: #dc2626; text-decoration: none;">${phone}</a></div>
                  </div>` : ''}
                  ${company ? `
                  <div class="info-item">
                    <div class="info-label">Company</div>
                    <div class="info-value">${company}</div>
                  </div>` : ''}
                  ${projectType ? `
                  <div class="info-item">
                    <div class="info-label">Project Type</div>
                    <div class="info-value" style="color: #dc2626; font-weight: 600;">${projectType}</div>
                  </div>` : ''}
                  <div class="info-item">
                    <div class="info-label">Submission Time</div>
                    <div class="info-value">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'short' })}</div>
                  </div>
                </div>
              </div>
              
              <div class="section">
                <h3 class="section-title">Customer Message</h3>
                <div class="message-section">
                  <div class="message-content">${message}</div>
                </div>
              </div>
              
              <div class="cta-section">
                <a href="mailto:${email}?subject=Re: Your inquiry about ${projectType || 'our services'}&body=Dear ${name},%0D%0A%0D%0AThank you for your interest in East Digital's 3D visualization services.%0D%0A%0D%0A" 
                   class="cta-button">Reply to Customer</a>
              </div>
              
              <div class="timestamp">
                This inquiry was automatically processed and delivered to ensure prompt customer service.
              </div>
            </div>
            
            <div class="footer">
              <div class="company-name">East Digital</div>
              <div style="font-size: 14px; opacity: 0.8;">
                3D Visualization & Architectural Rendering Services<br>
                contact@eastdigital.in | +91-99105 68689
              </div>
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