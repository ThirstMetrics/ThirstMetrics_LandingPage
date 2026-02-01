import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms of Service — ThirstMetrics",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20">
        <div className="section-container">
          <div className="max-w-3xl mx-auto prose prose-slate prose-headings:font-bold prose-headings:tracking-tight prose-a:text-brand-600 hover:prose-a:text-brand-700">
            <h1>Terms of Service</h1>
            <p className="text-slate-500 text-sm">
              Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>

            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using ThirstMetrics (&quot;the Service&quot;), you
              agree to be bound by these Terms of Service. If you do not agree to
              these terms, do not use the Service.
            </p>

            <h2>2. Description of Service</h2>
            <p>
              ThirstMetrics provides enriched Texas alcohol account intelligence
              derived from publicly available state data. The Service includes
              data enrichment features such as DBA name resolution, ownership
              group mapping, industry segment tags, metroplex filtering, county
              name mapping, and sales tax context overlays.
            </p>

            <h2>3. Beta Access</h2>
            <p>
              During the beta period, access to ThirstMetrics is provided free of
              charge. We reserve the right to modify, suspend, or discontinue the
              beta program at any time. Beta features may change without notice.
            </p>

            <h2>4. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the Service for any unlawful purpose.</li>
              <li>Attempt to reverse-engineer, decompile, or extract source data from the platform.</li>
              <li>Resell, redistribute, or sublicense ThirstMetrics data without written permission.</li>
              <li>Use automated tools to scrape or bulk-download data from the Service.</li>
              <li>Misrepresent your identity or affiliation when registering.</li>
            </ul>

            <h2>5. Data Accuracy</h2>
            <p>
              ThirstMetrics enriches publicly available data and applies
              proprietary analysis. While we strive for accuracy, we do not
              guarantee that all data points (including DBA names, ownership
              groups, and segment tags) are error-free. The Service is provided
              &quot;as is&quot; and should be used as one input among many in your
              sales decision-making process.
            </p>

            <h2>6. Intellectual Property</h2>
            <p>
              All proprietary enrichment layers, algorithms, user interface
              designs, and branding are the intellectual property of
              ThirstMetrics. Public data remains in the public domain. Your use
              of the Service does not grant ownership of any ThirstMetrics
              intellectual property.
            </p>

            <h2>7. Account Responsibilities</h2>
            <p>
              You are responsible for maintaining the confidentiality of your
              account credentials and for all activity under your account. Notify
              us immediately at{" "}
              <a href="mailto:hello@thirstmetrics.com">hello@thirstmetrics.com</a>{" "}
              if you suspect unauthorized access.
            </p>

            <h2>8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, ThirstMetrics shall not be
              liable for any indirect, incidental, special, consequential, or
              punitive damages arising from your use of the Service, including
              lost revenue, lost sales, or business interruption.
            </p>

            <h2>9. Termination</h2>
            <p>
              We may terminate or suspend your access to the Service at any time,
              with or without cause, and with or without notice. Upon
              termination, your right to use the Service ceases immediately.
            </p>

            <h2>10. Governing Law</h2>
            <p>
              These terms shall be governed by the laws of the State of Texas,
              without regard to conflict of law provisions.
            </p>

            <h2>11. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued
              use of the Service after changes constitutes acceptance of the
              revised terms.
            </p>

            <h2>12. Contact</h2>
            <p>
              Questions about these terms? Email us at{" "}
              <a href="mailto:hello@thirstmetrics.com">hello@thirstmetrics.com</a>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
