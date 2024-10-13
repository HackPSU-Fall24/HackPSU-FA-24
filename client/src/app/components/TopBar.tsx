// src/app/components/TopBar.tsx

export default function TopBar() {
    return (
      <div className="sticky top-0 w-full p-4 bg-smoky-black text-alice-blue shadow-md z-50">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Engineering Course Plan Quiz</h1>
          <nav>
            <a href="#" className="ml-4 text-bright-pink-crayola hover:text-celestial-blue transition duration-300">Home</a>
            <a href="#" className="ml-4 text-bright-pink-crayola hover:text-celestial-blue transition duration-300">About</a>
          </nav>
        </div>
      </div>
    );
  }
  