import { useState, useRef, useCallback } from "react";
import {
  ConvexProvider,
  ConvexReactClient,
  useQuery,
  useMutation,
} from "convex/react";
import { api } from "../../convex/_generated/api";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

const PARTICLE_COUNT = 6;

function LikeButtonInner() {
  const count = useQuery(api.likes.get);
  const increment = useMutation(api.likes.increment);
  const [liked, setLiked] = useState(
    () => localStorage.getItem("licenses-wtf-liked") === "1",
  );

  const [animating, setAnimating] = useState(false);
  const [particles, setParticles] = useState<{ batch: number; items: number[] }>({ batch: 0, items: [] });
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const particleTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const handleClick = useCallback(() => {
    increment();
    setLiked(true);
    localStorage.setItem("licenses-wtf-liked", "1");

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setAnimating(true);
    timeoutRef.current = setTimeout(() => setAnimating(false), 500);

    if (particleTimeoutRef.current) clearTimeout(particleTimeoutRef.current);
    setParticles((prev) => ({ batch: prev.batch + 1, items: Array.from({ length: PARTICLE_COUNT }, (_, i) => i) }));
    particleTimeoutRef.current = setTimeout(() => setParticles((prev) => ({ ...prev, items: [] })), 700);
  }, [increment]);

  return (
    <button
      className="like-button"
      onClick={handleClick}
      aria-label={`Like this project. ${count ?? 0} likes.`}
      data-animating={animating || undefined}
      data-liked={liked || undefined}
    >
      <span className="like-button-heart-wrap">
        <span className="like-button-heart">{liked ? "\u2665" : "\u2661"}</span>
        {particles.items.map((i) => (
          <span
            key={`${i}-${particles.batch}`}
            className="like-particle"
            style={{ "--i": i } as React.CSSProperties}
          />
        ))}
      </span>
      <span className="like-button-count">{count ?? "..."}</span>
    </button>
  );
}

export default function LikeButton() {
  return (
    <ConvexProvider client={convex}>
      <LikeButtonInner />
    </ConvexProvider>
  );
}
