/**
 * Converts **bold** markdown segments into React elements.
 * Used for hobby descriptions and AI chat bubbles that were originally
 * rendered via innerHTML string replacement.
 */
export function renderBold(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}
