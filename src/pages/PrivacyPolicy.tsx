import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import { useSEO } from '@/hooks/useSEO';

const PrivacyPolicy = () => {
  useSEO('privacy-policy');

  return (
    <div className="min-h-screen bg-background font-nunito">
      <Header />
      <main>
        <PageBanner 
          title="Privacy Policy" 
          backgroundImage="/contact-banner.jpg"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Privacy Policy' }
          ]}
        />
        
        <section className="section">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                <div>
                  <h2 className="h2 mb-4">1. Information We Collect</h2>
                  <p className="text-body">
                    We collect information you provide directly to us, such as when you create an account, fill out a form, or contact us. This may include:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-body">
                    <li>Name and contact information</li>
                    <li>Project details and requirements</li>
                    <li>Communication preferences</li>
                    <li>Technical specifications</li>
                  </ul>
                </div>

                <div>
                  <h2 className="h2 mb-4">2. How We Use Your Information</h2>
                  <p className="text-body">
                    We use the information we collect to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-body">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Process and complete transactions</li>
                    <li>Send you technical notices and support messages</li>
                    <li>Communicate with you about products, services, and events</li>
                    <li>Monitor and analyze trends and usage</li>
                  </ul>
                </div>

                <div>
                  <h2 className="h2 mb-4">3. Information Sharing</h2>
                  <p className="text-body">
                    We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share information in the following circumstances:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-body">
                    <li>With your consent</li>
                    <li>For legal compliance</li>
                    <li>To protect rights and safety</li>
                    <li>With service providers who assist our operations</li>
                  </ul>
                </div>

                <div>
                  <h2 className="h2 mb-4">4. Data Security</h2>
                  <p className="text-body">
                    We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                  </p>
                </div>

                <div>
                  <h2 className="h2 mb-4">5. Data Retention</h2>
                  <p className="text-body">
                    We retain your personal information only for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required or permitted by law.
                  </p>
                </div>

                <div>
                  <h2 className="h2 mb-4">6. Your Rights</h2>
                  <p className="text-body">
                    You have the right to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-body">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate information</li>
                    <li>Request deletion of your information</li>
                    <li>Object to processing of your information</li>
                    <li>Request data portability</li>
                  </ul>
                </div>

                <div>
                  <h2 className="h2 mb-4">7. Cookies and Tracking</h2>
                  <p className="text-body">
                    We use cookies and similar tracking technologies to collect and use personal information about you. You can control the use of cookies at the individual browser level.
                  </p>
                </div>

                <div>
                  <h2 className="h2 mb-4">8. Contact Us</h2>
                  <p className="text-body">
                    If you have any questions about this privacy policy or our privacy practices, please contact us at:
                  </p>
                  <div className="space-y-2 text-body">
                    <p>Email: privacy@eastdigital.in</p>
                    <p>Phone: +91 99105 68689</p>
                  </div>
                </div>

                <div className="pt-8 border-t border-border">
                  <p className="text-small text-muted-foreground">
                    Last updated: {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;