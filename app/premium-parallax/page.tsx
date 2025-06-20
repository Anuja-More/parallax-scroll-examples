"use client"

import { useEffect, useState } from "react"
import { animated, useSpringValue } from "@react-spring/web"
import Image from "next/image"
import { Heart, Share, Play } from "lucide-react"

const premiumGalleryData = [
  {
    id: 1,
    backgroundImage: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1600&h=1000&fit=crop&crop=center",
    mainImage: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1000&h=750&fit=crop&crop=center",
    title: "Whiskers",
    subtitle: "The Gentle Soul",
    description: "A portrait of quiet elegance and timeless grace.",
    details:
      "Captured in natural light, this image celebrates the serene beauty and gentle nature that defines true companionship.",
    category: "Portrait",
    year: "2024",
  },
  {
    id: 2,
    backgroundImage: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=1600&h=1000&fit=crop&crop=center",
    mainImage: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=1000&h=750&fit=crop&crop=center",
    title: "Amber",
    subtitle: "The Explorer",
    description: "Adventure lives in every glance and every step.",
    details:
      "With eyes that hold stories of distant places and a spirit that knows no boundaries, she embodies the essence of wanderlust.",
    category: "Lifestyle",
    year: "2024",
  },
  {
    id: 3,
    backgroundImage: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1600&h=1000&fit=crop&crop=center",
    mainImage: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1000&h=750&fit=crop&crop=center",
    title: "Luna",
    subtitle: "The Artist",
    description: "Poetry in motion, grace personified.",
    details:
      "Every movement tells a story, every pose captures a moment of pure artistic expression in its most natural form.",
    category: "Fine Art",
    year: "2024",
  },
  {
    id: 4,
    backgroundImage: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=1600&h=1000&fit=crop&crop=center",
    mainImage: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=1000&h=750&fit=crop&crop=center",
    title: "Pearl",
    subtitle: "The Sage",
    description: "Wisdom wrapped in pure, ethereal beauty.",
    details:
      "Like morning light through crystal, she brings clarity and peace to every moment, a living meditation on grace.",
    category: "Portrait",
    year: "2024",
  },
  {
    id: 5,
    backgroundImage: "https://images.unsplash.com/photo-1571566882372-1598d88abd90?w=1600&h=1000&fit=crop&crop=center",
    mainImage: "https://images.unsplash.com/photo-1571566882372-1598d88abd90?w=1000&h=750&fit=crop&crop=center",
    title: "Shadow",
    subtitle: "The Guardian",
    description: "Silent strength, unwavering presence.",
    details:
      "In the quiet moments between day and night, she stands as a gentle guardian, watching over dreams with ancient wisdom.",
    category: "Documentary",
    year: "2024",
  },
]

export default function PremiumParallaxGallery() {
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

      // Update active section
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const section = Math.floor(scrollPosition / windowHeight)
      setActiveSection(Math.min(section, premiumGalleryData.length - 1))
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
      const sections = document.querySelectorAll(".premium-section")
      sections.forEach((section) => observer.observe(section))
    }, 100)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  return (
    <div className="premium-gallery">
      {premiumGalleryData.map((item, index) => (
        <PremiumSection
          key={item.id}
          item={item}
          index={index}
          scrollY={scrollY}
          isVisible={visibleSections.has(index)}
        />
      ))}

      {/* Elegant Progress Indicator */}
      <div className="premium-progress">
        <div className="premium-progress-track">
          {premiumGalleryData.map((_, index) => (
            <div key={index} className={`premium-progress-dot ${index === activeSection ? "active" : ""}`} />
          ))}
        </div>
      </div>
    </div>
  )
}

function PremiumSection({
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
  const isLeft = index % 2 === 0
  const sectionTop = typeof window !== "undefined" ? index * window.innerHeight : 0;

  return (
    <section className="premium-section" data-index={index}>
      {/* Subtle Background Parallax - Apple Style */}
      <animated.div
        style={{
          transform: scrollY.to((y: number) => {
            const progress = (y - sectionTop) / (typeof window !== "undefined" ? window.innerHeight : 1);
            return `translateY(${progress * 30}px)`
          }),
          // opacity: scrollY.to((y: number) => {
          //   const progress = Math.abs((y - sectionTop) / (typeof window !== "undefined" ? window.innerHeight : 1))
          //   return Math.max(0.02, 0.05 - progress * 0.02)
          // }),
          opacity:0.2
        }}
        className="premium-background"
      >
        <Image
          src={item.backgroundImage || "/placeholder.svg"}
          alt={`${item.title} background`}
          fill
          className="premium-bg-image"
          sizes="100vw"
          priority={index === 0}
        />
      </animated.div>

      {/* Content Container */}
      <div className="premium-content">
        <div className="premium-container">
          <div className={`premium-grid ${!isLeft ? "reverse" : ""}`}>
            {/* Text Content */}
            <div className={`premium-text ${isVisible ? "visible" : ""}`}>
              {/* Category Badge */}
              <div className="premium-badge">
                <span className="premium-category">{item.category}</span>
                <span className="premium-year">{item.year}</span>
              </div>

              {/* Main Title */}
              <div className="premium-titles">
                <h1 className="premium-title">{item.title}</h1>
                <p className="premium-subtitle">{item.subtitle}</p>
              </div>

              {/* Description */}
              <p className="premium-description">{item.description}</p>
              <p className="premium-details">{item.details}</p>

              {/* Actions */}
              <div className="premium-actions">
                <button className="premium-button primary">
                  <Play size={16} />
                  <span>View Gallery</span>
                </button>

                <div className="premium-social">
                  <button className="premium-icon-btn">
                    <Heart size={18} />
                  </button>
                  <button className="premium-icon-btn">
                    <Share size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Image Content */}
            <animated.div
              style={{
                transform: scrollY.to((y: number) => {
                  const progress = (y - sectionTop) / window.innerHeight
                  return `translateY(${progress * 20}px)`
                }),
              }}
              className={`premium-image ${isVisible ? "visible" : ""}`}
            >
              <div className="premium-image-container">
                <Image
                  src={item.mainImage || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="premium-main-image"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index === 0}
                />

                {/* Subtle Overlay */}
                <div className="premium-image-overlay" />

                {/* Image Number */}
                <div className="premium-image-number">{String(index + 1).padStart(2, "0")}</div>
              </div>
            </animated.div>
          </div>
        </div>
      </div>
    </section>
  )
}
