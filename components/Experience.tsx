"use client"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { experiences } from "@/lib/constants"
import { textVariant } from "@/lib/motion"
import SectionWrapper from "./SectionWrapper"
import { Calendar, ChevronDown, Code2 } from "lucide-react"
import { useRef, useState, memo } from "react"
import dynamic from "next/dynamic"

const TimelineIcon = dynamic(() => import("./canvas/TimelineIcon"), { ssr: false })

const GlitchText = ({ text }: { text: string }) => {
  return (
    <div className="glitch-wrapper">
      <h3 className="text-white text-xl font-bold glitch group-hover:before:block group-hover:after:block" data-text={text}>
        {text}
      </h3>
    </div>
  )
}

const ExperienceCard = memo(({ experience, index }: { experience: any; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const isEven = index % 2 === 0

  return (
    <div className={`flex justify-between items-start w-full mb-12 ${isEven ? "flex-row-reverse" : "flex-row"}`}>
      <div className="w-5/12 hidden md:block"></div>

      <div className="z-20 flex items-center justify-center order-1 bg-primary/10 shadow-xl w-12 h-12 rounded-full border-2 border-primary/50 relative backdrop-blur-sm">
        <div className="absolute inset-0 rounded-full animate-ping bg-primary opacity-20"></div>
        <div className="w-full h-full">
          <TimelineIcon icon={experience.icon} />
        </div>
      </div>

      <motion.div
        layout
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
        className="w-full md:w-5/12 holographic-card p-6 rounded-2xl relative group cursor-pointer overflow-hidden"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="snake-border"></div>
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur opacity-10 group-hover:opacity-30 transition duration-500"></div>

        <div className="relative z-10">
          <div className="flex flex-col gap-1 mb-4">
            <div className="flex justify-between items-start">
              <GlitchText text={experience.title} />
              <ChevronDown className={`w-5 h-5 text-primary transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
            </div>
            <p className="text-primary font-medium text-base">{experience.company_name}</p>
            <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
              <Calendar className="w-4 h-4" />
              <span>{experience.date}</span>
            </div>
          </div>

          <ul className="space-y-2 mb-4">
            {experience.points.slice(0, isExpanded ? undefined : 2).map((point: string, idx: number) => (
              <li key={`experience-point-${idx}`} className="text-gray-300 text-sm pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-primary before:rounded-full">
                {point}
              </li>
            ))}
          </ul>

          {!isExpanded && experience.points.length > 2 && (
            <p className="text-xs text-primary/60 italic mt-2">Click to read more...</p>
          )}

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-white/10 scanline-text"
              >
                <div className="flex items-center gap-2 mb-3 text-sm text-primary font-medium">
                  <Code2 className="w-4 h-4" />
                  <span>Tech Stack Hologram</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {experience.tech?.map((tech: string, idx: number) => (
                    <span key={idx} className="px-3 py-1 text-xs rounded-full bg-primary/10 border border-primary/20 text-gray-300 hover:bg-primary/20 hover:text-white transition-colors">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
})

const Experience = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <SectionWrapper idName="experience">
      <motion.div variants={textVariant() as any} className="mb-16 text-center relative z-10">
        <p className="text-sm uppercase tracking-widest font-medium text-primary/80">My Journey</p>
        <h2 className="text-foreground font-black lg:text-6xl md:text-5xl sm:text-4xl text-3xl tracking-tight text-gradient">
          Professional Timeline.
        </h2>
      </motion.div>

      <div className="relative w-full mx-auto max-w-7xl" ref={ref}>
        {/* Parallax Background Effect */}
        <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary to-transparent opacity-20"></div>
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary to-transparent opacity-20"></div>
        </div>

        {/* Central Beam */}
        <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full bg-white/5 rounded-full overflow-hidden z-0">
          <motion.div
            style={{ height }}
            className="w-full bg-gradient-to-b from-primary via-purple-500 to-primary animate-beam shadow-[0_0_20px_rgba(139,92,246,0.8)]"
          />
        </div>

        <div className="flex flex-col gap-10 pl-12 md:pl-0">
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} index={index} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

export default Experience
