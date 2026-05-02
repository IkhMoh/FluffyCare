export function HeroSection() {
  return (
    <section className="rounded-3xl bg-gradient-to-br from-[#FEF3E2] to-[#FFF7ED] p-8 md:p-12">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h1 className="text-4xl font-black md:text-6xl">
            Find Your Perfect <span className="text-[#F97316]">Companion</span>
          </h1>
          <p className="text-lg text-gray-600">Give a loving home to an animal that needs one.</p>
          <div className="flex gap-3">
            <button className="rounded-full bg-[#F97316] px-5 py-3 font-semibold text-white">Browse Animals</button>
            <button className="rounded-full border border-gray-300 bg-white px-5 py-3 font-semibold">About Us</button>
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <img src="https://placedog.net/200/200?id=16" alt="dog" className="h-32 w-32 rounded-full object-cover md:h-40 md:w-40" />
          <img src="https://placekitten.com/201/201" alt="cat" className="mt-8 h-32 w-32 rounded-full object-cover md:h-40 md:w-40" />
          <img src="https://placedog.net/202/202?id=17" alt="dog2" className="h-32 w-32 rounded-full object-cover md:h-40 md:w-40" />
        </div>
      </div>
    </section>
  );
}
