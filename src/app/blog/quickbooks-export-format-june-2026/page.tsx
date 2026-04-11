import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "QuickBooks Is Quietly Breaking Your Exports on June 30 — ThirstMetrics",
  description:
    "Intuit is migrating all 29 QBO report types to a new format by June 30, 2026. Here's what broke for us, what's changing, and how to prepare.",
  openGraph: {
    title:
      "QuickBooks Is Quietly Breaking Your Exports on June 30",
    description:
      "Intuit is migrating all 29 QBO report types by June 30. Our Fintech upload broke with zero notice. Here's what every QBO user needs to know.",
    type: "article",
  },
};

export default function QBOArticlePage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20 min-h-screen bg-slate-50">
        <article className="section-container max-w-3xl mx-auto px-4 sm:px-6">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-brand-600 hover:text-brand-700 mb-8"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-xs font-medium text-red-700">
                Breaking Change
              </span>
              <span className="text-xs text-slate-400">April 11, 2026</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
              QuickBooks Is Quietly Breaking Your Exports on June 30 — Here&apos;s
              What We Learned When Our Fintech Upload Died
            </h1>
            <p className="mt-4 text-lg text-slate-500 leading-relaxed">
              Intuit just announced sweeping changes to every QuickBooks Online
              report export. If your business relies on QBO data flowing into
              spreadsheets,{" "}
              <a
                href="https://fintech.com"
                className="text-brand-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Fintech
              </a>
              , or any downstream system, you have until{" "}
              <strong>June 30, 2026</strong> to prepare — or your workflows will
              break without warning.
            </p>
            <p className="mt-2 text-lg text-slate-500">
              We know because ours already did.
            </p>
          </header>

          {/* Body */}
          <div className="prose prose-slate prose-sm sm:prose-base max-w-none">
            <h2>What Happened to Us</h2>

            <p>
              We run a beverage distribution company in Nevada. Like thousands of
              other alcohol distributors, we use{" "}
              <a
                href="https://fintech.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Fintech&apos;s
              </a>{" "}
              PaymentSource platform to process our invoices. Every week, we
              export a QBO Journal report, clean it into Fintech&apos;s required
              tab-delimited format, and upload it. Fintech processes over 52
              million invoices a year across 9,200+ distributors — so when your
              upload format is wrong, it gets rejected instantly.
            </p>

            <p>
              We built the upload builder as an Excel macro over a year ago. It
              ran flawlessly for 14 months — every week, same steps, zero
              issues. Two months ago we moved it into a cloud-based platform
              we&apos;re developing. Still worked perfectly. Same logic, same
              parsing, same output.
            </p>

            <p>Then last week: rejected.</p>

            <p>
              No error message from QuickBooks. No notification from Intuit. No
              changelog. The QBO Journal export we&apos;d been pulling for over a
              year just... changed. Our upload builder parsed the file and came
              back with &ldquo;0 records found.&rdquo; Fintech&apos;s system rejected the
              upload because the data was malformed.
            </p>

            <p>
              After digging into it byte by byte, we found that Intuit had
              silently changed three things in the Journal export:
            </p>

            <ol>
              <li>
                <strong>The header column was renamed</strong> from
                &ldquo;Date&rdquo; to &ldquo;Transaction date&rdquo; — our parser
                searched for an exact match on &ldquo;Date&rdquo; and never found it
              </li>
              <li>
                <strong>Detail rows now repeat metadata</strong> (date, type,
                invoice number, customer name) on every line instead of leaving
                them blank — our row classifier treated every line as a new
                invoice header
              </li>
              <li>
                <strong>Quantity signs were flipped</strong> — sale quantities
                that used to export as negative (the way QBO has always tracked
                inventory-out) now come through as positive — so Fintech
                ingested every quantity as the wrong sign
              </li>
            </ol>

            <p>
              Any one of those changes would break a parser. All three hit at
              once, with zero advance notice.
            </p>

            <h2>It&apos;s Not Just Journals — It&apos;s Everything</h2>

            <p>
              On March 30, 2026, Intuit&apos;s developer team published{" "}
              <a
                href="https://medium.com/intuitdev/upcoming-changes-to-reports-apis-5083ec9aadce"
                target="_blank"
                rel="noopener noreferrer"
              >
                &ldquo;Upcoming changes to Reports APIs&rdquo;
              </a>{" "}
              confirming that <strong>all 29 QBO report types</strong> are being
              migrated to a &ldquo;modernized&rdquo; backend by June 30, 2026. After
              that date, the old format is gone permanently.
            </p>

            <p>Here&apos;s what&apos;s changing:</p>

            <ul>
              <li>
                <strong>Column headers renamed</strong> — &ldquo;ALL CAPS&rdquo;
                becomes &ldquo;Title Case.&rdquo; Any code, macro, or VLOOKUP
                matching on exact header strings will fail.
              </li>
              <li>
                <strong>Row ordering is no longer stable</strong> — If you
                reference data by row position, that assumption breaks. Intuit
                now generates row indices dynamically.
              </li>
              <li>
                <strong>Null values changed</strong> — Fields that used to
                return <code>0</code> now return an empty string{" "}
                <code>&quot;&quot;</code>. Your SUM formulas, your CSV parsers —
                anything that expects a number will get a blank instead.
              </li>
              <li>
                <strong>Account nesting behavior changed</strong> — Child
                accounts now always nest under parents, even when the parent has
                transactions. This changes the structure of every Balance Sheet,
                P&amp;L, and Trial Balance export.
              </li>
              <li>
                <strong>Split account fields changed</strong> — Used to show
                &ldquo;-Split-&rdquo; when no split account existed. Now returns blank.
              </li>
              <li>
                <strong>Date summarization capped</strong> — Yearly reports
                summarized by day used to return 365 columns. Now capped at 100
                with the rest bucketed into &ldquo;Others.&rdquo;
              </li>
              <li>
                <strong>Undocumented report endpoints removed</strong> — Only 29
                officially supported reports will survive.
              </li>
            </ul>

            <p>
              The 29 reports that survive include: Profit and Loss, Balance
              Sheet, Cash Flow, A/R Aging Detail, A/P Aging Detail, General
              Ledger, Trial Balance, Inventory Valuation, Sales by Customer,
              Sales by Product, Vendor Balance, Journal Report, and more.
            </p>

            <p>
              <a
                href="https://medium.com/intuitdev/upcoming-changes-to-reports-apis-5083ec9aadce"
                target="_blank"
                rel="noopener noreferrer"
              >
                Full list and migration details: Intuit Developer Blog &rarr;
              </a>
            </p>

            <h2>If You Upload to Fintech, Read This</h2>

            <p>
              <a
                href="https://fintech.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Fintech
              </a>{" "}
              processes $53 billion in annual alcohol purchases across over 1
              million B2B relationships. Their PaymentSource platform expects
              invoice data in a very specific tab-delimited format — right down
              to the line endings (CRLF, not LF) and the sign convention on
              quantities.
            </p>

            <p>
              When QuickBooks changes how a Journal export is structured, every
              distributor who uploads to Fintech using any kind of automated or
              semi-automated process is at risk. That includes:
            </p>

            <ul>
              <li>Excel macros that reformat the QBO Journal export</li>
              <li>Third-party middleware that bridges QBO to Fintech</li>
              <li>In-house tools (like ours) that parse and clean the export</li>
            </ul>

            <p>
              If you&apos;re one of Fintech&apos;s 9,200+ distributor partners and you
              export from QBO,{" "}
              <strong>test your upload process this week</strong>. Pull a fresh
              Journal export, run it through your existing workflow, and see if
              Fintech accepts it. If it doesn&apos;t — now you know why.
            </p>

            <h2>Who Else This Affects</h2>

            <p>
              <strong>7 million businesses</strong> use QuickBooks in the US.
              Over 62% of the small business accounting market runs on QBO. If
              even 10% of those businesses have a spreadsheet, a macro, or a
              third-party tool that reads a QBO export — that&apos;s 700,000 broken
              workflows on July 1.
            </p>

            <p>This hits hardest if you:</p>

            <ul>
              <li>
                Export QBO reports to Excel and have formulas that reference
                specific columns or rows
              </li>
              <li>
                Upload QBO data to Fintech, BlueVine, Fundbox, or any
                payment/factoring platform
              </li>
              <li>
                Run any integration that parses QBO CSV/XLSX exports — payroll
                processors, inventory systems, tax prep tools, EDI pipelines
              </li>
              <li>
                Built internal tools or macros on top of QBO exports (we did
                this for 14+ months before it broke)
              </li>
            </ul>

            <h2>What You Can Do Right Now</h2>

            <ol>
              <li>
                <strong>Test your exports today.</strong> Pull your most critical
                QBO reports (Journal, P&amp;L, A/R Aging, A/P Aging) and compare
                them to a version from 3 months ago. If the headers, row
                structure, or values look different, you&apos;re already on the new
                format.
              </li>
              <li>
                <strong>Don&apos;t match on exact header strings.</strong> If your
                parser looks for a column called &ldquo;Date,&rdquo; change it to also
                accept &ldquo;Transaction date.&rdquo; If it looks for &ldquo;TOTAL,&rdquo; also
                accept &ldquo;Total.&rdquo;
              </li>
              <li>
                <strong>Don&apos;t depend on row positions.</strong> Use column
                headers to identify fields, not &ldquo;column C is always the
                amount.&rdquo;
              </li>
              <li>
                <strong>Handle blanks where you used to get zeros.</strong> Add
                null checks. If a cell is empty, treat it as 0 for numeric
                fields.
              </li>
              <li>
                <strong>Talk to your vendors NOW.</strong> If you upload QBO
                exports to Fintech, a payroll processor, or any SaaS tool — ask
                them directly if they&apos;re aware of the June 30 deadline.
              </li>
              <li>
                <strong>If you&apos;re technical</strong>, Intuit offers a{" "}
                <code>testing_migration</code> query parameter you can add to
                API calls right now to preview the new format before June 30.
              </li>
            </ol>

            <h2>How We Fixed It</h2>

            <p>
              After the break, we rewrote our Fintech upload builder to handle
              both the old and new QBO export formats automatically. The parser
              now detects which format it&apos;s reading based on the header row,
              adjusts its row classification logic, corrects the quantity sign
              convention, and rebuilds the output file to Fintech&apos;s exact spec —
              including the CRLF line endings and two-blank-row separator
              structure their system requires.
            </p>

            <p>
              We&apos;re building format-drift detection into{" "}
              <Link href="/" className="text-brand-600 hover:underline">
                ThirstMetrics
              </Link>
              , our operations platform for beverage distributors. When a QBO
              export comes in, the system fingerprints the file structure,
              compares it to what it expects, and flags changes before they can
              silently corrupt your data. If you&apos;re a distributor dealing with
              QBO export headaches — or if the June 30 deadline has you worried
              —{" "}
              <Link href="/#contact" className="text-brand-600 hover:underline">
                reach out
              </Link>
              .
            </p>

            {/* Sources */}
            <hr />

            <h3>Sources</h3>
            <ul>
              <li>
                <a
                  href="https://medium.com/intuitdev/upcoming-changes-to-reports-apis-5083ec9aadce"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Upcoming changes to Reports APIs — Intuit Developer Blog,
                  March 30, 2026
                </a>
              </li>
              <li>
                <a
                  href="https://medium.com/intuitdev/quickbooks-online-reports-api-best-practices-and-troubleshooting-31edc9934b4c"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  QuickBooks Online Reports API: Best practices and
                  troubleshooting — Intuit Developer Blog, February 2026
                </a>
              </li>
              <li>
                <a
                  href="https://www.businesswire.com/news/home/20240123129581/en/Fintech-Celebrates-Remarkable-Milestone-1-Million-Alcohol-Distributor-to-Client-Connections-with-PaymentSource"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Fintech Celebrates 1 Million Distributor-to-Client Connections
                  — BusinessWire, January 2024
                </a>
              </li>
            </ul>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
