function Footer() {
  return (
    <footer
      className="
        border-t
        border-[#262626]
        py-8
        px-6
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          flex
          flex-col
          md:flex-row
          justify-between
          items-center
          gap-4
        "
      >
        <h3 className="font-semibold">
          JobNest
        </h3>

        <p className="text-gray-500 text-sm">
          Built with MERN + Gemini AI
        </p>

        <p className="text-gray-500 text-sm">
          © 2026 JobNest
        </p>
      </div>
    </footer>
  );
}

export default Footer;