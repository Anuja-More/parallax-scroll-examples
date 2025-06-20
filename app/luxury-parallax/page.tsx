"use client"

import { useEffect, useState } from "react"
import { animated, useSpringValue } from "@react-spring/web"
import Image from "next/image"
// import { Eye, Bookmark, Download } from "lucide-react"

const luxuryGalleryData = [
  {
    id: 1,
    backgroundImage: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1600&h=1000&fit=crop&crop=center",
    mainImage: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1200&h=800&fit=crop&crop=center",
    title: "Whiskers",
    subtitle: "The Contemplative",
    description: "In quiet moments of reflection, true beauty reveals itself.",
    details:
      "A study in natural elegance, captured in the golden hour when light becomes poetry and shadows dance with grace.",
    category: "Fine Art",
    year: "2024",
    edition: "Limited Edition",
    price: "Available upon request",
  },
  {
    id: 2,
    backgroundImage: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=1600&h=1000&fit=crop&crop=center",
    mainImage: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=1200&h=800&fit=crop&crop=center",
    title: "Amber",
    subtitle: "The Wanderer",
    description: "Every journey begins with a single, curious glance.",
    details:
      "Captured in a moment of pure wonder, this portrait embodies the spirit of exploration and the beauty of discovery.",
    category: "Portrait",
    year: "2024",
    edition: "Artist's Choice",
    price: "Exclusive Collection",
  },
  {
    id: 3,
    backgroundImage: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1600&h=1000&fit=crop&crop=center",
    mainImage: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1200&h=800&fit=crop&crop=center",
    title: "Luna",
    subtitle: "The Muse",
    description: "Where art meets nature in perfect harmony.",
    details: "An ethereal composition that captures the delicate balance between strength and grace, light and shadow.",
    category: "Contemporary",
    year: "2024",
    edition: "Signature Series",
    price: "Premium Collection",
  },
  {
    id: 4,
    backgroundImage: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=1600&h=1000&fit=crop&crop=center",
    mainImage: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=1200&h=800&fit=crop&crop=center",
    title: "Pearl",
    subtitle: "The Luminous",
    description: "Pure light captured in its most elegant form.",
    details:
      "A masterpiece of minimalist beauty, where every element serves to highlight the subject's natural radiance.",
    category: "Minimalist",
    year: "2024",
    edition: "Curator's Select",
    price: "Gallery Exclusive",
  },
  {
    id: 5,
    backgroundImage: "https://images.unsplash.com/photo-1571566882372-1598d88abd90?w=1600&h=1000&fit=crop&crop=center",
    mainImage: "https://images.unsplash.com/photo-1571566882372-1598d88abd90?w=1200&h=800&fit=crop&crop=center",
    title: "Shadow",
    subtitle: "The Enigmatic",
    description: "In darkness, we find the most profound truths.",
    details: "A sophisticated study in contrast and mystery, revealing beauty in the interplay of light and shadow.",
    category: "Dramatic",
    year: "2024",
    edition: "Master's Edition",
    price: "Private Collection",
  },
]

export default function LuxuryParallaxGallery() {
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
      setActiveSection(Math.min(section, luxuryGalleryData.length - 1))
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
        threshold: 0.5,
        rootMargin: "0px 0px -20% 0px",
      },
    )

    const timer = setTimeout(() => {
      const sections = document.querySelectorAll(".luxury-section")
      sections.forEach((section) => observer.observe(section))
    }, 100)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  return (
    <div className="luxury-gallery">
      {luxuryGalleryData.map((item, index) => (
        <LuxurySection
          key={item.id}
          item={item}
          index={index}
          scrollY={scrollY}
          isVisible={visibleSections.has(index)}
        />
      ))}

      {/* Luxury Progress Indicator */}
      <div className="luxury-progress">
        <div className="luxury-progress-container">
          <div className="luxury-progress-line">
            <animated.div
              style={{
                height: scrollY.to((y) => {
                  const progress = y / (window.innerHeight * luxuryGalleryData.length)
                  return `${Math.min(progress * 100, 100)}%`
                }),
              }}
              className="luxury-progress-fill"
            />
          </div>
          <div className="luxury-progress-dots">
            {luxuryGalleryData.map((_, index) => (
              <div key={index} className={`luxury-progress-dot ${index === activeSection ? "active" : ""}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function LuxurySection({
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
    <section className="luxury-section" data-index={index}>
      {/* Ultra-subtle Background */}
      <animated.div
        style={{
          transform: scrollY.to((y: number) => {
            const progress = (y - sectionTop) / (typeof window !== "undefined" ? window.innerHeight : 1)
            return `translateY(${progress * 20}px)`
          }),
          // opacity: scrollY.to((y: number) => {
          //   const progress = Math.abs((y - sectionTop) / window.innerHeight)
          //   return Math.max(0.01, 0.03 - progress * 0.01)
          // }),
          opacity:0.2
        }}
        className="luxury-background"
      >
        <Image
          src={item.backgroundImage || "/placeholder.svg"}
          alt={`${item.title} background`}
          fill
          className="luxury-bg-image"
          sizes="100vw"
          priority={index === 0}
        />
      </animated.div>

      {/* Main Content */}
      <div className="luxury-content">
        <div className="luxury-container">
          {/* Mobile-First Card Container */}
          <div className={`luxury-card ${isVisible ? "visible" : ""}`}>
            {/* Image Section */}
            <animated.div
              style={{
                transform: scrollY.to((y: number) => {
                  const progress = (y - sectionTop) / window.innerHeight
                  return `translateY(${progress * 15}px)`
                }),
              }}
              className="luxury-image-section"
            >
              <div className="luxury-image-container">
                <Image
                  src={item.mainImage || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="luxury-main-image"
                  sizes="(max-width: 768px) 100vw, 60vw"
                  priority={index === 0}
                />
                <div className="luxury-image-overlay" />

                {/* Simplified Action Buttons for Mobile */}
                {/* <div className="luxury-image-actions">
                  <button className="luxury-action-btn">
                    <Eye size={16} />
                  </button>
                  <button className="luxury-action-btn">
                    <Bookmark size={16} />
                  </button>
                  <button className="luxury-action-btn">
                    <Download size={16} />
                  </button>
                </div> */}
              </div>
            </animated.div>

            {/* Text Section */}
            <div className="luxury-text-section">
              {/* Header */}
              <div className="luxury-header">
                <div className="luxury-meta">
                  <span className="luxury-category">{item.category}</span>
                  <span className="luxury-edition">{item.edition}</span>
                </div>
                <div className="luxury-number">{String(index + 1).padStart(2, "0")}</div>
              </div>

              {/* Main Content */}
              <div className="luxury-main-content">
                <div className="luxury-titles">
                  <h1 className="luxury-title">{item.title}</h1>
                  <p className="luxury-subtitle">{item.subtitle}</p>
                </div>

                <p className="luxury-description">{item.description}</p>
                <p className="luxury-details">{item.details}</p>

                {/* Pricing */}
                <div className="luxury-pricing">
                  <span className="luxury-price">{item.price}</span>
                  <span className="luxury-year">{item.year}</span>
                </div>

                {/* Actions */}
                <div className="luxury-actions">
                  <button className="luxury-primary-btn">Inquire Now</button>
                  <button className="luxury-secondary-btn">View Collection</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
