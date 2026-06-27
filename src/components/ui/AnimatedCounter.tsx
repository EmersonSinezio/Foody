import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  to: number;
  suffix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}

const AnimatedCounter = ({
  to,
  suffix = "",
  duration = 1.5,
  decimals = 0,
  className = "",
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const startTime = performance.now();
    const durationMs = duration * 1000;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // easeOutQuart
      const eased = 1 - Math.pow(1 - progress, 4);
      start = eased * to;
      setCount(start);
      if (progress < 1) requestAnimationFrame(step);
      else setCount(to);
    };

    requestAnimationFrame(step);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
