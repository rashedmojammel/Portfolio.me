'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * REPLACES your existing components/layout/SmoothScroll.jsx.
 *
 * Changes from your current version:
 *   - registers ScrollTrigger once, here, instead of in every animated component
 *   - drives ScrollTrigger from GSAP's ticker so Lenis and GSAP share one rAF
 *     loop rather than running two
 *   - exposes the instance so other components never call `new Lenis()`
 *
 * NOTE: import is from 'lenis', not '@studio-freight/lenis'. The scoped package
 * is the old name. Check package.json and remove the scoped one if it's there.
 */

const LenisContext = createContext(null)

export function useLenis() {
  return useContext(LenisContext)
}

export default function SmoothScroll({ children }) {
  const [lenis, setLenis] = useState(null)
  const rafHandler = useRef(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    // Your existing behaviour: skip smooth scroll entirely if asked to.
    // ScrollTrigger still registers so parallax can fall back to native scroll.
    gsap.registerPlugin(ScrollTrigger)

    if (reduceMotion) {
      ScrollTrigger.refresh()
      return
    }

    const instance = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Native momentum on touch feels better than emulated on mobile.
      smoothTouch: false,
    })

    instance.on('scroll', ScrollTrigger.update)

    // One rAF loop for both libraries instead of two competing ones.
    rafHandler.current = (time) => instance.raf(time * 1000)
    gsap.ticker.add(rafHandler.current)
    gsap.ticker.lagSmoothing(0)

    setLenis(instance)
    ScrollTrigger.refresh()

    return () => {
      if (rafHandler.current) gsap.ticker.remove(rafHandler.current)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  )
}