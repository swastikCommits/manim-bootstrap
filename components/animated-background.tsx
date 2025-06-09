"use client"

import { motion } from "framer-motion"
import { useMemo } from "react"

export function AnimatedBackground() {
  // Generate floating shapes only once
  const floatingShapes = useMemo(() =>
    Array.from({ length: 6 }).map(() => {
      return {
        width: Math.random() * 300 + 100,
        height: Math.random() * 300 + 100,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
        duration: Math.random() * 10 + 10,
      }
    }),
    []
  )

  // Generate particles only once
  const particles = useMemo(() =>
    Array.from({ length: 20 }).map(() => {
      return {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2,
      }
    }),
    []
  )

  // Generate twinkling stars - reduced from 50 to 25 (50% reduction)
  const stars = useMemo(() =>
    Array.from({ length: 25 }).map(() => {
      // Create three layers for parallax effect
      const layer = Math.floor(Math.random() * 3); // 0, 1, or 2
      const parallaxSpeed = 20 + (layer * 10); // 20, 30, or 40 seconds
      const depth = 1 - (layer * 0.2); // 1, 0.8, or 0.6 opacity based on layer
      
      return {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 5,
        layer,
        parallaxSpeed,
        depth,
      }
    }),
    []
  )

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Floating Shapes */}
      {floatingShapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-gray-400/10 to-gray-600/10 blur-xl"
          style={{
            width: shape.width,
            height: shape.height,
            left: shape.left,
            top: shape.top,
          }}
          animate={{
            x: [0, shape.x],
            y: [0, shape.y],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Particle System */}
      {particles.map((particle, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-gray-300/30 rounded-full"
          style={{
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            y: [0, -100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: particle.delay,
          }}
        />
      ))}

      {/* Twinkling Stars with Parallax */}
      {stars.map((star, i) => (
        <motion.div
          key={`star-${i}`}
          className={`absolute rounded-full bg-white ${star.layer > 0 ? 'blur-[0.5px]' : ''}`}
          style={{
            width: star.size,
            height: star.size,
            left: star.left,
            top: star.top,
            opacity: star.depth * 0.7, // Reduced opacity
          }}
          animate={{
            opacity: [star.depth * 0.5, star.depth * 0.7, star.depth * 0.5],
            scale: [0.8, 1.2, 0.8],
            x: [0, star.layer * 10, 0], // Subtle horizontal parallax based on layer
          }}
          transition={{
            opacity: {
              duration: star.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: star.delay,
              ease: "easeInOut",
            },
            scale: {
              duration: star.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: star.delay,
              ease: "easeInOut",
            },
            x: {
              duration: star.parallaxSpeed,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }
          }}
        />
      ))}
    </div>
  )
}
