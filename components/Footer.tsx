"use client"

import { Github, Twitter, Linkedin, ArrowUp, Mail, Heart, Send, Phone } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <footer className="w-full bg-black border-t border-white/10 pt-20 pb-10 relative overflow-hidden">
      {/* Holographic Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <motion.div
        variants={containerVariants as any}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 relative z-10"
      >
        <div className="flex flex-col items-center justify-center mb-16 text-center">
          <motion.h2 variants={itemVariants as any} className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
            LET'S <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">CONNECT</span>
          </motion.h2>
          <motion.p variants={itemVariants as any} className="text-gray-400 text-lg max-w-2xl mb-10">
            Have a project in mind or just want to say hi? I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
          </motion.p>

          <motion.div variants={itemVariants as any} className="flex flex-wrap justify-center gap-6">
            <a href="mailto:madanjha2468@gmail.com" className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 group-hover:text-white flex items-center gap-2">
                <Mail size={20} /> madanjha2468@gmail.com
              </span>
            </a>
            <a href="tel:+917003659113" className="px-8 py-4 bg-white/5 border border-white/10 rounded-full font-bold text-lg text-white hover:bg-white/10 transition-all hover:scale-105 flex items-center gap-2">
              <Phone size={20} /> +91 7003659113
            </a>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
                <span className="text-white font-black text-xl">M</span>
              </div>
              <span className="text-white text-xl font-bold tracking-tight">Madan Gopal Jha</span>
            </Link>
            <p className="text-gray-500 text-sm">
              Building digital experiences that matter.
            </p>
          </div>

          {/* Socials */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h3 className="text-white font-bold">Socials</h3>
            <div className="flex gap-4">
              {[
                { icon: Github, href: "https://github.com/Madan2468" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/madan-gopal-jha-380865255/" },
                {
                  icon: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5zM2 12l10 5 10-5" /></svg>,
                  href: "https://codolio.com/profile/madan13/card"
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 hover:scale-110"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <h3 className="text-white font-bold">Menu</h3>
            <div className="flex gap-6">
              {["About", "Work", "Contact"].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-white text-sm transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs text-center md:text-left">
            © {new Date().getFullYear()} Madan Gopal Jha. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs text-gray-500 hover:text-white transition-colors"
          >
            BACK TO TOP <ArrowUp size={12} />
          </button>
        </div>
      </motion.div>
    </footer>
  )
}

export default Footer
