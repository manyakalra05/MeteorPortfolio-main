import { useState, useEffect, useRef, useCallback } from "react";

/* ---------------------------------------------------------------
   Waypoints (vw/vh) — corners + edge midpoints, clear of a ~64px navbar
----------------------------------------------------------------*/
const WAYPOINTS = [
  { x: 6, y: 18 },
  { x: 94, y: 18 },
  { x: 6, y: 88 },
  { x: 94, y: 88 },
  { x: 50, y: 12 },
  { x: 50, y: 90 },
  { x: 4, y: 55 },
  { x: 96, y: 55 },
];

const QUIPS = [
  "Houston, we have a high-five.",
  "Just doing my orbit \u2728",
  "Gravity? Never heard of her.",
  "Collecting stardust...",
  "Mission status: looking cool.",
  "This view never gets old.",
  "Beep boop, hello there!",
  "Docking procedure: successful.",
];

const CAUGHT_MESSAGES = [
  "Whoa, okay — you caught me!",
  "Nice reflexes, commander.",
  "You win this round.",
  "Careful, I'm not weightless here.",
  "Systems captured. Release me?",
  "Fine, you can carry me.",
];

const FLIGHT_MS = 2200;
const SPRITE_W = 46; // overall size — was 64
const SPRITE_H = 52; // was 72, same aspect ratio (viewBox stays 64x72)
const FLEE_RADIUS = 90; // px — cursor closer than this makes it bolt
const LOOK_RADIUS = 280; // px — cursor closer than this and it "looks" toward you
const DRAG_THRESHOLD = 6; // px of movement before a pointerdown counts as a drag, not a click

const PALETTES = {
  dark: {
    suit: "#f4f4f5",
    suitStroke: "#a1a1aa",
    panel: "#8b5cf6",
    arm: "#f4f4f5",
    leg: "#e4e4e7",
    pack: "#c4b5fd",
    visorFrom: "#e9d5ff",
    visorTo: "#7c3aed",
    flameFrom: "#a78bfa",
    flameTo: "#f97316",
    bubbleBg: "#18181b",
    bubbleBorder: "#8b5cf6",
    bubbleText: "#f4f4f5",
    glow: "rgba(139, 92, 246, 0.35)",
  },
  light: {
    suit: "#ffffff",
    suitStroke: "#000000",
    panel: "#7c3aed",
    arm: "#f8fafc",
    leg: "#e2e8f0",
    pack: "#c4b5fd",
    visorFrom: "#dbeafe",
    visorTo: "#2563eb",
    flameFrom: "#fb923c",
    flameTo: "#facc15",
    bubbleBg: "#ffffff",
    bubbleBorder: "#7c3aed",
    bubbleText: "#1e1b2e",
    glow: "rgba(124, 58, 237, 0.25)",
  },
};

// Detects the `dark` class on <html>, matching ThemeToggle.jsx's strategy.
function useDetectedTheme() {
  const [theme, setTheme] = useState(() =>
    typeof document !== "undefined" && document.documentElement.classList.contains("dark")
      ? "dark"
      : "light"
  );

  useEffect(() => {
    const root = document.documentElement;
    const update = () => setTheme(root.classList.contains("dark") ? "dark" : "light");
    update();
    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return theme;
}

function AstronautSprite({ theme, flying, uid }) {
  const c = PALETTES[theme];
  const flameId = `flame-${uid}`;
  const visorId = `visor-${uid}`;

  return (
    <svg width={SPRITE_W} height={SPRITE_H} viewBox="0 0 64 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      {flying && (
        <ellipse
          cx="32"
          cy="66"
          rx="7"
          ry="10"
          fill={`url(#${flameId})`}
          style={{ animation: "astro-flame 0.25s ease-in-out infinite", transformOrigin: "32px 58px" }}
        />
      )}
      <defs>
        <linearGradient id={flameId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c.flameFrom} />
          <stop offset="100%" stopColor={c.flameTo} stopOpacity="0.2" />
        </linearGradient>
        <radialGradient id={visorId} cx="0.3" cy="0.3" r="0.8">
          <stop offset="0%" stopColor={c.visorFrom} />
          <stop offset="100%" stopColor={c.visorTo} />
        </radialGradient>
      </defs>

      {/* backpack */}
      <rect x="22" y="34" width="20" height="22" rx="5" fill={c.pack} />

      {/* body */}
      <rect x="16" y="30" width="32" height="30" rx="14" fill={c.suit} stroke={c.suitStroke} strokeWidth="1.5" />

      {/* chest panel */}
      <rect x="24" y="40" width="16" height="10" rx="3" fill={c.panel} opacity="0.85" />
      <circle cx="28" cy="45" r="1.4" fill="#fef08a" />
      <circle cx="33" cy="45" r="1.4" fill="#86efac" />
      <circle cx="38" cy="45" r="1.4" fill="#fca5a5" />

      {/* arms */}
      <rect x="8" y="34" width="9" height="16" rx="4.5" fill={c.arm} stroke={c.suitStroke} strokeWidth="1.5" />
      <rect x="47" y="34" width="9" height="16" rx="4.5" fill={c.arm} stroke={c.suitStroke} strokeWidth="1.5" />

      {/* legs */}
      <rect x="20" y="56" width="9" height="12" rx="4" fill={c.leg} stroke={c.suitStroke} strokeWidth="1.5" />
      <rect x="35" y="56" width="9" height="12" rx="4" fill={c.leg} stroke={c.suitStroke} strokeWidth="1.5" />

      {/* helmet */}
      <circle cx="32" cy="20" r="18" fill={c.suit} stroke={c.suitStroke} strokeWidth="1.5" />
      <circle cx="32" cy="20" r="13" fill={`url(#${visorId})`} />
      <circle cx="27" cy="15" r="1.3" fill="white" opacity="0.9" />
      <circle cx="36" cy="24" r="0.9" fill="white" opacity="0.7" />
      <path d="M24 20a8 8 0 0 1 8-8" stroke="white" strokeOpacity="0.5" strokeWidth="1.2" fill="none" />
    </svg>
  );
}

