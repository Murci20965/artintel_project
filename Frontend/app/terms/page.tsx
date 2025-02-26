export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Terms of Service</h1>

        <div className="prose dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using Artintelllms's services, you agree to be bound by these Terms of Service and all
              applicable laws and regulations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
            <p>
              Artintelllms grants you a limited, non-exclusive, non-transferable license to use our services in
              accordance with these terms.
            </p>
            <ul className="list-disc pl-6 mt-4">
              <li>You must not modify or copy the materials</li>
              <li>You must not use the materials for commercial purposes</li>
              <li>You must not attempt to reverse engineer any software</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Service Availability</h2>
            <p>
              We strive to ensure our services are available 24/7, but we cannot guarantee uninterrupted access.
              Maintenance and updates may occasionally affect service availability.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. User Obligations</h2>
            <p>Users are responsible for:</p>
            <ul className="list-disc pl-6 mt-4">
              <li>Maintaining the confidentiality of their account</li>
              <li>Using the service in compliance with all applicable laws</li>
              <li>Ensuring their use doesn't infringe on others' rights</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Privacy</h2>
            <p>
              Your use of Artintelllms's services is also governed by our Privacy Policy. Please review our Privacy
              Policy to understand our practices.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Termination</h2>
            <p>
              We reserve the right to terminate or suspend access to our services immediately, without prior notice, for
              any conduct that we believe violates these Terms of Service or is harmful to other users or us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Contact Information</h2>
            <p>If you have any questions about these Terms of Service, please contact us at:</p>
            <p className="mt-2">
              📧 Email: info@ultimateholdings.co.za
              <br />🌐 Website: www.artintelllms.com
              <br />📞 Phone: +27 10 035 2335
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

