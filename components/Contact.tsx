"use client"

import type React from "react"
import { useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import dynamic from "next/dynamic"
import SectionWrapper from "./SectionWrapper"
import { slideIn, textVariant } from "@/lib/motion"

const CyberIsland = dynamic(() => import("./canvas/CyberIsland"), { ssr: false })

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [loading, setLoading] = useState(false)
  const [showNotification, setShowNotification] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { target } = e
    const { name, value } = target

    setForm({
      ...form,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setShowNotification(true)

      setForm({
        name: "",
        email: "",
        message: "",
      })

      // Auto-hide notification after 8 seconds
      setTimeout(() => {
        setShowNotification(false)
      }, 8000)
    }, 1000)
  }

  return (
    <SectionWrapper idName="contact">
      <div className="relative w-full h-[800px] overflow-hidden rounded-[3rem] border border-white/10 shadow-2xl bg-black/20 backdrop-blur-sm">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <CyberIsland />
        </div>

        {/* Custom Notification Modal */}
        <AnimatePresence>
          {showNotification && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
              onClick={() => setShowNotification(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 20 }}
                className="relative max-w-md w-full mx-4 bg-gradient-to-br from-card via-card/95 to-card/90 border-2 border-primary/50 rounded-2xl p-8 shadow-[0_0_50px_rgba(139,92,246,0.4)]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Animated border glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary via-purple-400 to-primary opacity-20 blur-xl animate-pulse" />

                {/* Content */}
                <div className="relative z-10">
                  {/* Warning Icon */}
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                      <span className="text-3xl">⚠️</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-black text-center text-white mb-4 tracking-tight">
                    MOCK FORM
                  </h3>

                  {/* Message */}
                  <p className="text-foreground/80 text-center mb-6 leading-relaxed">
                    This is a <span className="text-primary font-semibold">demonstration form</span> for portfolio purposes.
                  </p>

                  {/* Email Box */}
                  <div className="bg-black/40 border border-primary/30 rounded-lg p-4 mb-6">
                    <p className="text-xs text-primary/70 uppercase tracking-widest mb-2 font-mono">
                      Please contact me directly at:
                    </p>
                    <a
                      href="mailto:madangopaljha9@gmail.com"
                      className="text-lg font-bold text-primary hover:text-purple-400 transition-colors break-all block"
                    >
                     madanjha2468 @gmail.com
                    </a>
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={() => setShowNotification(false)}
                    className="w-full bg-primary hover:bg-primary/80 text-white py-3 px-6 rounded-lg font-bold uppercase text-sm transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]"
                  >
                    Got It!
                  </button>

                  {/* Auto-close hint */}
                  <p className="text-xs text-foreground/40 text-center mt-3 font-mono">
                    Auto-closes in 8 seconds
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Overlay */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="w-full max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-12">

            {/* Left Text */}
            <motion.div variants={textVariant()} className="flex-1 pointer-events-auto">
              <p className="text-sm uppercase tracking-[0.3em] font-bold text-primary mb-4 drop-shadow-[0_0_10px_rgba(124,58,237,0.5)]">
                Initialize Connection
              </p>
              <h2 className="text-white font-black lg:text-8xl md:text-7xl sm:text-6xl text-5xl tracking-tighter leading-none mb-6 drop-shadow-2xl">
                LET'S<br />BUILD<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">FUTURE.</span>
              </h2>
              <p className="text-gray-300 text-lg max-w-md leading-relaxed backdrop-blur-md bg-black/30 p-4 rounded-xl border-l-4 border-primary">
                Ready to turn your vision into a digital reality? Send a signal across the network.
              </p>
            </motion.div>

            {/* Right Form - Floating Hologram */}
            <motion.div
              variants={slideIn("right", "tween", 0.2, 1)}
              className="flex-1 w-full max-w-md pointer-events-auto"
            >
              <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-[0_0_50px_rgba(124,58,237,0.2)] relative overflow-hidden">
                {/* Holographic Scanline */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent h-[200%] w-full animate-scanline pointer-events-none" />

                <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono text-primary uppercase tracking-widest">Identify User</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="ENTER NAME"
                      className="bg-white/5 border border-white/10 py-3 px-4 text-white placeholder:text-white/20 rounded-lg outline-none font-mono text-sm focus:border-primary focus:bg-white/10 transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono text-primary uppercase tracking-widest">Comms Channel</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="ENTER EMAIL"
                      className="bg-white/5 border border-white/10 py-3 px-4 text-white placeholder:text-white/20 rounded-lg outline-none font-mono text-sm focus:border-primary focus:bg-white/10 transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono text-primary uppercase tracking-widest">Transmission</label>
                    <textarea
                      rows={4}
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="ENTER MESSAGE DATA..."
                      className="bg-white/5 border border-white/10 py-3 px-4 text-white placeholder:text-white/20 rounded-lg outline-none font-mono text-sm resize-none focus:border-primary focus:bg-white/10 transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-primary hover:bg-primary/80 text-white py-4 px-8 rounded-lg font-black tracking-[0.2em] uppercase text-sm transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] flex items-center justify-center gap-2 group"
                  >
                    {loading ? "TRANSMITTING..." : "INITIATE UPLINK"}
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse group-hover:bg-green-400" />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

export default Contact
