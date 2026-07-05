'use client';

import { useEffect, useState } from 'react';

/**
 * Cycles through `roles`, typing and deleting each one.
 * Mirrors the typing effect originally in scirpt.js.
 */
export default function useTypingRoles(roles) {
  const [text, setText] = useState('');

  useEffect(() => {
    let rI = 0, cI = 0, deleting = false, timeoutId;

    function tick() {
      const cur = roles[rI];
      cI = deleting ? cI - 1 : cI + 1;
      setText(cur.slice(0, cI));

      if (!deleting && cI === cur.length) {
        deleting = true;
        timeoutId = setTimeout(tick, 2000);
        return;
      }
      if (deleting && cI === 0) {
        deleting = false;
        rI = (rI + 1) % roles.length;
        timeoutId = setTimeout(tick, 400);
        return;
      }
      timeoutId = setTimeout(tick, deleting ? 36 : 72);
    }

    timeoutId = setTimeout(tick, 1000);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return text;
}
