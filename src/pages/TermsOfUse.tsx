import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import { useSEO } from '@/hooks/useSEO';

const TermsOfUse = () => {
  useSEO('terms-of-use');

  return (
    <div className="min-h-screen bg-background font-nunito">
      <Header />
      <main>
        <PageBanner 
          title="Terms of Use" 
          backgroundImage="/contact-banner.jpg"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Terms of Use' }
          ]}
        />
        
        <section className="section">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                <div>
                  <h2 className="h2 mb-4">1. Acceptance of Terms</h2>
                  <p className="text-body">
                    By accessing and using East Digital's website and services, you accept and agree to be bound by the terms and provision of this agreement.
                  </p>
                </div>

                <div>
                  <h2 className="h2 mb-4">2. Use License</h2>
                  <p className="text-body">
                    Permission is granted to temporarily download one copy of the materials on East Digital's website for personal, non-commercial transitory viewing only.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-body">
                    <li>This is the grant of a license, not a transfer of title</li>
                    <li>You may not modify or copy the materials</li>
                    <li>You may not use the materials for any commercial purpose</li>
                    <li>You may not attempt to decompile or reverse engineer any software</li>
                  </ul>
                </div>

                <div>
                  <h2 className="h2 mb-4">3. Disclaimer</h2>
                  <p className="text-body">
                    The materials on East Digital's website are provided on an 'as is' basis. East Digital makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                  </p>
                </div>

                <div>
                  <h2 className="h2 mb-4">4. Limitations</h2>
                  <p className="text-body">
                    In no event shall East Digital or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on East Digital's website, even if East Digital or an authorized representative has been notified orally or in writing of the possibility of such damage.
                  </p>
                </div>

                <div>
                  <h2 className="h2 mb-4">5. Accuracy of Materials</h2>
                  <p className="text-body">
                    The materials appearing on East Digital's website could include technical, typographical, or photographic errors. East Digital does not warrant that any of the materials on its website are accurate, complete, or current.
                  </p>
                </div>

                <div>
                  <h2 className="h2 mb-4">6. Links</h2>
                  <p className="text-body">
                    East Digital has not reviewed all of the sites linked to our website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by East Digital of the site.
                  </p>
                </div>

                <div>
                  <h2 className="h2 mb-4">7. Modifications</h2>
                  <p className="text-body">
                    East Digital may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
                  </p>
                </div>

                <div>
                  <h2 className="h2 mb-4">8. Governing Law</h2>
                  <p className="text-body">
                    These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                  </p>
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

export default TermsOfUse;