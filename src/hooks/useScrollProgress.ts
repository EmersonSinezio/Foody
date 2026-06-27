import { useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

/**
 * Retorna um valor entre 0 e 1 representando o progresso de scroll da página.
 * Re-renderiza apenas quando o valor muda significativamente (throttle ~5%).
 */
export const useScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setProgress(latest);
  });

  return progress;
};
