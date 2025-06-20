"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="home-title">Feline Gallery</h1>
          <p className="home-subtitle">Six extraordinary parallax experiences</p>

          <div className="home-buttons">
            <Link href="/scroll-snap-parallax" className="home-button">
              Classic Gallery
            </Link>
            <Link href="/reveal-parallax" className="home-button">
              Reveal Gallery
            </Link>
            <Link href="/cinematic-parallax" className="home-button">
              Cinematic Gallery
            </Link>
            <Link href="/premium-parallax" className="home-button">
              Premium Gallery
            </Link>
            <Link href="/luxury-parallax" className="home-button">
              Luxury Gallery
            </Link>
            <Link href="/ethereal-parallax" className="home-button">
              Ethereal Gallery
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
