"use client"
import { motion } from "framer-motion"
import { projects } from "@/lib/constants"
import { fadeIn, textVariant } from "@/lib/motion"
import SectionWrapper from "./SectionWrapper"
import { Github, ExternalLink } from "lucide-react"
import Image from "next/image"
import ProjectGallery from "./canvas/ProjectGallery"



const Works = () => {
  return (
    <SectionWrapper idName="work">
      <motion.div variants={textVariant() as any} className="mb-8">
        <p className="text-sm uppercase tracking-widest font-medium text-primary/80">Portfolio</p>
        <h2 className="text-foreground font-black lg:text-6xl md:text-5xl sm:text-4xl text-3xl tracking-tight text-gradient">
          Projects.
        </h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1) as any}
          className="mt-4 text-muted-foreground text-[17px] max-w-3xl leading-[30px]"
        >
          Following projects showcase my skills and experience through real-world examples of my work. Each project is
          briefly described with links to code repositories and live demos. It reflects my ability to solve complex
          problems, work with different technologies, and manage projects effectively.
        </motion.p>
      </div>

      <div className="w-full mt-10">
        <ProjectGallery />
      </div>
    </SectionWrapper>
  )
}

export default Works
