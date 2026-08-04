// New file — matches how the rest of your content lives in data/.

/**
 * The 21st snippet hotlinked three .webp files from Osmo's Webflow CDN.
 * Don't ship that: it's someone else's bandwidth, it can disappear without
 * notice, and next/image won't optimise a remote host you haven't allowed
 * in next.config.js.
 *
 * Download them, drop them in public/img/parallax/, and point these at the
 * local copies — or replace them with your own artwork.
 *
 * Layer order matters: 1 is furthest back and moves most, 4 is nearest and
 * moves least. That difference is the whole effect.
 */
// export const parallaxLayers = [
//   { id: '1', type: 'image', src: '/img/parallax/layer-back.webp', yPercent: 70 },
//   { id: '2', type: 'image', src: '/img/parallax/layer-mid.webp', yPercent: 55 },
//   { id: '3', type: 'title', text: 'Rashedul Alam', yPercent: 40 },
//   { id: '4', type: 'image', src: '/img/parallax/layer-front.webp', yPercent: 10 },
// ]
export const parallaxLayers = [
  { id: '1', type: 'image', src: '/img/parallax/layer-back.webp', yPercent: 70 },
  { id: '2', type: 'image', src: '/img/parallax/layer-mid.webp', yPercent: 55 },
  { id: '3', type: 'title', text: 'Rashedul Alam', yPercent: 40 },
  { id: '4', type: 'image', src: '/img/parallax/layer-front.webp', yPercent: 10 },
]
