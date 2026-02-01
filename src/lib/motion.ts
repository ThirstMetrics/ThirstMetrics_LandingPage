import type { Variants, Transition } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1] as const;

export const viewport = {
  once: true,
  amount: 0.15 as const,
  margin: "-60px" as const,
};

export const revealUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease } as Transition,
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease } as Transition,
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 } as Transition,
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease } as Transition,
  },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -36 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease } as Transition,
  },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: 36 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease } as Transition,
  },
};

/* Additional motion variants for richer section transitions */

export const revealDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease } as Transition,
  },
};

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease } as Transition,
  },
};

export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease } as Transition,
  },
};

/* Hover micro-interactions — use with whileHover */
export const hoverLift = {
  y: -4,
  transition: { duration: 0.2, ease },
};

export const hoverScale = {
  scale: 1.02,
  transition: { duration: 0.2, ease },
};

export const hoverGlow = {
  boxShadow: "0 0 24px rgba(13,115,119,0.15)",
  transition: { duration: 0.25, ease },
};
