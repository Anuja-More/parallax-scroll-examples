"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

export default function Navigation() {
  const pathname = usePathname()
  const isRevealPage = pathname === "/reveal-parallax"
  const isCinematicPage = pathname === "/cinematic-parallax"
  const isPremiumPage = pathname === "/premium-parallax"
  const isLuxuryPage = pathname === "/luxury-parallax"
  const isEtherealPage = pathname === "/ethereal-parallax"

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`navigation ${isRevealPage ? "reveal-nav" : ""} ${isCinematicPage ? "cinematic-nav" : ""} ${isPremiumPage ? "premium-nav" : ""} ${isLuxuryPage ? "luxury-nav" : ""} ${isEtherealPage ? "ethereal-nav" : ""}`}
    >
      <div className="nav-container">
        <Link href="/" className="nav-logo">
          Feline
        </Link>

        <div className="nav-links">
          <Link
            href="/scroll-snap-parallax"
            className={`nav-link ${pathname === "/scroll-snap-parallax" ? "active" : ""}`}
          >
            Classic
          </Link>
          <Link href="/reveal-parallax" className={`nav-link ${pathname === "/reveal-parallax" ? "active" : ""}`}>
            Gallery
          </Link>
          <Link href="/cinematic-parallax" className={`nav-link ${pathname === "/cinematic-parallax" ? "active" : ""}`}>
            Cinematic
          </Link>
          <Link href="/premium-parallax" className={`nav-link ${pathname === "/premium-parallax" ? "active" : ""}`}>
            Premium
          </Link>
          <Link href="/luxury-parallax" className={`nav-link ${pathname === "/luxury-parallax" ? "active" : ""}`}>
            Luxury
          </Link>
          <Link href="/ethereal-parallax" className={`nav-link ${pathname === "/ethereal-parallax" ? "active" : ""}`}>
            Ethereal
          </Link>
        </div>
      </div>
    </motion.nav>
  )
}
