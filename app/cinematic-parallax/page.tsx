"use client";

import { useEffect, useState } from "react";
import { animated, useSpringValue } from "@react-spring/web";
import Image from "next/image";

const cinematicGalleryData = [
  {
    id: 1,
    backgroundImage:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&h=1000&fit=crop&crop=center",
    mainImage:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop&crop=center",
    title: "Forest Walker",
    subtitle: "Into the Wild",
    description:
      "Where ancient trees whisper secrets and every step leads deeper into nature's cathedral, she finds solace in the embrace of the wilderness.",
    number: "01",
  },
  {
    id: 2,
    backgroundImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=1000&fit=crop&crop=center",
    mainImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop&crop=center",
    title: "Mountain Soul",
    subtitle: "Peak Seeker",
    description:
      "Standing at the edge of infinity, where earth meets sky, he discovers that the greatest journeys begin with a single step toward the unknown.",
    number: "02",
  },
  {
    id: 3,
    backgroundImage:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&h=1000&fit=crop&crop=center",
    mainImage:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=800&fit=crop&crop=center",
    title: "Lake Dreamer",
    subtitle: "Reflection Seeker",
    description:
      "In the mirror of still waters, surrounded by towering peaks, she finds the perfect balance between adventure and contemplation.",
    number: "03",
  },
  {
    id: 4,
    backgroundImage:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1600&h=1000&fit=crop&crop=center",
    mainImage:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=800&fit=crop&crop=center",
    title: "Canyon Explorer",
    subtitle: "Desert Wanderer",
    description:
      "Through carved stone and painted cliffs, where time itself is written in layers of rock, he walks the path of ancient stories.",
    number: "04",
  },
  {
    id: 5,
    backgroundImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=1000&fit=crop&crop=center",
    mainImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop&crop=center",
    title: "Summit Seeker",
    subtitle: "Sky Touched",
    description:
      "Above the clouds, where the air is thin and dreams are infinite, she stands witness to the world spread out like a living map below.",
    number: "05",
  },
];

export default function CinematicParallaxGallery() {
  const scrollY = useSpringValue(0);
  const [visibleSections, setVisibleSections] = useState<Set<number>>(
    new Set()
  );

  // Reset scroll position on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      scrollY.set(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number.parseInt(
            entry.target.getAttribute("data-index") || "0"
          );
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, index]));
          }
        });
      },
      {
        threshold: 0.4,
        rootMargin: "0px 0px -20% 0px",
      }
    );

    const timer = setTimeout(() => {
      const sections = document.querySelectorAll(".cinematic-section");
      sections.forEach((section) => observer.observe(section));
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="cinematic-gallery">
      {cinematicGalleryData.map((item, index) => (
        <CinematicSection
          key={item.id}
          item={item}
          index={index}
          scrollY={scrollY}
          isVisible={visibleSections.has(index)}
        />
      ))}
    </div>
  );
}

function CinematicSection({
  item,
  index,
  scrollY,
  isVisible,
}: {
  item: any;
  index: number;
  scrollY: any;
  isVisible: boolean;
}) {
  const isLeft = index % 2 === 0;
  const sectionTop =
    typeof window !== "undefined" ? index * window.innerHeight : 0;
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const textTransform = scrollY.to((y: number) => {
    const progress = (y - sectionTop) / (typeof window !== "undefined" ? window.innerHeight : 1);

    if (isMobile) {
      // Mobile: slide text vertically with fade-in
      const translateY = Math.min(Math.max(progress * 50, -50), 50); // limit movement
      return `translateY(${translateY}px)`;
    } else {
      // Desktop: slide text left or right
      const translateX = Math.min(
        Math.max(progress * (isLeft ? -40 : 40), -80),
        80
      ); // clamp to prevent overshoot
      return `translateX(${translateX}px)`;
    }
  });
  return (
    <section className="cinematic-section" data-index={index}>
      {/* Cinematic Background with Dramatic Parallax */}
      <animated.div
        style={{
          transform: scrollY.to((y: number) => {
            const progress = (y - sectionTop) / (typeof window !== "undefined" ? window.innerHeight : 1);
            const scale = 1 + Math.abs(progress) * 0.2;
            const translateY = progress * 150;
            return `translateY(${translateY}px) scale(${scale})`;
          }),
          opacity: scrollY.to((y: number) => {
            const progress = Math.abs((y - sectionTop) / (typeof window !== "undefined" ? window.innerHeight : 1));
            return Math.max(0.1, 1 - progress * 0.5);
          }),
        }}
        className="cinematic-background"
      >
        <Image
          src={item.backgroundImage || "/placeholder.svg"}
          alt={`${item.title} background`}
          fill
          className="cinematic-bg-image"
          sizes="100vw"
          priority={index === 0}
        />
      </animated.div>

      {/* Mobile-Optimized Cinematic Content */}
      <div className="cinematic-content-wrapper">
        <div className={`cinematic-content ${!isLeft ? "reverse" : ""}`}>
          {/* Text Section with Staggered Animation */}
          <animated.div
            style={{
              transform: textTransform,
            }}
            className={`cinematic-text ${isVisible ? "visible" : ""}`}
          >
            <div className="cinematic-number">{item.number}</div>
            <h1 className="cinematic-title">{item.title}</h1>
            <p className="cinematic-subtitle">{item.subtitle}</p>
            <p className="cinematic-description">{item.description}</p>
          </animated.div>

          {/* Image Section with Enhanced Zoom Animation */}
          <animated.div
            style={{
              transform: scrollY.to((y: number) => {
                const progress = (y - sectionTop) / (typeof window !== "undefined" ? window.innerHeight : 1);
                const translateY = progress * 50;
                return `translateY(${translateY}px)`;
              }),
            }}
            className={`cinematic-image ${isVisible ? "visible" : ""}`}
          >
            <div className="cinematic-image-container">
              <animated.div
                style={{
                  transform: scrollY.to((y: number) => {
                    const progress = (y - sectionTop) / (typeof window !== "undefined" ? window.innerHeight : 1);
                    // Start zoomed in (1.2x), zoom out to normal (1x) as it comes into view
                    const scale = 1.2 - Math.abs(progress) * 0.2;
                    return `scale(${Math.max(scale, 1)})`;
                  }),
                }}
                className="cinematic-image-inner"
              >
                <Image
                  src={item.mainImage || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="cinematic-main-image"
                  sizes="(max-width: 768px) 100vw, 60vw"
                  priority={index === 0}
                />
              </animated.div>
              <div className="cinematic-image-hover-overlay" />
              <div className="cinematic-glow" />
            </div>
          </animated.div>
        </div>
      </div>
    </section>
  );
}
