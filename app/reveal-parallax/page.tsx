"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

const revealGalleryData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1571566882372-1598d88abd90?w=1200&h=800&fit=crop&crop=center",
    title: "Midnight Elegance",
    subtitle: "The Night Watcher",
    description:
      "In the quiet hours when the world sleeps, she stands guard with eyes that hold the wisdom of ages, a silhouette against the starlit sky.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=1200&h=800&fit=crop&crop=center",
    title: "Golden Dreams",
    subtitle: "The Sunseeker",
    description:
      "Bathed in warm light, every whisker catches fire with golden radiance, creating a portrait of pure serenity and timeless beauty.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1200&h=800&fit=crop&crop=center",
    title: "Gentle Spirit",
    subtitle: "The Peaceful One",
    description:
      "With eyes like pools of calm water, she embodies tranquility itself, a living meditation on grace and quiet strength.",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=1200&h=800&fit=crop&crop=center",
    title: "Pure Light",
    subtitle: "The Angel",
    description:
      "Like a beam of moonlight made manifest, she moves through the world with ethereal grace, bringing peace wherever she treads.",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=1200&h=800&fit=crop&crop=center",
    title: "Wild Heart",
    subtitle: "The Adventurer",
    description:
      "With a spirit that cannot be tamed and eyes that have seen distant horizons, she carries the essence of freedom in every step.",
  },
]

export default function RevealParallaxGallery() {
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set())

  // Reset scroll position on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      },
    )

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const sections = document.querySelectorAll(".reveal-section")
      sections.forEach((section) => observer.observe(section))
    }, 100)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  return (
    <div className="reveal-gallery">
      {revealGalleryData.map((item, index) => (
        <RevealSection key={item.id} item={item} index={index} isVisible={visibleSections.has(index)} />
      ))}

      {/* Floating Particles */}
      <div className="reveal-particles">
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={i}
            className="reveal-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

function RevealSection({ item, index, isVisible }: { item: any; index: number; isVisible: boolean }) {
  return (
    <section className="reveal-section" data-index={index}>
      <div className="reveal-background" />

      <div className="reveal-content-container">
        <div className={`reveal-content ${isVisible ? "visible" : ""}`}>
          <div className={`reveal-image-container ${isVisible ? "visible" : ""}`}>
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              fill
              className="reveal-main-image"
              sizes="(max-width: 768px) 100vw, 90vw"
              priority={index === 0}
            />

            <div className={`reveal-text-overlay ${isVisible ? "visible" : ""}`}>
              <h1 className="reveal-title">{item.title}</h1>
              <p className="reveal-subtitle">{item.subtitle}</p>
              <p className="reveal-description">{item.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
