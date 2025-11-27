"use client"

import { motion } from "framer-motion"
import { services, technologies } from "@/lib/constants"
import { fadeIn, textVariant } from "@/lib/motion"
import SectionWrapper from "./SectionWrapper"
import dynamic from "next/dynamic"
import { Zap, Smartphone, Database, Box, Sparkles, MapPin, Clock, Globe, Code, FileJson, Layout, Server, FileType, Codepen, Music, Download, ExternalLink, Trophy, GraduationCap } from "lucide-react"
import Tilt from "react-parallax-tilt"
import { useCounter } from "@/hooks/useCounter"
import { useEffect, useState } from "react"

const AvatarCanvas = dynamic(() => import("./canvas/AvatarCanvas"), { ssr: false })
const MiniEarth = dynamic(() => import("./canvas/MiniEarth"), { ssr: false })

const iconMap: Record<string, any> = {
  code: Zap,
  smartphone: Smartphone,
  database: Database,
  box: Box,
}

const techIconMap: Record<string, any> = {
  "HTML 5": Layout,
  "CSS 3": FileType,
  "JavaScript": FileJson,
  "TypeScript": Code,
  "React JS": Codepen,
  "Redux Toolkit": Box,
  "Tailwind CSS": Layout,
  "Node JS": Server,
  "MongoDB": Database,
  "Three JS": Box,
}

const AnimatedCounter = ({ end, suffix = "" }: { end: number; suffix?: string }) => {
  const { count, ref } = useCounter(end)
  return <span ref={ref}>{count}{suffix}</span>
}

