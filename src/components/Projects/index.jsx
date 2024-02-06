import { useState, useEffect } from "react"
import "./style.css"
import BackgroundLines from "../BackgroundLines"
import WorkCard from "../WorkCard"
import ScrambleText from "../ScrambleText"
import ParaWriting from "../ParaWriting"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

import aisaas from "../../assets/Images/aisaas.png"
import twitter_clone from "../../assets/Images/twitter_clone.png"
import netflix_clone from "../../assets/Images/netflix_clone.png"

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
      year: "2024",
      img: aisaas,
      title: "Full Stack AI SaaS Platform Clone",
      detail: "Created a full stack AI SaaS Platform with chat, image, video, music, and code generation that offers a free and paid tier.",
      url: "https://ai-saas-nine-delta.vercel.app",
      url2: "https://github.com/adam-gill/ai-saas",

    },
    {
      client: "Personal Project",
      year: "2024",
      img: twitter_clone,
      title: "Full Stack Twitter Clone",
      detail: "Developed a fullstack X (Twitter) clone that allows users to create accounts, make posts, like posts, comment on posts, and follow any user on the platform.",
      url: "https://bird-clone-beige.vercel.app",
      url2: "https://github.com/adam-gill/twitter-clone"
    },
    {
      client: "Personal project",
      year: "2023",
      img: netflix_clone,
      title: "Full Stack Netflix Clone",
      detail: "Built a fullstack Netflix clone with Next.js, React.js, Tailwind CSS, Prisma, MongoDB, NextAuth, and Vercel. Includes authorization, user, movie, and favorites storage, and a built in video player.",
      url: "https://test-murex-pi.vercel.app/auth",
      url2: "https://github.com/adam-gill/netflix-clone"
    },
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
