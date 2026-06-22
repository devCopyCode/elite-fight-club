'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

export default function ScrollExpandMedia({
  mediaType = 'image',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) {
  const [showContent, setShowContent] = useState(false);

  const expandedRef = useRef(false);
  const touchStartYRef = useRef(0);
  const word1Ref = useRef<HTMLSpanElement>(null);
  const word2Ref = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  // Motion value bruto + spring suave
  const rawProgress = useMotionValue(0);
  const smoothProgress = useSpring(rawProgress, {
    stiffness: 65,
    damping: 20,
    mass: 1.0,
  });

  // Derived visual values
  const mediaWidth  = useTransform(smoothProgress, (v) => `${18 + v * 82}vw`);
  const mediaHeight = useTransform(smoothProgress, (v) => `${38 + v * 62}vh`);
  const bgOpacity   = useTransform(smoothProgress, [0, 0.55, 1], [1, 0.2, 0]);
  const mediaOverlayOpacity = useTransform(smoothProgress, [0, 1], [0.55, 0]);
  const firstWordX  = useTransform(smoothProgress, (v) => `${-v * 44}vw`);
  const restWordX   = useTransform(smoothProgress, (v) => `${v * 44}vw`);
  const textOpacity = useTransform(smoothProgress, [0, 0.35, 0.6], [1, 0.5, 0]);
  const subtextOpacity = useTransform(smoothProgress, [0, 0.25, 0.5], [1, 0.4, 0]);
  const redGlow = useTransform(smoothProgress, [0, 0.5], [0.18, 0.04]);

  // Detecta expansão completa
  useEffect(() => {
    const unsub = smoothProgress.on('change', (v) => {
      if (v >= 0.97 && !expandedRef.current) {
        expandedRef.current = true;
        setShowContent(true);
      } else if (v < 0.65 && expandedRef.current) {
        expandedRef.current = false;
        setShowContent(false);
      }
    });
    return unsub;
  }, [smoothProgress]);

  // Animação de entrada dramática no mount
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.15 });

    if (word1Ref.current && word2Ref.current) {
      tl.fromTo(
        [word1Ref.current, word2Ref.current],
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        {
          clipPath: 'inset(0 0% 0 0)',
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          stagger: 0.18,
        }
      );
    }

    if (labelRef.current) {
      tl.fromTo(
        labelRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        '-=0.5'
      );
    }

    return () => { tl.kill(); };
  }, []);

  // Scroll hijack
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (expandedRef.current && e.deltaY < 0 && window.scrollY <= 5) {
        rawProgress.set(Math.max(rawProgress.get() - 0.06, 0));
        expandedRef.current = false;
        setShowContent(false);
        e.preventDefault();
        return;
      }
      if (!expandedRef.current) {
        e.preventDefault();
        // 0.004 = scroll curto e responsivo
        const next = Math.min(Math.max(rawProgress.get() + e.deltaY * 0.004, 0), 1);
        rawProgress.set(next);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartYRef.current) return;
      const deltaY = touchStartYRef.current - e.touches[0].clientY;

      if (expandedRef.current && deltaY < -20 && window.scrollY <= 5) {
        rawProgress.set(Math.max(rawProgress.get() - 0.06, 0));
        expandedRef.current = false;
        setShowContent(false);
        e.preventDefault();
      } else if (!expandedRef.current) {
        e.preventDefault();
        const factor = deltaY < 0 ? 0.008 : 0.005;
        const next = Math.min(Math.max(rawProgress.get() + deltaY * factor, 0), 1);
        rawProgress.set(next);
        touchStartYRef.current = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = () => { touchStartYRef.current = 0; };
    const handleScroll = () => { if (!expandedRef.current) window.scrollTo(0, 0); };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  const firstWord  = title?.split(' ')[0] ?? '';
  const restOfTitle = title?.split(' ').slice(1).join(' ') ?? '';

  return (
    <div className='overflow-x-hidden'>
      <section
        className='relative flex flex-col items-center justify-center'
        style={{ minHeight: '100dvh' }}
      >
        {/* Fundo que desaparece */}
        <motion.div className='absolute inset-0 z-0' style={{ opacity: bgOpacity }}>
          <Image
            src={bgImageSrc}
            alt='Background'
            fill
            priority
            sizes='100vw'
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          {/* Vignette cinematica */}
          <div
            className='absolute inset-0'
            style={{
              background:
                'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(8,8,8,0.7) 100%)',
            }}
          />
          <div className='absolute inset-0' style={{ background: 'rgba(8,8,8,0.45)' }} />
        </motion.div>

        {/* Imagem central que expande */}
        <div className='absolute inset-0 z-10 flex items-center justify-center pointer-events-none'>
          <motion.div
            style={{
              width: mediaWidth,
              height: mediaHeight,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Glow vermelho ao redor da imagem */}
            <motion.div
              style={{
                position: 'absolute',
                inset: '-2px',
                boxShadow: useTransform(
                  redGlow,
                  (v) => `0 0 80px 20px rgba(200,16,46,${v}), inset 0 0 40px rgba(8,8,8,0.4)`
                ),
                zIndex: 2,
                pointerEvents: 'none',
              }}
            />
            {mediaType === 'image' ? (
              <>
                <Image
                  src={mediaSrc}
                  alt={title || 'Media'}
                  fill
                  sizes='(max-width: 768px) 80vw, 40vw'
                  style={{ objectFit: 'cover', objectPosition: 'center top' }}
                />
                {/* Overlay escuro da imagem que some ao expandir */}
                <motion.div
                  className='absolute inset-0'
                  style={{
                    opacity: mediaOverlayOpacity,
                    background:
                      'linear-gradient(to bottom, rgba(8,8,8,0.3) 0%, transparent 40%, rgba(8,8,8,0.6) 100%)',
                  }}
                />
              </>
            ) : (
              <video
                src={mediaSrc}
                poster={posterSrc}
                autoPlay
                muted
                loop
                playsInline
                className='w-full h-full object-cover'
              />
            )}
          </motion.div>
        </div>

        {/* Título dividido — palavras se afastam no scroll */}
        <div
          className={`absolute inset-0 z-20 flex items-center justify-center pointer-events-none ${
            textBlend ? 'mix-blend-difference' : ''
          }`}
        >
          <div className='flex items-center gap-8 md:gap-16'>
            <motion.span
              ref={word1Ref}
              style={{
                translateX: firstWordX,
                opacity: textOpacity,
                fontFamily: 'var(--font-bebas, sans-serif)',
                fontSize: 'clamp(64px, 11vw, 160px)',
                letterSpacing: '2px',
                color: 'var(--white, #F0F0F0)',
                lineHeight: 1,
                display: 'block',
              }}
            >
              {firstWord}
            </motion.span>
            <motion.span
              ref={word2Ref}
              style={{
                translateX: restWordX,
                opacity: textOpacity,
                fontFamily: 'var(--font-bebas, sans-serif)',
                fontSize: 'clamp(64px, 11vw, 160px)',
                letterSpacing: '2px',
                color: 'var(--red, #C8102E)',
                lineHeight: 1,
                display: 'block',
              }}
            >
              {restOfTitle}
            </motion.span>
          </div>
        </div>

        {/* Label + hint de scroll */}
        <div
          ref={labelRef}
          className='absolute bottom-10 left-0 right-0 z-20 flex flex-col items-center gap-4 pointer-events-none'
          style={{ opacity: 0 }}
        >
          {date && (
            <motion.p
              style={{
                opacity: subtextOpacity,
                fontFamily: 'var(--font-barlow-condensed, sans-serif)',
                fontSize: '11px',
                letterSpacing: '6px',
                textTransform: 'uppercase',
                color: 'var(--red, #C8102E)',
                fontWeight: 600,
              }}
            >
              {date}
            </motion.p>
          )}
          {scrollToExpand && (
            <motion.div
              style={{ opacity: subtextOpacity }}
              className='flex flex-col items-center gap-2'
            >
              <span
                style={{
                  fontFamily: 'var(--font-barlow-condensed, sans-serif)',
                  fontSize: '10px',
                  letterSpacing: '5px',
                  textTransform: 'uppercase',
                  color: 'rgba(240,240,240,0.35)',
                }}
              >
                {scrollToExpand}
              </span>
              {/* Linha animada de scroll hint */}
              <span
                style={{
                  display: 'block',
                  width: '1px',
                  height: '32px',
                  background: 'linear-gradient(to bottom, rgba(200,16,46,0.8), transparent)',
                  animation: 'scroll-hint 1.8s ease-in-out infinite',
                }}
              />
            </motion.div>
          )}
        </div>

        {/* Conteúdo após expansão */}
        <motion.div
          className='relative z-30 w-full'
          style={{ marginTop: '100dvh' }}
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        >
          {children}
        </motion.div>
      </section>

      <style>{`
        @keyframes scroll-hint {
          0%   { transform: scaleY(0); transform-origin: top; opacity: 0; }
          50%  { transform: scaleY(1); transform-origin: top; opacity: 1; }
          100% { transform: scaleY(1); transform-origin: bottom; opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes scroll-hint { from, to { opacity: 0; } }
        }
      `}</style>
    </div>
  );
}
