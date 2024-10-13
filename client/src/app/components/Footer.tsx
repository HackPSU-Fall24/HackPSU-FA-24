// src/app/components/Footer.tsx

export default function Footer() {
    return (
      <footer className="w-full p-4 bg-smoky-black text-alice-blue">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm">© 2024 Engineering Course Plan Quiz. All Rights Reserved.</p>
          <nav>
            <a href="#" className="ml-4 text-bright-pink-crayola hover:text-celestial-blue transition duration-300">Privacy Policy</a>
            <a href="#" className="ml-4 text-bright-pink-crayola hover:text-celestial-blue transition duration-300">Contact</a>
          </nav>
        </div>
      </footer>
    );
  }
  