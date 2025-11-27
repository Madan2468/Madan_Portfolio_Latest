"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { navLinks } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { Menu, X, Github, Linkedin } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const Navbar = () => {
  const [active, setActive] = useState("")
  const [toggle, setToggle] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      if (scrollTop > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500",
        "w-[95%] md:w-[85%] lg:w-[75%] rounded-full",
        scrolled
          ? "bg-black/60 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)] py-3"
          : "bg-transparent border border-transparent py-5",
      )}
    >
      <div className="w-full flex justify-between items-center px-6 md:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 group"
          onClick={() => {
            setActive("")
            window.scrollTo(0, 0)
          }}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="w-10 h-10 rounded-full overflow-hidden shadow-lg shadow-primary/30 border-2 border-white/10"
          >
            <Image
              src="/logo.jpg"
              alt="Madan Gopal Jha"
              width={40}
              height={40}
              className="object-cover w-full h-full"
            />
          </motion.div>
          <div className="flex flex-col">
            <p className="text-white text-[18px] font-bold cursor-pointer flex tracking-wide group-hover:text-primary transition-colors duration-300">
              Madan Gopal Jha
            </p>
          </div>
        </Link>

        <ul className="list-none hidden md:flex flex-row gap-8 items-center">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className="relative"
              onClick={() => setActive(link.title)}
            >
              <a
                href={`#${link.id}`}
                className={cn(
                  "text-[15px] font-medium cursor-pointer transition-colors duration-300 relative z-10 px-4 py-2 rounded-full",
                  active === link.title ? "text-white" : "text-gray-400 hover:text-white"
                )}
              >
                {link.title}
                {active === link.title && (
                  <motion.div
                    layoutId="navbar-active"
                    className="absolute inset-0 bg-white/10 rounded-full -z-10 backdrop-blur-sm border border-white/5"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </a>
            </li>
          ))}

          {/* Social Icons Divider */}
          <div className="w-px h-6 bg-white/10 mx-2" />

          <div className="flex gap-4 items-center">
            <a href="https://github.com/Madan2468" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/madan-gopal-jha-380865255/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200">
              <Linkedin size={20} />
            </a>
            <a href="https://codolio.com/profile/madan13/card" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200">
              {/* Codolio Icon - Using a custom SVG or a generic Code icon as placeholder if specific icon not available */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
            </a>
            <a href="https://drive.google.com/file/d/1rjet2Db3AIm6XP4i9ouhpb89Gv-AExzG/view?usp=sharing" download className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white text-sm font-medium transition-all ml-2 border border-white/10 hover:border-white/30">
              <span>Resume</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
            </a>
          </div>
        </ul>

        <div className="md:hidden flex flex-1 justify-end items-center">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="w-[36px] h-[36px] flex items-center justify-center rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
            onClick={() => setToggle(!toggle)}
            aria-label="Toggle menu"
          >
            {toggle ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </motion.button>

          <AnimatePresence>
            {toggle && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="p-6 bg-black/90 backdrop-blur-2xl border border-white/10 absolute top-16 right-0 min-w-[200px] z-10 rounded-2xl shadow-2xl"
              >
                <ul className="list-none flex justify-end items-start flex-col gap-4">
                  {navLinks.map((link) => (
                    <li
                      key={link.id}
                      className={cn(
                        "font-medium cursor-pointer text-[16px] w-full p-3 rounded-xl transition-all duration-300 hover:bg-white/5 hover:pl-5",
                        active === link.title ? "text-primary bg-white/5 pl-5" : "text-gray-400"
                      )}
                      onClick={() => {
                        setToggle(!toggle)
                        setActive(link.title)
                      }}
                    >
                      <a href={`#${link.id}`} className="block w-full">{link.title}</a>
                    </li>
                  ))}

                  <div className="w-full h-px bg-white/10 my-2" />

                  <div className="flex gap-4 justify-center w-full pt-2">
                    <a href="https://github.com/Madan2468" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white p-2 bg-white/5 rounded-full">
                      <Github size={20} />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white p-2 bg-white/5 rounded-full">
                      <Linkedin size={20} />
                    </a>
                    <a href="https://codolio.com/profile/madan13/card" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white p-2 bg-white/5 rounded-full">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                    </a>
                  </div>
                  <a href="/resume.pdf" download className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary/20 hover:bg-primary/30 rounded-xl text-primary font-bold transition-all border border-primary/20 mt-2">
                    <span>Download Resume</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                  </a>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
