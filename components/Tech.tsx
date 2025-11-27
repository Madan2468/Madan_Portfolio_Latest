"use client"

import type React from "react"
import SectionWrapper from "./SectionWrapper"
import { technologies } from "@/lib/constants"
import { motion } from "framer-motion"
import { fadeIn, textVariant } from "@/lib/motion"
import { FileCode, FileType, Database, Server, Cpu, Globe, Layout, Layers, Box } from "lucide-react"
import TechCloud from "./canvas/TechCloud"



const Tech = () => {
  return (
    <SectionWrapper idName="tech">
      <motion.div variants={textVariant() as any} className="text-center mb-8">
        <p className="text-sm uppercase tracking-widest font-medium text-primary/80">Tech Stack</p>
        <h2 className="text-foreground font-black lg:text-6xl md:text-5xl sm:text-4xl text-3xl tracking-tight text-gradient mx-auto">
          Technologies.
        </h2>
      </motion.div>

      <div className="w-full mt-20">
        <TechCloud />
      </div>
    </SectionWrapper>
  )
}

export default Tech
