import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import './GlassDock.css';

export const GlassDock = React.forwardRef(
  ({ items, className, dockClassName, ...props }, ref) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [direction, setDirection] = useState(0);
    const itemRefs = React.useRef([]);

    const handleMouseEnter = (index) => {
      if (hoveredIndex !== null && index !== hoveredIndex) {
        setDirection(index > hoveredIndex ? 1 : -1);
      }
      setHoveredIndex(index);
    };

    const getTooltipCenter = (index) => {
      const el = itemRefs.current[index];
      if (el) {
        return el.offsetLeft + el.offsetWidth / 2;
      }
      return 30 + index * 56; // fallback math
    };

    return (
      <div ref={ref} className={cn('w-max', className)} {...props}>
        <div
          className={cn(
            "relative flex gap-4 items-center px-6 py-4 rounded-full",
            "backdrop-blur-xl shadow-2xl glass-dock-container",
            dockClassName
          )}
          style={{ height: "64px", padding: "10px" }}
          onMouseLeave={() => {
            setHoveredIndex(null);
            setDirection(0);
          }}
        >
          <AnimatePresence>
            {hoveredIndex !== null && (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.92, y: -15 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: -20,
                  x: getTooltipCenter(hoveredIndex),
                }}
                exit={{ opacity: 0, scale: 0.92, y: -15 }}
                transition={{ type: 'spring', stiffness: 200, damping: 22 }}
                className="absolute top-0 left-0 w-0 h-0 pointer-events-none z-30 flex items-center justify-center overflow-visible"
              >
                <div
                  className={cn(
                    'px-5 py-1.5 rounded-xl relative',
                    'shadow-[0_8px_16px_-4px_rgba(0,0,0,0.5)] flex items-center justify-center glass-dock-tooltip w-max m-auto',
                  )}
                >
                  <div className="relative flex items-center justify-center w-full z-10 px-1">
                    <AnimatePresence mode="popLayout" custom={direction}>
                      <motion.span
                        key={items[hoveredIndex].title}
                        custom={direction}
                        initial={{
                          x: direction > 0 ? 25 : -25,
                          opacity: 0,
                          filter: 'blur(4px)',
                        }}
                        animate={{
                          x: 0,
                          opacity: 1,
                          filter: 'blur(0px)',
                        }}
                        exit={{
                          x: direction > 0 ? -25 : 25,
                          opacity: 0,
                          filter: 'blur(4px)',
                        }}
                        transition={{
                          duration: 0.25,
                          ease: [0.2, 0.9, 0.1, 1],
                        }}
                        className="text-[12px] font-semibold tracking-[0.08em] uppercase whitespace-nowrap text-[color:var(--color-vault-text)]"
                      >
                        {items[hoveredIndex].title}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {items.map((el, index) => {
            const Icon = el.icon;
            const isHovered = hoveredIndex === index;
            const isAdjacent = hoveredIndex !== null && Math.abs(hoveredIndex - index) === 1;
            
            let scale = 1;
            let y = 0;
            if (isHovered) {
              scale = 1.25;
              y = -4;
            } else if (isAdjacent) {
              scale = 1.1;
              y = -2;
            }

            const handleClick = () => {
              if (el.onClick) {
                el.onClick();
              } else if (el.href) {
                window.open(el.href, '_blank', 'noopener,noreferrer');
              }
            };

            return (
              <div
                key={el.title}
                ref={(el) => (itemRefs.current[index] = el)}
                onMouseEnter={() => handleMouseEnter(index)}
                onClick={handleClick}
                className="relative w-10 h-10 flex items-center justify-center cursor-pointer"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleClick();
                  }
                }}
              >
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  animate={{ scale, y }}
                  transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                >
                  <Icon
                    size={22}
                    strokeWidth={2}
                    className={cn(
                      'transition-colors duration-200',
                      isHovered
                        ? 'text-[color:var(--color-vault-lavender)] drop-shadow-[0_0_8px_rgba(var(--color-vault-lavender-rgb),0.4)]'
                        : isAdjacent
                        ? 'text-[color:var(--color-vault-steel)]'
                        : 'text-[color:var(--color-vault-gray)]'
                    )}
                  />
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

GlassDock.displayName = 'GlassDock';
export default GlassDock;
