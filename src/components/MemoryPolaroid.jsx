import React, { useCallback, useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import shreyPortrait from '../../shrey.jpeg';
import helmetOne from '../../helmet1.jpeg';
import helmetThree from '../../helmet3.jpeg';
import shreyTwo from '../../shrey2.jpeg';
import shreyThree from '../../shrey3.jpeg';
import './MemoryPolaroid.css';

// Each image comes from the existing portfolio repository.
// Captions for the new memories are kept exactly as supplied.
const MEMORIES = [
  {
    id: 'kbr-park',
    image: shreyPortrait,
    caption: 'This photo was taken in KBR Park.',
    alt: 'A photo of Shriyans Denis Swamy at KBR Park',
  },
  {
    id: 'helmet1',
    image: helmetOne,
    caption: 'haha ik its cool',
    alt: 'A personal memory from helmet1',
  },
  {
    id: 'helmet3',
    image: helmetThree,
    caption: 'i love my black helmet',
    alt: 'A personal memory from helmet3',
  },
  {
    id: 'shrey2',
    image: shreyTwo,
    caption: 'you def know this place if you live in hyd',
    alt: 'A personal memory from shrey2',
  },
  {
    id: 'shrey3',
    image: shreyThree,
    caption: 'keep smiling!',
    alt: 'A personal memory from shrey3',
  },
];

const PAGE_TURN = {
  enter: (direction) => ({
    rotateY: direction > 0 ? 72 : -72,
    x: direction > 0 ? 22 : -22,
    opacity: 0,
    scale: .985,
    zIndex: 1,
  }),
  center: {
    rotateY: 0,
    x: 0,
    opacity: 1,
    scale: 1,
    zIndex: 1,
  },
  exit: (direction) => ({
    rotateY: direction > 0 ? -94 : 94,
    x: direction > 0 ? -26 : 26,
    opacity: 0,
    scale: .965,
    zIndex: 2,
  }),
};

export default function MemoryPolaroid() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [turning, setTurning] = useState(false);
  const reducedMotion = useReducedMotion();
  const memory = MEMORIES[index];

  const go = useCallback((step) => {
    if (turning) return;
    setDirection(step);
    setIndex((current) => (current + step + MEMORIES.length) % MEMORIES.length);
    if (!reducedMotion) setTurning(true);
  }, [turning, reducedMotion]);

  // Preload the next and previous print to minimize visible decode delays.
  useEffect(() => {
    const next = [(index + 1) % MEMORIES.length, (index - 1 + MEMORIES.length) % MEMORIES.length];
    next.forEach((i) => {
      const img = new Image();
      img.src = MEMORIES[i].image;
    });
  }, [index]);

  const onKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      go(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      go(1);
    }
  };

  const onDragEnd = (_, info) => {
    const dx = info.offset.x;
    const vx = info.velocity.x;
    if (dx < -55 || vx < -520) go(1);
    else if (dx > 55 || vx > 520) go(-1);
  };

  return (
    <div className="memory-gallery" aria-label="Photo memories">
      <motion.figure
        className="hero-polaroid memory-polaroid"
        initial={reducedMotion ? false : { opacity: 0, y: 20, rotate: 1.5 }}
        animate={{ opacity: 1, y: 0, rotate: -2 }}
        transition={{ duration: .8, ease: [.2, .7, .2, 1], delay: .1 }}
      >
        <motion.div
          className="memory-stage"
          role="region"
          aria-roledescription="carousel"
          aria-label="Personal photo memories. Swipe, or use the left and right arrow keys to turn a photo."
          tabIndex={0}
          onKeyDown={onKeyDown}
          drag={reducedMotion ? false : 'x'}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={.14}
          dragMomentum={false}
          onDragEnd={onDragEnd}
        >
          <AnimatePresence initial={false} custom={direction} onExitComplete={() => setTurning(false)}>
            <motion.div
              key={memory.id}
              className="memory-sheet"
              custom={direction}
              variants={PAGE_TURN}
              initial={reducedMotion ? false : 'enter'}
              animate="center"
              exit={reducedMotion ? { opacity: 0 } : 'exit'}
              transition={reducedMotion ? { duration: 0 } : {
                duration: .62,
                ease: [.2, .78, .18, 1],
                opacity: { duration: .43 },
              }}
              style={{
                transformOrigin: direction > 0 ? 'left center' : 'right center',
                backfaceVisibility: 'hidden',
              }}
            >
              <div className="memory-photo">
                <img
                  src={memory.image}
                  alt={memory.alt}
                  draggable="false"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  fetchPriority={index === 0 ? 'high' : undefined}
                />
              </div>
              <figcaption className="memory-caption">{memory.caption}</figcaption>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.figure>

      <div className="memory-controls" aria-label="Photo controls">
        <button
          className="memory-arrow"
          type="button"
          onClick={() => go(-1)}
          disabled={turning}
          aria-label="Previous photo"
        >
          <ArrowLeft size={17} strokeWidth={1.8}/>
        </button>
        <div className="memory-progress" aria-live="polite" aria-atomic="true">
          <span className="memory-count">{String(index + 1).padStart(2, '0')} <span>/</span> {String(MEMORIES.length).padStart(2, '0')}</span>
          <span className="memory-progress-track" aria-hidden="true"><span style={{ width: ((index + 1) / MEMORIES.length * 100) + '%' }}/></span>
        </div>
        <button
          className="memory-arrow"
          type="button"
          onClick={() => go(1)}
          disabled={turning}
          aria-label="Next photo"
        >
          <ArrowRight size={17} strokeWidth={1.8}/>
        </button>
      </div>
      <span className="memory-hint">a few moments, on film · swipe to turn</span>
    </div>
  );
}
