'use client'

import { useEffect, useState } from 'react'

/**
 * Your globals.css already flattens CSS animations for reduced-motion users,
 * but the icon cloud spins on a <canvas> — CSS can't reach it. This hook lets
 * the component stop the rotation itself.
 */
export default function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(media.matches)

    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  return reduced
}