const TechMarquee = () => {
  return (
    <div className="flex overflow-hidden w-full py-4 mask-linear">
      <div className="flex gap-8 animate-marquee whitespace-nowrap">
        {[...technologies, ...technologies].map((tech, index) => {
          const Icon = techIconMap[tech.name] || Box
          return (
            <div key={`${tech.name}-${index}`} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{tech.name}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const EducationBlock = () => {
  return (
    <div className="flex flex-col justify-between h-full p-6 bg-noise relative overflow-hidden">
      <div className="flex justify-between items-start z-10">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <GraduationCap className="w-5 h-5 text-primary" />
        </div>
        <div className="bg-primary/10 px-3 py-1 rounded-full">
          <span className="text-xs font-medium text-primary">2027</span>
        </div>
      </div>

      <div className="z-10 mt-4">
        <p className="text-xs text-gray-400 mb-1">Pre-final Year Student</p>
        <h4 className="text-sm font-bold text-white leading-tight">Integrated M.Tech + B.Tech CSE</h4>
        <p className="text-xs text-primary mt-1 truncate">JIIT, Noida Sec 62</p>
      </div>

      <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
        <GraduationCap className="w-32 h-32 text-white" />
      </div>
    </div>
  )
}

const AchievementsBlock = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const achievements = [
    {
      title: "Research Paper Accepted",
      subtitle: "at IC3-2025",
      icon: Trophy,
      year: "2025",
      color: "text-yellow-500",
      link: null
    },
    {
      title: "Hacktoberfest 2024",
      subtitle: "5 Merged PRs",
      icon: Code,
      year: "2024",
      color: "text-orange-500",
      link: "https://www.holopin.io/@madan2468#"
    },
    {
      title: "400+ Problems Solved",
      subtitle: "LeetCode, GFG, CodeStudio",
      icon: Zap,
      year: "",
      color: "text-blue-500",
      link: "https://codolio.com/profile/madan13/card"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % achievements.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const current = achievements[currentIndex]
  const Icon = current.icon

  return (
    <div className="flex flex-col justify-between h-full p-6 bg-noise relative overflow-hidden group">
      <div className="flex justify-between items-start z-10">
        <div className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center transition-colors duration-500`}>
          <Icon className={`w-5 h-5 ${current.color}`} />
        </div>
        {current.year && (
          <div className="bg-white/5 px-3 py-1 rounded-full">
            <span className={`text-xs font-medium ${current.color}`}>{current.year}</span>
          </div>
        )}
      </div>

      <div className="z-10 mt-4">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-xs text-gray-400">Achievement</p>
          <div className="flex gap-1">
            {achievements.map((_, i) => (
              <div
                key={i}
                className={`w-1 h-1 rounded-full transition-colors duration-300 ${i === currentIndex ? current.color : 'bg-gray-700'}`}
              />
            ))}
          </div>
        </div>

        <div className="relative h-12">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <h4 className="text-sm font-bold text-white leading-tight mb-1">{current.title}</h4>
            {current.link ? (
              <a
                href={current.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-xs ${current.color} hover:underline flex items-center gap-1`}
              >
                {current.subtitle} <ExternalLink className="w-3 h-3" />
              </a>
            ) : (
              <p className={`text-xs ${current.color} truncate`}>{current.subtitle}</p>
            )}
          </motion.div>
        </div>
      </div>

      <div className="absolute right-0 bottom-0 opacity-5 transform translate-x-1/4 translate-y-1/4 transition-all duration-500">
        <Icon className="w-32 h-32 text-white" />
      </div>
    </div>
  )
}

const About = () => {
  return (
    <SectionWrapper idName="about">
      <motion.div variants={textVariant() as any} className="mb-12 text-center">
        <p className="text-sm uppercase tracking-widest font-medium text-primary/80 flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4" />
          Digital Journey
          <Sparkles className="w-4 h-4" />
        </p>
        <h2 className="text-foreground font-black lg:text-6xl md:text-5xl sm:text-4xl text-3xl tracking-tight text-gradient">
          About Me.
        </h2>
      </motion.div>

      <div className="bento-grid">
        {/* Main Bio Block */}
        <Tilt
          tiltMaxAngleX={5}
          tiltMaxAngleY={5}
          glareEnable={true}
          glareMaxOpacity={0.1}
          glareColor="#8b5cf6"
          glareBorderRadius="1.5rem"
          className="md:col-span-2 md:row-span-2"
        >
          <motion.div
            variants={fadeIn("right", "spring", 0.1, 0.75) as any}
            className="bento-item min-h-[300px] h-full relative overflow-hidden bg-noise"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/10 to-transparent z-0"></div>
            <div className="relative z-10 h-full flex flex-col justify-center pr-32">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full mb-4 w-fit">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-xs text-primary font-medium">Available for work</span>
              </div>
              <h3 className="text-3xl font-black mb-4 text-white">
                Full Stack Developer
              </h3>
              <p className="text-gray-300 leading-relaxed text-base mb-6">
                I am a passionate Full Stack Developer and AI Agent builder with experience creating real-time, scalable applications. I’ve solved 400+ coding problems and enjoy building efficient, impactful digital solutions.
              </p>

              <a
                href="https://drive.google.com/file/d/1rjet2Db3AIm6XP4i9ouhpb89Gv-AExzG/view"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-all duration-300 w-fit overflow-hidden"
              >
                <span className="relative z-10 font-medium flex items-center gap-2">
                  Download Resume <Download className="w-4 h-4" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </a>
            </div>
            <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-60 pointer-events-none">
              <AvatarCanvas />
            </div>
          </motion.div>
        </Tilt>

        {/* Location Block */}
        <Tilt
          tiltMaxAngleX={5}
          tiltMaxAngleY={5}
          glareEnable={true}
          glareMaxOpacity={0.1}
          glareColor="#8b5cf6"
          glareBorderRadius="1.5rem"
          className="md:col-span-1 md:row-span-1"
        >
          <motion.div
            variants={fadeIn("up", "spring", 0.2, 0.75) as any}
            className="bento-item h-full relative overflow-hidden bg-noise p-0"
          >
            <EducationBlock />
          </motion.div>
        </Tilt>

        {/* Music Block */}
        <Tilt
          tiltMaxAngleX={5}
          tiltMaxAngleY={5}
          glareEnable={true}
          glareMaxOpacity={0.1}
          glareColor="#8b5cf6"
          glareBorderRadius="1.5rem"
          className="md:col-span-1 md:row-span-1"
        >
          <motion.div
            variants={fadeIn("up", "spring", 0.25, 0.75) as any}
            className="bento-item h-full relative overflow-hidden bg-noise p-0"
          >
            <AchievementsBlock />
          </motion.div>
        </Tilt>

        {/* Skill Blocks */}
        {services.map((service, index) => {
          const Icon = iconMap[service.icon] || Box
          return (
            <Tilt
              key={service.title}
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              glareEnable={true}
              glareMaxOpacity={0.15}
              glareColor="#8b5cf6"
              glareBorderRadius="1.5rem"
            >
              <motion.div
                variants={fadeIn("up", "spring", index * 0.1 + 0.3, 0.75) as any}
                className="bento-item group h-full cursor-pointer bg-noise"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-primary/10 transition-all duration-300 group-hover:scale-110">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2 text-white group-hover:text-primary transition-colors">{service.title}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{service.description}</p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </motion.div>
            </Tilt>
          )
        })}

        {/* Stats Block */}
        <Tilt
          tiltMaxAngleX={5}
          tiltMaxAngleY={5}
          glareEnable={true}
          glareMaxOpacity={0.1}
          glareColor="#8b5cf6"
          glareBorderRadius="1.5rem"
          className="md:col-span-2"
        >
          <motion.div
            variants={fadeIn("left", "spring", 0.5, 0.75) as any}
            className="bento-item flex-row items-center justify-around bg-gradient-to-r from-primary/10 to-purple-900/10 h-full bg-noise"
          >
            <div className="text-center">
              <h4 className="text-5xl font-black text-primary mb-1">
                <AnimatedCounter end={2} suffix="" />
              </h4>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Internships</p>
            </div>
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
            <div className="text-center">
              <h4 className="text-5xl font-black text-primary mb-1">
                <AnimatedCounter end={30} suffix="+" />
              </h4>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Projects</p>
            </div>
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
            <div className="text-center">
              <h4 className="text-5xl font-black text-primary mb-1">
                <AnimatedCounter end={400} suffix="+" />
              </h4>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Problems Solved</p>
            </div>
          </motion.div>
        </Tilt>

        {/* Tech Marquee Block */}
        <div className="md:col-span-4 bento-item p-0 overflow-hidden bg-noise">
          <TechMarquee />
        </div>
      </div>
    </SectionWrapper>
  )
}

export default About
