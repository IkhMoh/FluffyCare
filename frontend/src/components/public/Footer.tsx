export function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-100 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 md:grid-cols-3 md:px-10">

        {/* Brand */}
        <div>
          <h3 className="text-xl font-black text-[#1A1A1A]">
            🐾 FluffyCare
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Helping animals find loving homes. Every adoption changes a life.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="mb-3 font-semibold">Quick Links</h4>
          <ul className="space-y-2 text-gray-600">
            <li>
              <a href="#home" className="hover:text-[#F97316]">
                Home
              </a>
            </li>
            <li>
              <a href="#animals" className="hover:text-[#F97316]">
                Animals
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-[#F97316]">
                About
              </a>
            </li>
          </ul>
        </div>

        {/* Contact / Info */}
        <div>
          <h4 className="mb-3 font-semibold">Get Involved</h4>
          <p className="text-sm text-gray-600">
            Adopt, foster, or volunteer to help animals in need.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Contact: support@fluffycare.com
          </p>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-100 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} FluffyCare. All rights reserved.
      </div>
    </footer>
  );
}