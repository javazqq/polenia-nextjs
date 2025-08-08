import Link from "next/link";

const sections = [
  { id: "acceptance", title: "Acceptance of Terms" },
  { id: "eligibility", title: "Eligibility" },
  { id: "orders", title: "Products & Orders" },
  { id: "pricing", title: "Pricing & Payment" },
  { id: "shipping", title: "Shipping & Delivery" },
  { id: "returns", title: "Returns & Refunds" },
  { id: "accounts", title: "Accounts & Security" },
  { id: "ip", title: "Intellectual Property" },
  { id: "conduct", title: "Prohibited Conduct" },
  { id: "thirdparty", title: "Third‑Party Services" },
  { id: "disclaimers", title: "Disclaimers & Limitation of Liability" },
  { id: "indemnification", title: "Indemnification" },
  { id: "law", title: "Governing Law & Jurisdiction" },
  { id: "changes", title: "Changes to These Terms" },
  { id: "contact", title: "Contact Us" },
];

export default function TermsPageEn() {
  const lastUpdated = "August 7, 2025";

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-tr from-[#FFFBF4] via-[#F8F4FF] to-[#E8E1FF] py-16 md:py-24 border-b border-[#DDC7FF]/40">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl font-bold text-[#6153E0] mb-4">
            Terms &amp; Conditions
          </h1>
          <p className="text-[#6153E0]/70">Last updated: {lastUpdated}</p>
          <div className="mt-3">
            <Link
              href="/terms"
              aria-label="Ver Términos y Condiciones en español"
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-[#6153E0] underline decoration-[#6153E0]/50 underline-offset-2 hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6153E0] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              Ver en español
            </Link>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <nav aria-label="Table of contents" className="mb-10">
            <div className="bg-[#F8F4FF] border border-[#DDC7FF]/60 rounded-2xl p-5">
              <h2 className="text-lg font-semibold text-[#6153E0] mb-3">
                Overview
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#6153E0]">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a className="hover:underline" href={`#${s.id}`}>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="prose prose-neutral max-w-none">
            <section
              id="acceptance"
              aria-labelledby="acceptance-heading"
              className="scroll-mt-24"
            >
              <h2
                id="acceptance-heading"
                className="text-2xl font-bold text-[#6153E0]"
              >
                Acceptance of Terms
              </h2>
              <p>
                By accessing or using our website, placing an order, or
                otherwise interacting with Polenia (&quot;we&quot;,
                &quot;us&quot;, or &quot;our&quot;), you agree to be bound by
                these Terms &amp; Conditions (&quot;Terms&quot;). If you do not
                agree, you must not use our services.
              </p>
            </section>

            <section
              id="eligibility"
              aria-labelledby="eligibility-heading"
              className="scroll-mt-24"
            >
              <h2
                id="eligibility-heading"
                className="text-2xl font-bold text-[#6153E0]"
              >
                Eligibility
              </h2>
              <p>
                You must be legally capable of entering into binding contracts
                in your jurisdiction and meet any age requirements applicable to
                purchasing our products.
              </p>
            </section>

            <section
              id="orders"
              aria-labelledby="orders-heading"
              className="scroll-mt-24"
            >
              <h2
                id="orders-heading"
                className="text-2xl font-bold text-[#6153E0]"
              >
                Products &amp; Orders
              </h2>
              <ul className="list-disc pl-6">
                <li>
                  We may limit or cancel quantities per order, per person, or
                  per address at our discretion.
                </li>
                <li>
                  All orders are subject to availability and our acceptance.
                </li>
                <li>
                  We strive to display product information accurately; however,
                  minor variations in packaging or appearance may occur.
                </li>
              </ul>
            </section>

            <section
              id="pricing"
              aria-labelledby="pricing-heading"
              className="scroll-mt-24"
            >
              <h2
                id="pricing-heading"
                className="text-2xl font-bold text-[#6153E0]"
              >
                Pricing &amp; Payment
              </h2>
              <ul className="list-disc pl-6">
                <li>
                  Prices are shown in local currency and may change without
                  notice.
                </li>
                <li>
                  Applicable taxes, fees, and shipping costs are calculated at
                  checkout.
                </li>
                <li>
                  By submitting payment details, you confirm you are authorized
                  to use the payment method.
                </li>
              </ul>
            </section>

            <section
              id="shipping"
              aria-labelledby="shipping-heading"
              className="scroll-mt-24"
            >
              <h2
                id="shipping-heading"
                className="text-2xl font-bold text-[#6153E0]"
              >
                Shipping &amp; Delivery
              </h2>
              <p>
                Delivery estimates are provided for convenience and are not
                guarantees. Risk of loss passes to you upon delivery to the
                carrier unless required otherwise by applicable law. For more
                information, see our{" "}
                <Link href="/shipping" className="text-[#6153E0] underline">
                  Shipping Info
                </Link>
                .
              </p>
            </section>

            <section
              id="returns"
              aria-labelledby="returns-heading"
              className="scroll-mt-24"
            >
              <h2
                id="returns-heading"
                className="text-2xl font-bold text-[#6153E0]"
              >
                Returns &amp; Refunds
              </h2>
              <p>
                If you are not satisfied with your purchase, please review our{" "}
                <Link href="/returns" className="text-[#6153E0] underline">
                  Returns
                </Link>{" "}
                policy for eligibility, timelines, and instructions.
              </p>
            </section>

            <section
              id="accounts"
              aria-labelledby="accounts-heading"
              className="scroll-mt-24"
            >
              <h2
                id="accounts-heading"
                className="text-2xl font-bold text-[#6153E0]"
              >
                Accounts &amp; Security
              </h2>
              <ul className="list-disc pl-6">
                <li>
                  You are responsible for maintaining the confidentiality of
                  your account credentials.
                </li>
                <li>
                  You must promptly notify us of any suspected unauthorized use
                  of your account.
                </li>
              </ul>
            </section>

            <section
              id="ip"
              aria-labelledby="ip-heading"
              className="scroll-mt-24"
            >
              <h2 id="ip-heading" className="text-2xl font-bold text-[#6153E0]">
                Intellectual Property
              </h2>
              <p>
                All content on this site, including trademarks, logos, graphics,
                and text, is owned by or licensed to Polenia and protected by
                applicable laws. You may not use our intellectual property
                without prior written permission.
              </p>
            </section>

            <section
              id="conduct"
              aria-labelledby="conduct-heading"
              className="scroll-mt-24"
            >
              <h2
                id="conduct-heading"
                className="text-2xl font-bold text-[#6153E0]"
              >
                Prohibited Conduct
              </h2>
              <ul className="list-disc pl-6">
                <li>Violating any applicable law or regulation.</li>
                <li>
                  Interfering with site security, integrity, or performance.
                </li>
                <li>Misrepresenting your identity or affiliation.</li>
              </ul>
            </section>

            <section
              id="thirdparty"
              aria-labelledby="thirdparty-heading"
              className="scroll-mt-24"
            >
              <h2
                id="thirdparty-heading"
                className="text-2xl font-bold text-[#6153E0]"
              >
                Third‑Party Services
              </h2>
              <p>
                Our services may integrate third‑party platforms (for example,
                payments or shipping). Those services are governed by their own
                terms, and we are not responsible for their content or
                practices.
              </p>
            </section>

            <section
              id="disclaimers"
              aria-labelledby="disclaimers-heading"
              className="scroll-mt-24"
            >
              <h2
                id="disclaimers-heading"
                className="text-2xl font-bold text-[#6153E0]"
              >
                Disclaimers &amp; Limitation of Liability
              </h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, OUR WEBSITE AND PRODUCTS
                ARE PROVIDED “AS IS” WITHOUT WARRANTIES OF ANY KIND. POLENIA
                WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
                CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO
                YOUR USE OF THE SERVICES OR PRODUCTS.
              </p>
            </section>

            <section
              id="indemnification"
              aria-labelledby="indemnification-heading"
              className="scroll-mt-24"
            >
              <h2
                id="indemnification-heading"
                className="text-2xl font-bold text-[#6153E0]"
              >
                Indemnification
              </h2>
              <p>
                You agree to indemnify and hold harmless Polenia and our
                affiliates from any claims, damages, or expenses arising from
                your use of the services, your violation of these Terms, or your
                infringement of any third‑party rights.
              </p>
            </section>

            <section
              id="law"
              aria-labelledby="law-heading"
              className="scroll-mt-24"
            >
              <h2
                id="law-heading"
                className="text-2xl font-bold text-[#6153E0]"
              >
                Governing Law &amp; Jurisdiction
              </h2>
              <p>
                These Terms are governed by the laws of Mexico, without regard
                to conflict‑of‑laws principles. You agree to submit to the
                exclusive jurisdiction of the courts located in Oaxaca, Mexico,
                for the resolution of any dispute.
              </p>
            </section>

            <section
              id="changes"
              aria-labelledby="changes-heading"
              className="scroll-mt-24"
            >
              <h2
                id="changes-heading"
                className="text-2xl font-bold text-[#6153E0]"
              >
                Changes to These Terms
              </h2>
              <p>
                We may update these Terms from time to time. Changes will be
                posted on this page with an updated “Last updated” date.
                Continued use of our services after changes take effect
                constitutes acceptance of the revised Terms.
              </p>
            </section>

            <section
              id="contact"
              aria-labelledby="contact-heading"
              className="scroll-mt-24"
            >
              <h2
                id="contact-heading"
                className="text-2xl font-bold text-[#6153E0]"
              >
                Contact Us
              </h2>
              <p>
                For questions about these Terms, please visit our{" "}
                <Link href="/faq" className="text-[#6153E0] underline">
                  FAQ
                </Link>{" "}
                or reach us through the{" "}
                <Link href="/contact" className="text-[#6153E0] underline">
                  Contact
                </Link>{" "}
                page.
              </p>
            </section>
          </div>

          <div className="mt-10">
            <Link href="#footer" className="text-[#6153E0] underline">
              Back to footer
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
