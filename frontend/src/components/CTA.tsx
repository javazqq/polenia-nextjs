export default function CTA() {
    return (
      <section className="bg-yellow-900 text-white py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Taste the Buzz?</h2>
        <p className="text-xl mb-6">Order your first batch of Ginger Beer now, and experience the authentic flavor!</p>
        <a
          href="/order"
          className="bg-yellow-700 hover:bg-yellow-600 text-white text-lg px-8 py-4 rounded-full transition"
        >
          Order Now
        </a>
      </section>
    );
  }
  