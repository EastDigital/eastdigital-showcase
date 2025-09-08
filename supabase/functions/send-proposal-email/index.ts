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
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Proposal Request - East Digital</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; margin-bottom: 10px;">East Digital</h1>
            <h2 style="color: #64748b; font-weight: normal;">New Proposal Request</h2>
          </div>
          
          <div style="background: #f8fafc; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
            <h3 style="color: #2563eb; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Contact Information</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px;">
              <div><strong>Name:</strong> ${requestData.firstName} ${requestData.lastName}</div>
              <div><strong>Email:</strong> ${requestData.email}</div>
              <div><strong>Phone:</strong> ${requestData.phone || 'Not provided'}</div>
              <div><strong>Company:</strong> ${requestData.company}</div>
              <div><strong>Position:</strong> ${requestData.position || 'Not provided'}</div>
            </div>
          </div>

          <div style="background: #f0f9ff; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
            <h3 style="color: #2563eb; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Project Information</h3>
            <div style="margin-top: 15px;">
              <div style="margin-bottom: 10px;"><strong>Project Name:</strong> ${requestData.projectName}</div>
              <div style="margin-bottom: 10px;"><strong>Project Type:</strong> ${requestData.projectType}</div>
              <div style="margin-bottom: 10px;"><strong>Service Required:</strong> ${requestData.serviceRequired}</div>
              <div style="margin-bottom: 10px;"><strong>Location:</strong> ${requestData.projectLocation || 'Not specified'}</div>
              <div style="margin-bottom: 10px;"><strong>Size/Scale:</strong> ${requestData.projectSize || 'Not specified'}</div>
              <div style="margin-bottom: 10px;"><strong>Timeline:</strong> ${requestData.timeline || 'Not specified'}</div>
              <div style="margin-bottom: 10px;"><strong>Previous Experience:</strong> ${requestData.previousExperience || 'Not specified'}</div>
            </div>
          </div>

          <div style="background: #fefce8; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
            <h3 style="color: #2563eb; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Project Details</h3>
            <div style="margin-top: 15px;">
              <div style="margin-bottom: 15px;">
                <strong>Project Description:</strong>
                <div style="margin-top: 5px; padding: 10px; background: white; border-radius: 4px; border-left: 4px solid #2563eb;">
                  ${requestData.projectDescription}
                </div>
              </div>
              ${requestData.specificRequirements ? `
              <div style="margin-bottom: 15px;">
                <strong>Specific Requirements:</strong>
                <div style="margin-top: 5px; padding: 10px; background: white; border-radius: 4px; border-left: 4px solid #2563eb;">
                  ${requestData.specificRequirements}
                </div>
              </div>
              ` : ''}
            </div>
          </div>

          ${requestData.fileNames && requestData.fileNames.length > 0 ? `
          <div style="background: #f0fdf4; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
            <h3 style="color: #2563eb; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Uploaded Files</h3>
            <div style="margin-top: 15px;">
              ${requestData.fileNames.map(fileName => `
                <div style="padding: 8px 12px; background: white; border-radius: 4px; margin: 5px 0; border-left: 4px solid #10b981;">
                  📎 ${fileName}
                </div>
              `).join('')}
            </div>
          </div>
          ` : ''}

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; margin: 0;">
              Proposal request received at ${new Date().toLocaleString()}
            </p>
          </div>
        </body>
      </html>
    `;

    // User confirmation email HTML template
    const userEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Proposal Request Received - East Digital</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; margin-bottom: 10px;">East Digital</h1>
            <h2 style="color: #64748b; font-weight: normal;">3D Visualization & Architectural Rendering</h2>
          </div>
          
          <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); padding: 30px; border-radius: 12px; margin-bottom: 25px; text-align: center;">
            <div style="font-size: 48px; margin-bottom: 15px;">✅</div>
            <h2 style="color: #2563eb; margin-bottom: 10px;">Proposal Request Received!</h2>
            <p style="color: #64748b; font-size: 18px; margin: 0;">
              Thank you for your interest in our 3D visualization services.
            </p>
          </div>

          <div style="background: #fafafa; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
            <h3 style="color: #2563eb; margin-bottom: 15px;">What happens next?</h3>
            <div style="margin-bottom: 15px;">
              <div style="display: flex; align-items: flex-start; margin-bottom: 12px;">
                <span style="color: #2563eb; font-weight: bold; margin-right: 10px; font-size: 18px;">1.</span>
                <div>
                  <strong>Review & Analysis (Within 2-4 hours)</strong><br>
                  <span style="color: #64748b;">Our team will carefully review your project requirements and uploaded materials.</span>
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; margin-bottom: 12px;">
                <span style="color: #2563eb; font-weight: bold; margin-right: 10px; font-size: 18px;">2.</span>
                <div>
                  <strong>Custom Proposal Creation (Within 24 hours)</strong><br>
                  <span style="color: #64748b;">We'll prepare a detailed proposal with timeline, deliverables, and pricing.</span>
                </div>
              </div>
              <div style="display: flex; align-items: flex-start;">
                <span style="color: #2563eb; font-weight: bold; margin-right: 10px; font-size: 18px;">3.</span>
                <div>
                  <strong>Delivery & Discussion</strong><br>
                  <span style="color: #64748b;">You'll receive your comprehensive proposal via email with option to schedule a call.</span>
                </div>
              </div>
            </div>
          </div>

          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
            <h3 style="color: #2563eb; margin-bottom: 10px;">Project Summary</h3>
            <div style="color: #64748b;">
              <strong>Project:</strong> ${requestData.projectName}<br>
              <strong>Service:</strong> ${requestData.serviceRequired}<br>
              <strong>Company:</strong> ${requestData.company}
            </div>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <p style="color: #64748b; margin-bottom: 15px;">
              Have questions in the meantime?
            </p>
            <div style="margin: 15px 0;">
              <a href="mailto:contact@eastdigital.in" style="color: #2563eb; text-decoration: none; margin-right: 20px;">📧 contact@eastdigital.in</a>
              <a href="tel:+1234567890" style="color: #2563eb; text-decoration: none;">📞 Contact Us</a>
            </div>
          </div>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="color: #94a3b8; font-size: 14px; margin: 0;">
              © ${new Date().getFullYear()} East Digital. All rights reserved.<br>
              Professional 3D Visualization & Architectural Rendering Services
            </p>
          </div>
        </body>
      </html>
    `;

    // Send admin email
    const adminEmailResponse = await resend.emails.send({
      from: "East Digital <noreply@eastdigital.in>",
      to: ["contact@eastdigital.in"],
      subject: `🔔 New Proposal Request: ${requestData.projectName} - ${requestData.company}`,
      html: adminEmailHtml,
      reply_to: requestData.email,
    });

    // Send user confirmation email
    const userEmailResponse = await resend.emails.send({
      from: "East Digital <noreply@eastdigital.in>",
      to: [requestData.email],
      subject: "✅ Proposal Request Received - East Digital",
      html: userEmailHtml,
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