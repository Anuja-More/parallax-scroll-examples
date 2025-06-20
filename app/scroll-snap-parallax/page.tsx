"use client"

import { useEffect, useState } from "react"
import { animated, useSpringValue } from "@react-spring/web"
import Image from "next/image"
import { ArrowRight, Heart, Share } from "lucide-react"

const galleryData = [
  {
    id: 1,
    backgroundImage: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1600&h=1000&fit=crop&crop=center",
    mainImage: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=600&fit=crop&crop=center",
    title: "Whiskers",
    subtitle: "The Dreamer",
    description:
      "A gentle soul who finds magic in everyday moments, turning sunbeams into adventures and quiet corners into kingdoms.",
    category: "Portrait",
    year: "2024",
  },
  {
    id: 2,
    backgroundImage: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=1600&h=1000&fit=crop&crop=center",
    mainImage: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800&h=600&fit=crop&crop=center",
    title: "Amber",
    subtitle: "The Explorer",
    description:
      "With eyes like golden honey and a spirit that knows no bounds, every day brings new territories to discover.",
    category: "Lifestyle",
    year: "2024",
  },
  {
    id: 3,
    backgroundImage: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1600&h=1000&fit=crop&crop=center",
    mainImage: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&h=600&fit=crop&crop=center",
    title: "Luna",
    subtitle: "The Artist",
    description:
      "Grace personified, she moves through life like poetry in motion, creating beauty wherever her paws may wander.",
    category: "Fine Art",
    year: "2024",
  },
  {
    id: 4,
    backgroundImage: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=1600&h=1000&fit=crop&crop=center",
    mainImage: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=800&h=600&fit=crop&crop=center",
    title: "Shadow",
    subtitle: "The Guardian",
    description:
      "Silent and wise, a protector of secrets and keeper of midnight stories, watching over dreams with gentle eyes.",
    category: "Documentary",
    year: "2024",
  },
  {
    id: 5,
    backgroundImage: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=1600&h=1000&fit=crop&crop=center",
    mainImage: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=800&h=600&fit=crop&crop=center",
    title: "Pearl",
    subtitle: "The Sage",
    description:
      "Pure wisdom wrapped in soft fur, she brings peace to restless hearts and light to the darkest corners.",
    category: "Portrait",
    year: "2024",
  },
]

export default function EnhancedClassicGallery() {
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

      // Update active section based on scroll position
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const newActiveSection = Math.floor(scrollPosition / windowHeight)
      setActiveSection(Math.min(newActiveSection, galleryData.length - 1))
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
        rootMargin: "0px 0px -15% 0px",
      },
    )

    const timer = setTimeout(() => {
      const sections = document.querySelectorAll(".parallax-section")
      sections.forEach((section) => observer.observe(section))
    }, 100)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  return (
    <div className="gallery-container">
      {/* Gallery Sections */}
      {galleryData.map((item, index) => (
        <ParallaxSection
          key={item.id}
          item={item}
          index={index}
          scrollY={scrollY}
          isVisible={visibleSections.has(index)}
        />
      ))}

      {/* Enhanced Progress Indicator */}
      <div className="progress-indicator">
        {galleryData.map((_, index) => (
          <div key={index} className={`progress-dot ${index === activeSection ? "active" : ""}`} />
        ))}
      </div>
    </div>
  )
}

function ParallaxSection({
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
    <section className="parallax-section" data-index={index}>
      {/* Subtle Background Parallax */}
      <animated.div
        style={{
          transform: scrollY.to((y: number) => {
            const progress = (y - sectionTop) / (typeof window !== "undefined" ? window.innerHeight : 1)
            return `translateY(${progress * 50}px)`
          }),
        }}
        className="parallax-background"
      >
        <Image
          src={item.backgroundImage || "/placeholder.svg"}
          alt={`${item.title} background`}
          fill
          className="parallax-bg-image"
          sizes="100vw"
          priority={index === 0}
        />
      </animated.div>

      {/* Content */}
      <div className="parallax-content">
        <div className="content-container">
          <div className="content-grid">
            {/* Enhanced Content Section */}
            <div className={`content-section ${isVisible ? "visible" : ""}`}>
              {/* Meta */}
              <div className="content-meta">
                <span className="content-category">{item.category}</span>
                <div className="meta-dot" />
                <span className="content-year">{item.year}</span>
              </div>

              {/* Titles */}
              <div className="content-titles">
                <h1 className="content-title">{item.title}</h1>
                <p className="content-subtitle">{item.subtitle}</p>
              </div>

              {/* Description */}
              <p className="content-description">{item.description}</p>

              {/* Actions */}
              <div className="content-actions">
                <a href="#" className="action-button">
                  <span>View Details</span>
                  <ArrowRight size={18} />
                </a>

                <div className="action-icons">
                  <button className="icon-button">
                    <Heart size={18} />
                  </button>
                  <button className="icon-button">
                    <Share size={18} />
                  </button>
                </div>
              </div>

              {/* Section Number */}
              <div className="section-number">
                <span className="section-number-text">{String(index + 1).padStart(2, "0")}</span>
              </div>
            </div>

            {/* Enhanced Image Section */}
            <animated.div
              style={{
                transform: scrollY.to((y: number) => {
                  const progress = (y - sectionTop) / (typeof window !== "undefined" ? window.innerHeight : 1)
                  return `translateY(${progress * 30}px)`
                }),
              }}
              className={`image-section ${isVisible ? "visible" : ""}`}
            >
              <div className="image-container">
                <Image
                  src={item.mainImage || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="main-image"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index === 0}
                />
                <div className="image-overlay" />
              </div>

              {/* Subtle Floating Elements */}
              <animated.div
                style={{
                  transform: scrollY.to((y: number) => {
                    const progress = (y - sectionTop) / (typeof window !== "undefined" ? window.innerHeight : 1)
                    return `translateY(${progress * 20}px) rotate(${progress * 15}deg)`
                  }),
                }}
                className="floating-element floating-element-1"
              />

              <animated.div
                style={{
                  transform: scrollY.to((y: number) => {
                    const progress = (y - sectionTop) / (typeof window !== "undefined" ? window.innerHeight : 1)
                    return `translateY(${progress * -15}px) rotate(${progress * -10}deg)`
                  }),
                }}
                className="floating-element floating-element-2"
              />
            </animated.div>
          </div>
        </div>
      </div>

      {/* Subtle Particles */}
      <SubtleParticleField scrollY={scrollY} sectionTop={sectionTop} />
    </section>
  )
}

function SubtleParticleField({ scrollY, sectionTop }: { scrollY: any; sectionTop: number }) {
  const particles = Array.from({ length: 6 }, (_, i) => i)

  return (
    <div className="particle-field">
      {particles.map((particle) => (
        <animated.div
          key={particle}
          style={{
            transform: scrollY.to((y: number) => {
              const progress = (y - sectionTop) / (typeof window !== "undefined" ? window.innerHeight : 1)
              const speed = 0.03 + Math.random() * 0.05
              return `translateY(${progress * 60 * speed}px)`
            }),
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
          className="particle"
        />
      ))}
    </div>
  )
}
