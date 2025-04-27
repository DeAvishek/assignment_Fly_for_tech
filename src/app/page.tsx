import Link from "next/link";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <header className="py-4 shadow-md bg-white">
        <nav className="container mx-auto flex justify-between items-center px-4">
          <Link href="/" className="text-2xl font-bold text-blue-600">Upskill</Link>
        </nav>
      </header>

      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] bg-gray-50 px-4">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center max-w-6xl w-full">
          {/* Left Side: Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              className="max-w-full h-auto rounded-lg shadow-lg"
              src="https://img.freepik.com/premium-photo/celebration-independence-day-malawi-website-covers_307791-3243.jpg?w=1380"
              alt="banner"
            />
          </div>

          {/* Right Side: Content */}
          <Hero/>
        </section>
        
      </main>
    </>
  );
}
