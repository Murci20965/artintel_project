export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Privacy Policy</h1>

        <div className="prose dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <h3 className="text-xl font-medium mb-2">Personal Information</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Name and contact information</li>
              <li>Account credentials</li>
              <li>Payment information</li>
              <li>Usage data and preferences</li>
            </ul>

            <h3 className="text-xl font-medium mb-2">Technical Data</h3>
            <ul className="list-disc pl-6">
              <li>IP address and device information</li>
              <li>Browser type and settings</li>
              <li>System logs and usage patterns</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p>We use collected information to:</p>
            <ul className="list-disc pl-6">
              <li>Provide and maintain our services</li>
              <li>Improve user experience</li>
              <li>Process payments and transactions</li>
              <li>Send administrative information</li>
              <li>Provide customer support</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Data Protection</h2>
            <p>We implement robust security measures to protect your personal information, including:</p>
            <ul className="list-disc pl-6">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security audits</li>
              <li>Access controls and authentication</li>
              <li>Secure data centers</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to data processing</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Cookies and Tracking</h2>
            <p>
              We use cookies and similar tracking technologies to improve your experience on our platform. You can
              control cookie settings through your browser preferences.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Updates to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically. We will notify you of any material changes by posting the
              new Privacy Policy on this page.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
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

