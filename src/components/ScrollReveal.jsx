import { motion } from 'framer-motion';

export default function ScrollReveal({
  children,
  delay = 0,
  y = 40,
  x = 0,
  scale = 1,
  className = '',
  once = true,
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x, scale: scale === 1 ? 1 : scale * 0.9 }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once, margin: '-80px' }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}