export default function AstronautCompanion() {
  const theme = useDetectedTheme();
  const uid = useRef(Math.random().toString(36).slice(2, 8)).current;

  const [posIndex, setPosIndex] = useState(0);
  const [pos, setPos] = useState(WAYPOINTS[0]); // {x, y} in vw/vh
  const [facingLeft, setFacingLeft] = useState(false);
  const [flying, setFlying] = useState(false);
  const [action, setAction] = useState("idle"); // idle | wave | spin | startled
  const [bubble, setBubble] = useState(null);
  const [hovering, setHovering] = useState(false);
  const [dragging, setDragging] = useState(false);

  const timers = useRef([]);
  const wrapperRef = useRef(null);
  const tiltRef = useRef(null);

  const flyingRef = useRef(false);
  const startledRef = useRef(false);
  const draggingRef = useRef(false);
  const pausedRef = useRef(false);
  const dragMoved = useRef(false);
  const dragStart = useRef({ clientX: 0, clientY: 0, posX: 0, posY: 0 });

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  const after = (fn, ms) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
    return id;
  };

  const flyToRandom = useCallback(() => {
    setPosIndex((prevIndex) => {
      let next = prevIndex;
      while (next === prevIndex) next = Math.floor(Math.random() * WAYPOINTS.length);
      const target = WAYPOINTS[next];
      setFacingLeft(target.x < WAYPOINTS[prevIndex].x);
      setFlying(true);
      flyingRef.current = true;
      setAction("idle");
      setPos(target);
      after(() => {
        setFlying(false);
        flyingRef.current = false;
      }, FLIGHT_MS);
      return next;
    });
  }, []);

  // Autonomous wandering loop — defers (doesn't cancel) while paused/dragging
  useEffect(() => {
    let cancelled = false;
    const loop = () => {
      const delay = 5000 + Math.random() * 4000;
      after(() => {
        if (cancelled) return;
        if (pausedRef.current) {
          loop();
          return;
        }
        flyToRandom();
        loop();
      }, delay);
    };
    loop();
    return () => {
      cancelled = true;
      clearTimers();
    };
  }, [flyToRandom]);

  // Mouse awareness: look toward a nearby cursor, and bolt if it gets too close
  // (skipped entirely while the astronaut is being dragged).
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!wrapperRef.current || draggingRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy) || 1;

      // Visible "look at cursor" lean — direction-based, scaled by proximity.
      if (tiltRef.current) {
        if (dist < LOOK_RADIUS && !flyingRef.current) {
          const strength = 1 - dist / LOOK_RADIUS; // 0 (far) -> 1 (close)
          const angle = Math.max(-22, Math.min(22, (dx / dist) * 22 * strength));
          tiltRef.current.style.transform = `rotate(${angle}deg)`;
        } else {
          tiltRef.current.style.transform = "rotate(0deg)";
        }
      }

      if (dist < FLEE_RADIUS && !flyingRef.current && !startledRef.current) {
        startledRef.current = true;
        setAction("startled");
        setBubble("!");
        after(() => {
          flyToRandom();
          setBubble(null);
        }, 350);
        after(() => {
          startledRef.current = false;
        }, FLIGHT_MS + 350);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [flyToRandom]);

  const reactWith = (msg, act) => {
    setBubble(msg);
    setAction(act);
    after(() => setAction("idle"), 900);
    after(() => setBubble(null), 2600);
  };

  const handlePointerDown = (e) => {
    if (flying) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragMoved.current = false;
    dragStart.current = { clientX: e.clientX, clientY: e.clientY, posX: pos.x, posY: pos.y };
    draggingRef.current = true;
    pausedRef.current = true;
    startledRef.current = true; // being held — suppress flee/startle
    setBubble(null);
  };

  const handlePointerMove = (e) => {
    if (!draggingRef.current) return;
    const dxPx = e.clientX - dragStart.current.clientX;
    const dyPx = e.clientY - dragStart.current.clientY;
    if (!dragMoved.current && Math.hypot(dxPx, dyPx) > DRAG_THRESHOLD) {
      dragMoved.current = true;
      setDragging(true);
    }
    if (dragMoved.current) {
      const newX = dragStart.current.posX + (dxPx / window.innerWidth) * 100;
      const newY = dragStart.current.posY + (dyPx / window.innerHeight) * 100;
      const clampedX = Math.max(3, Math.min(97, newX));
      const clampedY = Math.max(8, Math.min(95, newY));
      setPos({ x: clampedX, y: clampedY });
    }
  };

  const handlePointerUp = () => {
    draggingRef.current = false;
    setDragging(false);

    if (dragMoved.current) {
      // it was actually dragged and dropped
      const msg = CAUGHT_MESSAGES[Math.floor(Math.random() * CAUGHT_MESSAGES.length)];
      reactWith(msg, "wave");
    } else {
      // simple click/tap
      const quip = QUIPS[Math.floor(Math.random() * QUIPS.length)];
      reactWith(quip, Math.random() > 0.5 ? "wave" : "spin");
    }

    after(() => {
      startledRef.current = false;
      pausedRef.current = false;
    }, 400);
  };

  const c = PALETTES[theme];

  return (
    <>
      <style>{`
        @keyframes astro-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes astro-wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-12deg); }
          75% { transform: rotate(10deg); }
        }
        @keyframes astro-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes astro-startle {
          0% { transform: scale(1); }
          40% { transform: scale(1.15) translateY(-4px); }
          100% { transform: scale(1); }
        }
        @keyframes astro-flame {
          0%, 100% { opacity: 0.5; transform: scaleY(0.8); }
          50% { opacity: 1; transform: scaleY(1.15); }
        }
        @keyframes astro-bubble-in {
          from { opacity: 0; transform: translateY(6px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .astro-btn { transition: transform 0.2s ease, filter 0.2s ease; touch-action: none; }
        .astro-btn:hover { transform: scale(1.12); }
      `}</style>

      <div
        ref={wrapperRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          left: `${pos.x}vw`,
          top: `${pos.y}vh`,
          transform: "translate(-50%, -50%)",
          transition: dragging
            ? "none"
            : `left ${FLIGHT_MS}ms cubic-bezier(0.45, 0, 0.2, 1), top ${FLIGHT_MS}ms cubic-bezier(0.45, 0, 0.2, 1)`,
          zIndex: 50,
          pointerEvents: "none",
        }}
      >
        {/* cursor-facing tilt (mutated directly via ref, no re-renders on mousemove) */}
        <div ref={tiltRef} style={{ transition: "transform 0.25s ease-out" }}>
          <button
            className="astro-btn"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            title="Try to catch me — drag me once you do!"
            style={{
              pointerEvents: "auto",
              background: "none",
              border: "none",
              cursor: dragging ? "grabbing" : "grab",
              padding: 0,
              display: "block",
              borderRadius: "50%",
              filter: hovering || dragging ? `drop-shadow(0 0 10px ${c.glow})` : "none",
              transform: facingLeft ? "scaleX(-1)" : "scaleX(1)",
            }}
          >
            <div
              style={{
                animation:
                  action === "spin"
                    ? "astro-spin 0.8s ease-in-out"
                    : action === "startled"
                    ? "astro-startle 0.35s ease-out"
                    : dragging
                    ? "none"
                    : "astro-float 3.2s ease-in-out infinite",
              }}
            >
              <div style={{ animation: action === "wave" ? "astro-wave 0.9s ease-in-out" : "none" }}>
                <AstronautSprite theme={theme} flying={flying} uid={uid} />
              </div>
            </div>
          </button>
        </div>

        {bubble && (
          <div
            style={{
              position: "absolute",
              bottom: "100%",
              left: "50%",
              transform: facingLeft ? "translateX(-50%) scaleX(-1)" : "translateX(-50%)",
              marginBottom: 8,
              background: c.bubbleBg,
              color: c.bubbleText,
              border: `1px solid ${c.bubbleBorder}`,
              borderRadius: 10,
              padding: "5px 9px",
              fontSize: 11,
              whiteSpace: "nowrap",
              boxShadow: "0 4px 14px rgba(0,0,0,0.35)",
              animation: "astro-bubble-in 0.2s ease-out",
              pointerEvents: "none",
            }}
          >
            <span style={{ display: "inline-block", transform: facingLeft ? "scaleX(-1)" : "none" }}>
              {bubble}
            </span>
          </div>
        )}
      </div>
    </>
  );
}