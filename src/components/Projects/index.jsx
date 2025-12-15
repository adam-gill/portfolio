import { useState, useEffect } from "react"
import "./style.css"
import BackgroundLines from "../BackgroundLines"
import WorkCard from "../WorkCard"
import ScrambleText from "../ScrambleText"
import ParaWriting from "../ParaWriting"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

import filegilla from "../../assets/Images/filegilla.png"
import bitlance from "../../assets/Images/bitlance.png"
import litstream from "../../assets/Images/litstream.png"
import aisaas from "../../assets/Images/aisaas.png"

export default function Projects() {
  const controls = useAnimation()
  const [ref, inView] = useInView()
  const [hasAnimated, setHasAnimated] = useState(false)

  const handleComplete = () => {
    setHasAnimated(true)
  }

  useEffect(() => {
    // Start animation when the component is in view
    if (inView && !hasAnimated) {
      controls.start("visible")
    }
  }, [inView, controls])

  const works = [
    {
      client: "Personal Project",
      year: "2025",
      img: filegilla,
      title: "filegilla",
      detail: "Developed a Next.js cloud storage platform where you can store files, share files with friends, and edit documents directly on the website with my rich text editor.",
      url: "https://filegilla.com",
      url2: "https://github.com/adam-gill/filegilla"
    },
    {
      client: "Personal Project",
      year: "2024",
      img: litstream,
      title: "LitStream",
      detail: "Developed a scalable Next.js SaaS platform with RESTful APIs for book summaries and audio content, featuring a responsive UI, Firebase integration for auth and storage, and Stripe for subscriptions, optimizing user learning efficiency.",
      url: "https://litstream-neon.vercel.app/",
      url2: "https://github.com/adam-gill/litstream"
    },
    {
      client: "Personal project",
      year: "2024",
      img: bitlance,
      title: "BitLance",
      detail: "Engineered a blockchain-based freelance platform with drastically reduced fees and holding times, featuring NextAuth/Supabase authentication and Solidity smart contracts on Mode Network for secure Ethereum payouts.",
      url: "https://bitlance-cwha.vercel.app/",
      url2: "https://github.com/adam-gill/bitlance"
    },
    {
      client: "Personal Project",
      year: "2024",
      img: aisaas,
      title: "Genius AI",
      detail: "Created a full stack AI SaaS Platform with chat, image, video, music, and code generation that offers a free and paid tier.",
      url: "https://ai-saas-nine-delta.vercel.app",
      url2: "https://github.com/adam-gill/ai-saas",

    }
  ]


  const opacityVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  return (
    <section ref={ref} className="projects" id="projects">
      <BackgroundLines />
      <div className="background--glow"></div>

      <div className="projects--grid">
        <motion.div initial="hidden" animate={controls} variants={opacityVariant} transition={{ duration: 1, delay: 0.5 }} className="projects--grid--title">
          <h3 className="theme--text">
            <ScrambleText shuffle delay={0.5}>
              03
            </ScrambleText>{" "}
            <span className="hash">{"//"}</span>{" "}
            <ScrambleText shuffle delay={0.5}>
              Expertise
            </ScrambleText>
          </h3>
        </motion.div>

        <div className="projects--grid--content">
          <div className="projects--grid--content--heading">
            <h2>
              <ParaWriting stagger={0.08} text={"My "} sec={"Projects"} />
            </h2>
          </div>
          <div className="projects--grid--content--works">
            {works.map((item, index) => {
              return (
                <WorkCard
                  item={item}
                  key={index}
                  // delay={0.1 * index + 1}
                  // controls={controls}
                />
              )
            })}
          </div>
        </div>

        <motion.div initial="hidden" animate={controls} variants={opacityVariant} transition={{ duration: 1, delay: 1 }} onAnimationComplete={() => handleComplete()} className="projects--grid--detail">
          <p className="theme--detail">
            <ScrambleText delay={1}>Walk yourself through my portfolio that I spent countless hours building and perfecting.</ScrambleText>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
