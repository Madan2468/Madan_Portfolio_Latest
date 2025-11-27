"use client"

import { motion } from "framer-motion"
import dynamic from "next/dynamic"

const HeroCanvas = dynamic(() => import("./canvas/HeroCanvas"), { ssr: false })

const Hero = () => {
  // Staggered animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as any,
      },
    },
  }

  return (
    <section className="relative w-full h-screen mx-auto overflow-hidden bg-background">
      {/* Enhanced gradient overlay with radial glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background opacity-60" />
      <div className="absolute inset-0 hero-gradient" />

      <div className="absolute inset-0 top-[120px] max-w-7xl mx-auto px-6 flex flex-row items-start gap-5 z-10 pointer-events-none">
        {/* Enhanced timeline indicator with glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center items-center mt-5"
        >
          <motion.div
            animate={{
              boxShadow: [
                "0 0 20px rgba(139, 92, 246, 0.5)",
                "0 0 30px rgba(139, 92, 246, 0.8)",
                "0 0 20px rgba(139, 92, 246, 0.5)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-5 h-5 rounded-full bg-primary shadow-lg shadow-primary/50"
          />
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-1 sm:h-80 h-40 bg-gradient-to-b from-primary via-primary/50 to-transparent"
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="pointer-events-auto"
        >
          {/* Welcome text */}
          <motion.p
            variants={itemVariants}
            className="text-primary/80 font-medium text-sm tracking-widest uppercase mb-4 flex items-center gap-2"
          >
            <span className="inline-block w-8 h-[1px] bg-primary/50" />
            Welcome to my portfolio
          </motion.p>

          {/* Main heading with enhanced gradient */}
          <motion.h1
            variants={itemVariants}
            className="font-black text-foreground lg:text-7xl md:text-6xl sm:text-5xl text-4xl lg:leading-tight tracking-tight mb-6"
          >
            I'm{" "}
            <span className="text-gradient animate-gradient bg-[length:200%_auto]">
              Madan Gopal Jha
            </span>
          </motion.h1>

          {/* Description with better spacing */}
          <motion.p
            variants={itemVariants}
            className="text-foreground/70 font-light lg:text-[20px] sm:text-[18px] xs:text-[16px] text-[14px] lg:leading-[32px] max-w-2xl tracking-normal"
          >
            Full-Stack Web Developer & AI Agent Developer creating{" "}
            <span className="text-foreground/90 font-normal">modern, high-performance apps</span>{" "}
            powered by intelligent automation.
          </motion.p>

          {/* Enhanced CTA button */}
          <motion.div variants={itemVariants}>
            <a href="#about">
              <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="group relative mt-8 px-8 py-3 rounded-full bg-primary/10 border border-primary/30 text-primary font-medium overflow-hidden text-sm tracking-wide"
              >
                {/* Gradient border on hover */}
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Button content */}
                <span className="relative flex items-center gap-2">
                  Explore My Work
                  <motion.span
                    animate={{ x: [0, 3, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    ↓
                  </motion.span>
                </span>

                {/* Glow effect */}
                <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl bg-primary/20" />
              </motion.button>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* 3D Canvas */}
      <div className="absolute inset-0 w-full h-full">
        <HeroCanvas />
      </div>

      {/* Enhanced scroll indicator */}
      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center z-10">
        <a href="#about">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="relative w-[35px] h-[64px] rounded-3xl border-2 border-primary/50 flex justify-center items-start p-2 hover:border-primary/80 transition-colors duration-300 group"
          >
            {/* Glow effect on hover */}
            <span className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg bg-primary/30" />

            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
              className="relative w-2 h-2 rounded-full bg-primary group-hover:bg-primary/80 transition-colors duration-300 shadow-lg shadow-primary/50"
            />
          </motion.div>
        </a>
      </div>
    </section>
  )
}

export default Hero
