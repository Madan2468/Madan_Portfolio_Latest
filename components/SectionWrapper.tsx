"use client"

import { motion } from "framer-motion"
import { staggerContainer } from "@/lib/motion"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface SectionWrapperProps {
  children: ReactNode
  idName: string
  className?: string
}

const SectionWrapper = ({ children, idName, className }: SectionWrapperProps) => {
  return (
    <motion.section
      variants={staggerContainer()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className={cn("sm:px-16 px-6 sm:py-16 py-10 max-w-7xl mx-auto relative z-0", className)}
    >
      <span className="hash-span" id={idName}>
        &nbsp;
      </span>
      {children}
    </motion.section>
  )
}

export default SectionWrapper
