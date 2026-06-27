import { useState, useEffect, useRef, useCallback } from 'react';

const subscribers = new Map();
let frameId = null;
let isListening = false;

function tick() {
  frameId = null;
  subscribers.forEach((callback) => callback());
}

function onScroll() {
  if (!frameId) {
    frameId = requestAnimationFrame(tick);
  }
}

function ensureListener() {
  if (!isListening) {
    isListening = true;
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();
  }
}

function removeListenerIfEmpty() {
  if (subscribers.size === 0 && isListening) {
    isListening = false;
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
    if (frameId) {
      cancelAnimationFrame(frameId);
      frameId = null;
    }
  }
}

export function useParallax({ speed = 0.15, axis = 'y', offset = 0, externalRef } = {}) {
  const internalRef = useRef(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const optionsRef = useRef({ speed, axis, offset });
  const targetRef = useRef({ externalRef, internalRef });

  useEffect(() => {
    optionsRef.current = { speed, axis, offset };
  }, [speed, axis, offset]);

  useEffect(() => {
    targetRef.current = { externalRef, internalRef };
  }, [externalRef]);

  const update = useCallback(() => {
    const { externalRef: ext, internalRef: internal } = targetRef.current;
    const element = (ext ?? internal).current;
    if (!element) return;

    const { speed: rate, axis: direction, offset: base } = optionsRef.current;
    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const elementCenter = rect.top + rect.height * 0.5;
    const distanceFromCenter = elementCenter - viewportHeight * 0.5;
    const shift = distanceFromCenter * rate + base;

    const x = direction === 'x' || direction === 'both' ? shift : 0;
    const y = direction === 'y' || direction === 'both' ? shift : 0;

    setTransform((previous) => (
      previous.x === x && previous.y === y ? previous : { x, y }
    ));
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return undefined;

    subscribers.set(update, update);
    ensureListener();
    update();

    return () => {
      subscribers.delete(update);
      removeListenerIfEmpty();
    };
  }, [update]);

  return [externalRef ?? internalRef, transform];
}