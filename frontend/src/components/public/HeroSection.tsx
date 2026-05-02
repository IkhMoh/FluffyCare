export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl  from-[#FEF3E2] to-[#FFF7ED] p-8 md:p-14">
      {/* decorative background blur */}
      <div className="pointer-events-none absolute -top-10 -right-10 h-64 w-64 rounded-full bg-[#F97316]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-[#F97316]/10 blur-3xl" />

      <div className="grid items-center gap-10 md:grid-cols-2">
        {/* TEXT */}
        <div className="space-y-6">
          <h1 className="text-4xl font-black leading-tight md:text-6xl">
            Find Your Perfect{" "}
            <span className="text-[#F97316]">Companion</span>
          </h1>

          <p className="text-lg leading-relaxed text-gray-600">
            Adopt a loving pet and give them a second chance at life. Every
            animal deserves a warm home and a caring family.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="rounded-full bg-[#F97316] px-6 py-3 font-semibold text-white shadow-md transition hover:scale-105 hover:bg-orange-500">
              Browse Animals
            </button>

            <button className="rounded-full border border-gray-300 bg-white px-6 py-3 font-semibold transition hover:scale-105 hover:bg-gray-50">
              Learn More
            </button>
          </div>
        </div>

        {/* IMAGES */}
        <div className="relative flex justify-center">
          <div className="flex items-end justify-center -space-x-3">
            {/* left */}
            <img
              src="https://placedog.net/300/300?id=16"
              alt="dog"
              className="h-28 w-28 translate-y-2 rounded-full object-cover shadow-lg transition md:h-40 md:w-40"
            />

            {/* center (bigger + higher) */}
            <img
              src="https://placedog.net/400/400?id=20"
              alt="center pet"
              className="z-10 -mt-6 h-36 w-36 rounded-full object-cover shadow-2xl transition md:h-52 md:w-52"
            />

            {/* right */}
            <img
              src="https://placedog.net/302/302?id=17"
              alt="cat"
              className="h-28 w-28 translate-y-2 rounded-full object-cover shadow-lg transition md:h-40 md:w-40"
            />
          </div>
        </div>
      </div>
    </section>
  );
}