// src/app/about/page.tsx
export default function About() {
    return (
      <section className="py-16 px-4 h-screen flex justify-center items-center bg-yellow-50">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-yellow-900 mb-8">About GingerBuzz</h1>
          <p className="text-xl text-yellow-700 mb-6">
            At GingerBuzz, we craft the finest ginger beer using traditional recipes and the best natural ingredients.
            We believe in the power of bold flavors and the art of brewing small batches with passion.
          </p>
          <h2 className="text-2xl font-semibold text-yellow-900 mb-4">Our Story</h2>
          <p className="text-lg text-yellow-700 mb-8">
            Born out of a love for ginger and a desire to create something unique, GingerBuzz started as a small family project.
            Over time, we’ve refined our recipe to bring you the perfect balance of spice and refreshment in every sip.
          </p>
          <h3 className="text-xl font-semibold text-yellow-900 mb-4">Our Mission</h3>
          <p className="text-lg text-yellow-700">
            Our mission is to share the authentic taste of craft ginger beer with the world. We are committed to providing a product that is not only refreshing but also healthy and all-natural.
          </p>
        </div>
      </section>
    );
  }
  