import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ProposalEmailRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  projectName: string;
  projectType: string;
  serviceRequired: string;
  projectLocation: string;
  projectSize: string;
  timeline: string;
  projectDescription: string;
  specificRequirements: string;
  previousExperience: string;
  files?: string[];
  fileNames?: string[];
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData: ProposalEmailRequest = await req.json();

    // Admin email HTML template
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="x-apple-disable-message-reformatting">
        <title>New Proposal Request - East Digital</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333333; background-color: #f8fafc; margin: 0; padding: 0; }
          .email-container { max-width: 750px; margin: 0 auto; background-color: #ffffff; }
          .header { background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: #ffffff; padding: 30px; text-align: center; }
          .logo { font-size: 28px; font-weight: bold; margin-bottom: 8px; letter-spacing: 2px; }
          .subtitle { font-size: 16px; opacity: 0.9; margin: 0; }
          .content { padding: 30px; }
          .alert { background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 20px; margin-bottom: 25px; text-align: center; }
          .section { border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 20px; overflow: hidden; }
          .section-header { background: #f3f4f6; padding: 15px 20px; border-bottom: 1px solid #e5e7eb; }
          .section-title { font-size: 16px; font-weight: 600; color: #1f2937; margin: 0; }
          .section-content { padding: 20px; }
          .info-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; }
          .info-item { background: #f9fafb; padding: 12px 15px; border-radius: 6px; border-left: 4px solid #dc2626; }
          .info-label { font-weight: 600; color: #374151; font-size: 14px; }
          .info-value { color: #1f2937; margin-top: 2px; }
          .info-value a { color: #dc2626; text-decoration: none; }
          .description-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 15px; margin-top: 10px; }
          .files-list { margin-top: 10px; }
          .file-item { background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 6px; padding: 10px 15px; margin: 8px 0; display: flex; align-items: center; }
          .file-icon { margin-right: 8px; font-size: 16px; }
          .timestamp { text-align: center; color: #6b7280; font-size: 14px; margin-top: 25px; padding-top: 20px; border-top: 1px solid #e5e7eb; }
          .footer { background: #1f2937; color: #d1d5db; padding: 25px; text-align: center; }
          .company-name { font-size: 20px; font-weight: bold; color: #ffffff; margin-bottom: 8px; }
          @media only screen and (max-width: 600px) {
            .content, .header, .footer { padding: 20px !important; }
            .info-grid { grid-template-columns: 1fr; }
            .section-content { padding: 15px; }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 10px;">
              <div style="width: 50px; height: 50px; background: #ffffff; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 15px;">
                <div style="font-size: 24px; font-weight: bold; color: #dc2626;">ED</div>
              </div>
              <div>
                <div class="logo">EAST DIGITAL</div>
                <p class="subtitle">New Proposal Request Received</p>
              </div>
            </div>
          </div>
          
          <div class="content">
            <div class="alert">
              <strong>High Priority:</strong> New proposal request requires immediate attention - Prepare detailed quote within 24 hours
            </div>
            
            <div class="section">
              <div class="section-header">
                <h3 class="section-title">Client Contact Information</h3>
              </div>
              <div class="section-content">
                <div class="info-grid">
                  <div class="info-item">
                    <div class="info-label">Full Name</div>
                    <div class="info-value">${requestData.firstName} ${requestData.lastName}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Email Address</div>
                    <div class="info-value"><a href="mailto:${requestData.email}">${requestData.email}</a></div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Phone Number</div>
                    <div class="info-value"><a href="tel:${requestData.phone}">${requestData.phone}</a></div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Company</div>
                    <div class="info-value">${requestData.company}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Position</div>
                    <div class="info-value">${requestData.position}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Previous Experience</div>
                    <div class="info-value">${requestData.previousExperience}</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="section">
              <div class="section-header">
                <h3 class="section-title">Project Overview</h3>
              </div>
              <div class="section-content">
                <div class="info-grid">
                  <div class="info-item">
                    <div class="info-label">Project Name</div>
                    <div class="info-value" style="font-weight: 600; color: #dc2626;">${requestData.projectName}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Project Type</div>
                    <div class="info-value">${requestData.projectType}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Service Required</div>
                    <div class="info-value">${requestData.serviceRequired}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Location</div>
                    <div class="info-value">${requestData.projectLocation}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Project Size/Scale</div>
                    <div class="info-value">${requestData.projectSize}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Timeline Required</div>
                    <div class="info-value" style="color: #dc2626; font-weight: 600;">${requestData.timeline}</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="section">
              <div class="section-header">
                <h3 class="section-title">Project Description & Requirements</h3>
              </div>
              <div class="section-content">
                <div style="margin-bottom: 20px;">
                  <strong style="color: #374151;">Project Description:</strong>
                  <div class="description-box">${requestData.projectDescription}</div>
                </div>
                ${requestData.specificRequirements ? `
                <div>
                  <strong style="color: #374151;">Specific Requirements:</strong>
                  <div class="description-box">${requestData.specificRequirements}</div>
                </div>
                ` : ''}
              </div>
            </div>

            ${requestData.fileNames && requestData.fileNames.length > 0 ? `
            <div class="section">
              <div class="section-header">
                <h3 class="section-title">Uploaded Reference Files</h3>
              </div>
              <div class="section-content">
                <div class="files-list">
                  ${requestData.fileNames.map(fileName => `
                    <div class="file-item">
                      <span class="file-icon">•</span>
                      <span>${fileName}</span>
                    </div>
                  `).join('')}
                </div>
                <p style="color: #6b7280; font-size: 14px; margin-top: 15px; font-style: italic;">
                  Files are securely stored and accessible via the admin dashboard.
                </p>
              </div>
            </div>
            ` : ''}
            
            <div class="timestamp">
              Proposal request submitted on ${new Date().toLocaleString('en-IN', { 
                timeZone: 'Asia/Kolkata', 
                dateStyle: 'full', 
                timeStyle: 'short' 
              })}
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
    `;

    // User confirmation email HTML template
    const userEmailHtml = `
      <!DOCTYPE html>
      <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="x-apple-disable-message-reformatting">
        <title>Proposal Request Received - East Digital</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333333; background-color: #f8fafc; margin: 0; padding: 0; }
          .email-container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
          .header { background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%); color: #ffffff; padding: 40px 30px; text-align: center; }
          .logo { font-size: 32px; font-weight: bold; margin-bottom: 8px; letter-spacing: 2px; }
          .tagline { font-size: 16px; opacity: 0.9; margin: 0; }
          .content { padding: 40px 30px; }
          .success-banner { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px; }
          .success-icon { font-size: 48px; margin-bottom: 15px; }
          .success-title { font-size: 24px; font-weight: 600; margin-bottom: 10px; }
          .success-text { font-size: 16px; opacity: 0.9; }
          .timeline-section { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 25px; margin-bottom: 25px; }
          .timeline-title { font-size: 20px; color: #1f2937; margin-bottom: 20px; font-weight: 600; }
          .timeline-step { display: flex; align-items: flex-start; margin-bottom: 20px; padding: 15px; background: #ffffff; border-radius: 8px; border-left: 4px solid #e74c3c; }
          .timeline-step:last-child { margin-bottom: 0; }
          .step-number { background: #e74c3c; color: #ffffff; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px; flex-shrink: 0; }
          .step-content { flex: 1; }
          .step-title { font-weight: 600; color: #1f2937; margin-bottom: 5px; }
          .step-description { color: #6b7280; font-size: 14px; }
          .project-summary { background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 20px; margin-bottom: 25px; }
          .summary-title { font-size: 18px; color: #92400e; margin-bottom: 15px; font-weight: 600; }
          .summary-item { margin-bottom: 8px; }
          .summary-label { font-weight: 600; color: #78350f; }
          .summary-value { color: #92400e; }
          .contact-section { text-align: center; background: #f1f5f9; padding: 25px; border-radius: 8px; margin-bottom: 25px; }
          .contact-title { color: #334155; margin-bottom: 15px; font-size: 16px; }
          .contact-links { margin: 15px 0; }
          .contact-link { display: inline-block; margin: 5px 10px; padding: 10px 20px; background: #e74c3c; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 14px; }
          .footer { background: #2d3748; color: #cbd5e0; padding: 30px; text-align: center; }
          .company-name { font-size: 20px; font-weight: bold; color: #ffffff; margin-bottom: 10px; }
          .company-info { font-size: 14px; line-height: 1.6; }
          .company-info a { color: #e74c3c; text-decoration: none; }
          @media only screen and (max-width: 600px) {
            .content, .header, .footer { padding: 20px !important; }
            .success-banner { padding: 20px; }
            .timeline-section { padding: 15px; }
            .timeline-step { flex-direction: column; text-align: center; }
            .step-number { margin-right: 0; margin-bottom: 10px; }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 10px;">
              <div style="width: 50px; height: 50px; background: #ffffff; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 15px;">
                <div style="font-size: 24px; font-weight: bold; color: #e74c3c;">ED</div>
              </div>
              <div>
                <div class="logo">EAST DIGITAL</div>
                <p class="tagline">3D Visualization & Architectural Rendering</p>
              </div>
            </div>
          </div>
          
          <div class="content">
            <div class="success-banner">
              <h2 class="success-title">Proposal Request Successfully Received!</h2>
              <p class="success-text">Thank you, ${requestData.firstName}! We're excited to work on your ${requestData.projectType} project.</p>
            </div>
            
            <div class="timeline-section">
              <h3 class="timeline-title">What Happens Next?</h3>
              <div class="timeline-step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <div class="step-title">Project Analysis (Within 2-4 hours)</div>
                  <div class="step-description">Our expert team reviews your requirements, uploaded materials, and project scope to understand your vision.</div>
                </div>
              </div>
              <div class="timeline-step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <div class="step-title">Custom Proposal Creation (Within 24 hours)</div>
                  <div class="step-description">We prepare a comprehensive proposal including detailed timeline, deliverables, pricing, and project milestones.</div>
                </div>
              </div>
              <div class="timeline-step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <div class="step-title">Proposal Delivery & Consultation</div>
                  <div class="step-description">Receive your tailored proposal via email with an option to schedule a consultation call for any questions.</div>
                </div>
              </div>
            </div>

            <div class="project-summary">
              <h3 class="summary-title">Your Project Summary</h3>
              <div class="summary-item">
                <span class="summary-label">Project Name:</span> 
                <span class="summary-value">${requestData.projectName}</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">Service Required:</span> 
                <span class="summary-value">${requestData.serviceRequired}</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">Company:</span> 
                <span class="summary-value">${requestData.company}</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">Timeline:</span> 
                <span class="summary-value">${requestData.timeline}</span>
              </div>
            </div>

            <div class="contact-section">
              <p class="contact-title">Have questions while we prepare your proposal?</p>
              <div class="contact-links">
                <a href="mailto:contact@eastdigital.in" class="contact-link">Email Us</a>
                <a href="tel:+919910568689" class="contact-link">Call Us</a>
              </div>
              <p style="color: #64748b; font-size: 14px; margin-top: 15px;">
                We typically respond to inquiries within 2-4 hours during business hours.
              </p>
            </div>
          </div>
          
          <div class="footer">
            <div class="company-name">East Digital</div>
            <div class="company-info">
              Professional 3D Visualization & Architectural Rendering Services<br>
              <strong>Email:</strong> <a href="mailto:contact@eastdigital.in">contact@eastdigital.in</a> | 
              <strong>Phone:</strong> <a href="tel:+919910568689">+91-99105 68689</a><br>
              <strong>Address:</strong> 2nd Floor, JSV Hyundai Building, Near Engineering College,<br>
              Lucknow, UP, India - 226021<br><br>
              <span style="font-size: 12px; opacity: 0.7;">
                © ${new Date().getFullYear()} East Digital. All rights reserved.
              </span>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send admin email
    const adminEmailResponse = await resend.emails.send({
      from: "East Digital Proposals <noreply@eastdigital.in>",
      to: ["contact@eastdigital.in"],
      subject: `🎯 New Proposal Request: ${requestData.projectName} - ${requestData.company}`,
      html: adminEmailHtml,
      reply_to: requestData.email,
    });

    // Send user confirmation email
    const userEmailResponse = await resend.emails.send({
      from: "East Digital <noreply@eastdigital.in>",
      to: [requestData.email],
      subject: "🎉 Proposal Request Received - East Digital",
      html: userEmailHtml,
      reply_to: "contact@eastdigital.in",
    });

    console.log("Admin email response:", adminEmailResponse);
    console.log("User email response:", userEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        adminEmailResponse, 
        userEmailResponse 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-proposal-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);