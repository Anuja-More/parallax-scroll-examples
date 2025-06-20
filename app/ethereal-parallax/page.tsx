"use client"

import { useEffect, useState } from "react"
import { animated, useSpringValue } from "@react-spring/web"
import Image from "next/image"
import { Sparkles, Heart } from "lucide-react"

const etherealGalleryData = [
  {
    id: 1,
    backgroundImage: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1600&h=1000&fit=crop&crop=center",
    mainImage: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1200&h=800&fit=crop&crop=center",
    title: "Whiskers",
    subtitle: "Dreams in Golden Light",
    description: "Where reality meets reverie in perfect harmony.",
    poem: "In gentle light she sits and dreams,\nOf distant lands and silver streams,\nA soul so pure, a heart so bright,\nA beacon in the fading light.",
  },
  {
    id: 2,
    backgroundImage: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=1600&h=1000&fit=crop&crop=center",
    mainImage: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=1200&h=800&fit=crop&crop=center",
    title: "Amber",
    subtitle: "Wanderer of Worlds",
    description: "Through endless realms of wonder she roams.",
    poem: "With eyes that hold the morning sun,\nShe walks where earth and heaven run,\nA traveler of the mystic way,\nForever young, forever fey.",
  },
  {
    id: 3,
    backgroundImage: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1600&h=1000&fit=crop&crop=center",
    mainImage: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1200&h=800&fit=crop&crop=center",
    title: "Luna",
    subtitle: "Moonbeam Dancer",
    description: "Grace flows through her like liquid starlight.",
    poem: "She dances on the silver breeze,\nAmong the whispering willow trees,\nA spirit born of moon and mist,\nBy starlight gently kissed.",
  },
  {
    id: 4,
    backgroundImage: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=1600&h=1000&fit=crop&crop=center",
    mainImage: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=1200&h=800&fit=crop&crop=center",
    title: "Pearl",
    subtitle: "Crystal of Light",
    description: "Pure radiance captured in living form.",
    poem: "Like morning dew on petals white,\nShe glows with inner, sacred light,\nA crystal soul, a pearl divine,\nIn beauty's temple, she's the shrine.",
  },
  {
    id: 5,
    backgroundImage: "https://images.unsplash.com/photo-1571566882372-1598d88abd90?w=1600&h=1000&fit=crop&crop=center",
    mainImage: "https://images.unsplash.com/photo-1571566882372-1598d88abd90?w=1200&h=800&fit=crop&crop=center",
    title: "Shadow",
    subtitle: "Guardian of Mysteries",
    description: "In twilight's embrace, secrets unfold.",
    poem: "When shadows lengthen, day grows old,\nShe keeps the secrets yet untold,\nA guardian of the mystic night,\nBetween the darkness and the light.",
  },
]

export default function EtherealParallaxGallery() {
  const scrollY = useSpringValue(0)
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set())
  const [activeSection, setActiveSection] = useState(0)

  // Reset scroll position on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      scrollY.set(window.scrollY)

      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const section = Math.floor(scrollPosition / windowHeight)
      setActiveSection(Math.min(section, etherealGalleryData.length - 1))
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrollY])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, index]))
          }
        })
      },
      {
        threshold: 0.4,
        rootMargin: "0px 0px -20% 0px",
      },
    )

    const timer = setTimeout(() => {
      const sections = document.querySelectorAll(".ethereal-section")
      sections.forEach((section) => observer.observe(section))
    }, 100)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  return (
    <div className="ethereal-gallery">
      {etherealGalleryData.map((item, index) => (
        <EtherealSection
          key={item.id}
          item={item}
          index={index}
          scrollY={scrollY}
          isVisible={visibleSections.has(index)}
        />
      ))}

      {/* Simplified Progress Indicator */}
      <div className="ethereal-progress">
        {etherealGalleryData.map((_, index) => (
          <div key={index} className={`ethereal-progress-dot ${index === activeSection ? "active" : ""}`} />
        ))}
      </div>

      {/* Subtle Floating Particles */}
      <FloatingParticles scrollY={scrollY} />
    </div>
  )
}

