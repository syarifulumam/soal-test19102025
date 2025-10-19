export function Navbar() {
  return (
    <nav className="w-full border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="text-xl font-semibold">
          <img
            src="https://www.ims-tec.com/wp-content/uploads/2021/01/IMS-Logo.png"
            alt="logo"
            className="w-20 h-8 object-contain" // 🔹 ukuran kecil dan proporsional
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
