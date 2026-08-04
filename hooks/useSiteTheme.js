'use client'

import { useEffect, useState } from 'react'

/**
 * Reads the theme your existing toggle already sets, so we don't need
 * next-themes and don't have two competing sources of truth.
 *
 * It checks, in order:
 *   1. data-theme="light|dark" on <html> or <body>
 *   2. a light/dark class on <html> or <body>
 *   3. the OS preference
 *
 * IMPORTANT: open components/layout/Header.jsx, find your theme toggle, and
 * make sure the attribute/class it writes is one of the ones below. If it
 * uses a different name, add it to the checks.
 */

const LIGHT_CLASSES = ['light-theme', 'light-mode', 'light']
const DARK_CLASSES = ['dark-theme', 'dark-mode', 'dark']

function readTheme() {
  if (typeof document === 'undefined') return 'dark'

  const targets = [document.documentElement, document.body].filter(Boolean)

  for (const el of targets) {
    const attr = el.getAttribute('data-theme')
    if (attr === 'light' || attr === 'dark') return attr
  }

  for (const el of targets) {
    if (LIGHT_CLASSES.some((c) => el.classList.contains(c))) return 'light'
    if (DARK_CLASSES.some((c) => el.classList.contains(c))) return 'dark'
  }

  return window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark'
}

export default function useSiteTheme() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const sync = () => setTheme(readTheme())
    sync()

    const observer = new MutationObserver(sync)
    const config = { attributes: true, attributeFilter: ['class', 'data-theme'] }

    observer.observe(document.documentElement, config)
    if (document.body) observer.observe(document.body, config)

    const media = window.matchMedia('(prefers-color-scheme: light)')
    media.addEventListener('change', sync)

    return () => {
      observer.disconnect()
      media.removeEventListener('change', sync)
    }
  }, [])

  return theme
}