function EtherealSection({
  item,
  index,
  scrollY,
  isVisible,
}: {
  item: any
  index: number
  scrollY: any
  isVisible: boolean
}) {
  const sectionTop = index * (typeof window !== "undefined" ? window.innerHeight : 1)

  return (
    <section className="ethereal-section" data-index={index}>
      {/* Subtle Background */}
      <animated.div
        style={{
          transform: scrollY.to((y: number) => {
            const progress = (y - sectionTop) / (typeof window !== "undefined" ? window.innerHeight : 1)
            return `translateY(${progress * 25}px)`
          }),
          // opacity: scrollY.to((y) => {
          //   const progress = Math.abs((y - sectionTop) / window.innerHeight)
          //   return Math.max(0.01, 0.02 - progress * 0.005)
          // }),
          opacity:0.2
        }}
        className="ethereal-bg"
      >
        <Image
          src={item.backgroundImage || "/placeholder.svg"}
          alt={`${item.title} background`}
          fill
          className="ethereal-bg-image"
          sizes="100vw"
          priority={index === 0}
        />
      </animated.div>

      {/* Content */}
      <div className="ethereal-content">
        <div className="ethereal-container">
          {/* Clean Image */}
          <animated.div
            style={{
              transform: scrollY.to((y: number) => {
                const progress = (y - sectionTop) / (typeof window !== "undefined" ? window.innerHeight : 1)
                const float = Math.sin(progress * Math.PI) * 8
                return `translateY(${progress * 15 + float}px)`
              }),
            }}
            className={`ethereal-image ${isVisible ? "visible" : ""}`}
          >
            <div className="ethereal-image-container">
              <Image
                src={item.mainImage || "/placeholder.svg"}
                alt={item.title}
                fill
                className="ethereal-main-image"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={index === 0}
              />

              {/* Subtle Glow */}
              <div className="ethereal-glow" />
            </div>
          </animated.div>

          {/* Clean Text */}
          <animated.div
            style={{
              transform: scrollY.to((y: number) => {
                const progress = (y - sectionTop) / (typeof window !== "undefined" ? window.innerHeight : 1)
                const float = Math.cos(progress * Math.PI) * 6
                return `translateY(${progress * -10 + float}px)`
              }),
            }}
            className={`ethereal-text ${isVisible ? "visible" : ""}`}
          >
            <div className="ethereal-text-container">
              {/* Title Section */}
              <div className="ethereal-titles">
                <h1 className="ethereal-title">{item.title}</h1>
                <p className="ethereal-subtitle">{item.subtitle}</p>
              </div>

              {/* Description */}
              <p className="ethereal-description">{item.description}</p>

              {/* Poem */}
              <div className="ethereal-poem">
                {item.poem.split("\n").map((line: string, i: number) => (
                  <p key={i} className="ethereal-poem-line">
                    {line}
                  </p>
                ))}
              </div>

              {/* Clean Actions */}
              <div className="ethereal-actions">
                <button className="ethereal-btn primary">
                  <Sparkles size={16} />
                  <span>Experience</span>
                </button>
                <button className="ethereal-btn secondary">
                  <Heart size={16} />
                  <span>Cherish</span>
                </button>
              </div>
            </div>
          </animated.div>
        </div>
      </div>
    </section>
  )
}

function FloatingParticles({ scrollY }: { scrollY: any }) {
  const particles = Array.from({ length: 20 }, (_, i) => i)

  return (
    <div className="ethereal-particles">
      {particles.map((particle) => (
        <animated.div
          key={particle}
          style={{
            transform: scrollY.to((y: number) => {
              const speed = 0.02 + Math.random() * 0.03
              const amplitude = 30 + Math.random() * 50
              const frequency = 0.3 + Math.random() * 0.7
              const translateY = Math.sin(y * frequency * 0.01) * amplitude * speed
              const translateX = Math.cos(y * frequency * 0.007) * amplitude * speed * 0.5
              return `translate(${translateX}px, ${translateY}px)`
            }),
            opacity: scrollY.to((y: number) => {
              const opacity = 0.1 + Math.sin(y * 0.01 + particle) * 0.05
              return Math.max(0.02, opacity)
            }),
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
          }}
          className="ethereal-particle"
        />
      ))}
    </div>
  )
}
