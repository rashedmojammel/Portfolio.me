// components/layout/StarField.jsx
//
// Self-contained: styles are injected by the component, so there is nothing
// to append to styles.css. Delete the earlier starfield block from styles.css
// if you already pasted it, or the two will fight.

function makeRandom(seed) {
  return function random() {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const FIELD_WIDTH = 2560
const FIELD_HEIGHT = 2000

// `spread` makes nearer stars physically larger. Previously I scaled the whole
// layer with a transform, which the drift animation overwrote — that was a bug.
function buildStars(count, seed, spread) {
  const random = makeRandom(seed)
  const out = []

  for (let i = 0; i < count; i++) {
    const x = Math.floor(random() * FIELD_WIDTH)
    const y = Math.floor(random() * FIELD_HEIGHT)
    const alpha = (0.35 + random() * 0.65).toFixed(2)
    out.push(`${x}px ${y}px 0 ${spread}px rgba(255,255,255,${alpha})`)
  }

  return out.join(',')
}

const LAYERS = [
  { id: 'far', shadows: buildStars(480, 12345, 0), drift: 220, twinkle: 7 },
  { id: 'mid', shadows: buildStars(160, 67890, 0.5), drift: 140, twinkle: 5 },
  { id: 'near', shadows: buildStars(60, 24680, 1), drift: 80, twinkle: 4 },
]

const CSS = `
.starfield {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}
.starfield__layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 1px;
  height: 1px;
  background: transparent;
  will-change: transform;
}
.starfield__layer::after {
  content: '';
  position: absolute;
  top: ${FIELD_HEIGHT}px;
  left: 0;
  width: 1px;
  height: 1px;
  background: transparent;
  box-shadow: inherit;
}
@keyframes starfield-drift {
  from { transform: translate3d(0, 0, 0); }
  to   { transform: translate3d(0, -${FIELD_HEIGHT}px, 0); }
}
@keyframes starfield-twinkle {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.55; }
}
[data-theme='light'] .starfield__layer,
.light-theme .starfield__layer {
  opacity: 0.2;
  filter: invert(1);
}
@media (max-width: 700px) {
  .starfield__layer--far { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .starfield__layer { animation: none !important; will-change: auto; }
}
`

export default function StarField() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="starfield" aria-hidden="true">
        {LAYERS.map((layer) => (
          <div
            key={layer.id}
            className={`starfield__layer starfield__layer--${layer.id}`}
            style={{
              // Set directly rather than through a CSS custom property —
              // that indirection was the likely point of failure.
              boxShadow: layer.shadows,
              animation: `starfield-drift ${layer.drift}s linear infinite, starfield-twinkle ${layer.twinkle}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>
    </>
  )
}