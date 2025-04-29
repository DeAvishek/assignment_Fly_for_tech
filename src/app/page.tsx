import Link from "next/link";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Feature from "@/components/Feature";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <header className="py-4 shadow-md ">
        <nav className="container mx-auto flex justify-between items-center px-4">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Upskill
          </Link>
        </nav>
      </header>

      <main className="flex flex-col items-center bg-gray-50 px-4">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center justify-center w-full min-h-screen max-w-7xl mx-auto py-12">
          {/* Left Side: Image */}
          <div className="w-full md:w-1/2 flex justify-center p-4">
            <img
              className="w-full h-auto max-w-md md:max-w-full rounded-lg shadow-lg object-cover"
              src="https://img.freepik.com/premium-photo/celebration-independence-day-malawi-website-covers_307791-3243.jpg?w=1380"
              alt="banner"
            />
          </div>

          {/* Right Side: Hero Content */}
          <div className="w-full md:w-1/2 flex justify-center p-1">
            <Hero />
          </div>
        </section>
        <hr className="border-t border-gray-500 w-full my-8" />

        
        {/* About Section */}
        <section className="flex flex-col items-center justify-center w-full min-h-screen max-w-7xl mx-auto py-12">
          <About />
        </section>
        {/* Feature section */}

        <hr className="border-t border-gray-500 w-full my-8" />
        <section className="flex flex-col items-center justify-center w-full min-h-screen max-w-7xl mx-auto py-12">
          < Feature/>
        </section>
        <hr className="border-t border-gray-500 w-full my-8" />
        
        {/* <section className="flex flex-col items-center justify-center w-full min-h-screen max-w-7xl mx-auto py-12"> */}
          < Footer/>
        {/* </section> */}
      </main> 
    </>
  );
}
