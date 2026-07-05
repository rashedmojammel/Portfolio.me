'use client';

import dynamic from 'next/dynamic';

// The AI chat widget is pure client interactivity with no SEO value, so it's
// excluded from the server-rendered HTML entirely (ssr: false) and only
// downloaded/hydrated once the browser is idle-ish — keeping it off the
// critical path for first paint.
const AIChatWidget = dynamic(() => import('./AIChatWidget'), { ssr: false });

export default function AIChatWidgetLoader() {
  return <AIChatWidget />;
}
