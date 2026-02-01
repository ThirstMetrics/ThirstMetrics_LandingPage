import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy — ThirstMetrics",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20">
        <div className="section-container">
          <div className="max-w-3xl mx-auto prose prose-slate prose-headings:font-bold prose-headings:tracking-tight prose-a:text-brand-600 hover:prose-a:text-brand-700">
            <h1>Privacy Policy</h1>
            <p className="text-slate-500 text-sm">
              Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>

            <h2>1. Information We Collect</h2>
            <p>
              When you use ThirstMetrics or submit a form on our website, we may
              collect the following information:
            </p>
            <ul>
              <li>
                <strong>Contact information:</strong> Full name, business email
                address, and company name provided through our beta access or
                contact forms.
              </li>
              <li>
                <strong>Usage data:</strong> Pages visited, features used, and
                general interaction patterns to improve our product.
              </li>
              <li>
                <strong>Technical data:</strong> Browser type, device type, IP
                address, and similar technical information collected
                automatically.
              </li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Process your beta access request and communicate with you about the product.</li>
              <li>Improve and optimize our platform and user experience.</li>
              <li>Send product updates and announcements (you can opt out at any time).</li>
              <li>Respond to your inquiries and support requests.</li>
            </ul>

            <h2>3. Data Sources</h2>
            <p>
              ThirstMetrics enriches publicly available Texas alcohol receipts
              data published by state agencies. We do not scrape private systems,
              access data behind logins, or collect consumer-level data. Our
              enrichment layers (DBA resolution, ownership groups, segment tags)
              are derived from public records and proprietary analysis.
            </p>

            <h2>4. Data Sharing</h2>
            <p>
              We do not sell, rent, or share your personal information with third
              parties for marketing purposes. We may share information with:
            </p>
            <ul>
              <li>Service providers who assist in operating our platform (hosting, email, analytics).</li>
              <li>Legal authorities when required by law or to protect our rights.</li>
            </ul>

            <h2>5. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your
              information, including encryption in transit (TLS) and at rest.
              Business email validation (including MX record verification) is
              used to maintain data quality, not for marketing purposes.
            </p>

            <h2>6. Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal
              information at any time. To exercise these rights, contact us at{" "}
              <a href="mailto:hello@thirstmetrics.com">hello@thirstmetrics.com</a>.
            </p>

            <h2>7. Cookies</h2>
            <p>
              We use essential cookies to maintain site functionality and
              analytics cookies to understand usage patterns. You can control
              cookie preferences through your browser settings.
            </p>

            <h2>8. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. Changes will
              be posted on this page with an updated &quot;Last updated&quot; date.
            </p>

            <h2>9. Contact</h2>
            <p>
              Questions about this policy? Email us at{" "}
              <a href="mailto:hello@thirstmetrics.com">hello@thirstmetrics.com</a>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
