import dynamic from "next/dynamic"
import Hero from "@/components/Hero"
import Navbar from "@/components/Navbar"
import About from "@/components/About"
import Experience from "@/components/Experience"
import Tech from "@/components/Tech"
import Works from "@/components/Works"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"

import StarsCanvas from "@/components/canvas/Stars"

export default function Home() {
  return (
    <main className="relative z-0 bg-background overflow-x-hidden dark font-sans selection:bg-primary selection:text-white">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar />
        <Hero />
      </div>

      <About />
      <Experience />
      <Tech />
      <Works />

      <div className="relative z-0">
        <Contact />
        <StarsCanvas />
      </div>

      <Footer />
    </main>
  )
}
