export const dynamic = "error";
import Link from "next/link";

export default function PrivacyEnPage() {
  const lastUpdated = "August 7, 2025";
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-tr from-[#FFFBF4] via-[#F8F4FF] to-[#E8E1FF] py-16 md:py-24 border-b border-[#DDC7FF]/40">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl font-bold text-[#6153E0] mb-4">
            Privacy Policy
          </h1>
          <p className="text-[#6153E0]/70">Last updated: {lastUpdated}</p>
          <div className="mt-3">
            <Link
              href="/privacy"
              aria-label="Ver Aviso de Privacidad en español"
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-[#6153E0] underline decoration-[#6153E0]/50 underline-offset-2 hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6153E0] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              Ver en español
            </Link>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 prose prose-neutral">
          <p>
            At Polenia, we respect your privacy and are committed to
            safeguarding your personal data. This Policy explains what we
            collect, how we use it, and your rights.
          </p>

          <h2>Information we collect</h2>
          <ul>
            <li>Contact details (name, email, phone, address).</li>
            <li>Order and billing information.</li>
            <li>
              Technical data (IP, device type, browser) to improve the site.
            </li>
          </ul>

          <h2>How we use your information</h2>
          <ul>
            <li>Process orders and payments.</li>
            <li>Handle shipping, returns, and support.</li>
            <li>Improve our products and website experience.</li>
            <li>Communications related to your account and purchases.</li>
          </ul>

          <h2>Legal basis</h2>
          <p>
            We process your data based on contract performance, legitimate
            interests, or your consent, as applicable.
          </p>

          <h2>Data sharing</h2>
          <p>
            We may share data with providers that help us operate the site
            (e.g., payments and shipping). These third parties process data
            under our instructions with appropriate safeguards.
          </p>

          <h2>Retention</h2>
          <p>
            We retain data only as long as necessary for the purposes described
            and to meet legal obligations.
          </p>

          <h2>Your rights</h2>
          <ul>
            <li>Access, correction, and deletion of your data.</li>
            <li>Object to or restrict processing in certain cases.</li>
            <li>Data portability where applicable.</li>
            <li>Withdraw consent when processing is based on consent.</li>
          </ul>

          <h2>Security</h2>
          <p>
            We implement reasonable technical and organizational measures to
            protect your data against unauthorized access, loss, or alteration.
          </p>

          <h2>International transfers</h2>
          <p>
            If we transfer data outside your country, we ensure appropriate
            safeguards in accordance with applicable law.
          </p>

          <h2>Changes to this Policy</h2>
          <p>
            We may update this Policy from time to time. We&apos;ll post any
            changes on this page with the updated date.
          </p>

          <h2>Contact</h2>
          <p>
            If you have privacy questions, contact us via the Contact page or
            the email listed on the site.
          </p>
        </div>
      </section>
    </main>
  );
}
