'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { parallaxLayers } from '@/data/parallax'

/**
 * Adapted from the 21st snippet. Differences:
 *   - no `new Lenis()` — SmoothScroll owns the only instance
 *   - gsap.context() scopes cleanup to this component, so unmounting no longer
 *     kills every ScrollTrigger on the page
 *   - next/image instead of hotlinked <img>, matching the rest of your site
 *   - skips entirely under prefers-reduced-motion
 */
export default function Parallax() {
  const rootRef = useRef(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (reduceMotion) return

    gsap.registerPlugin(ScrollTrigger)

    // gsap.context traps every tween and ScrollTrigger created inside it,
    // so ctx.revert() cleans up only what this component made.
    const ctx = gsap.context(() => {
      const trigger = rootRef.current?.querySelector('[data-parallax-layers]')
      if (!trigger) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger,
          start: '0% 0%',
          end: '100% 0%',
          scrub: 0.5, // was 0 — a little smoothing costs nothing and reads better
          invalidateOnRefresh: true,
        },
      })

      parallaxLayers.forEach((layer, i) => {
        tl.to(
          trigger.querySelectorAll(`[data-parallax-layer="${layer.id}"]`),
          { yPercent: layer.yPercent, ease: 'none' },
          i === 0 ? undefined : '<'
        )
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="parallax" ref={rootRef}>
      <section className="parallax__header">
        <div className="parallax__visuals">
          <div className="parallax__black-line-overflow" />

          <div data-parallax-layers className="parallax__layers">
            {parallaxLayers.map((layer) =>
              layer.type === 'title' ? (
                <div
                  key={layer.id}
                  data-parallax-layer={layer.id}
                  className="parallax__layer-title"
                >
                  <h2 className="parallax__title">{layer.text}</h2>
                </div>
              ) : (
                <Image
                  key={layer.id}
                  src={layer.src}
                  alt=""
                  width={800}
                  height={600}
                  priority
                  data-parallax-layer={layer.id}
                  className="parallax__layer-img"
                />
              )
            )}
          </div>

          <div className="parallax__fade" />
        </div>
      </section>
    </div>
  )
}