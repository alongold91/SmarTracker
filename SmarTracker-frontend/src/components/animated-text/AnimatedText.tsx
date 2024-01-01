import React, { useEffect, useRef } from 'react';
import style from './AnimatedText.module.css';
import { motion, useInView, useAnimation } from 'framer-motion';

interface AnimatedTextProps {
  text: string | string[];
  el?: keyof JSX.IntrinsicElements;
  className?: string;
  once?: boolean;
  repeatDelay?: number;
}

const defaultAnimations = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0
  }
};

const AnimatedText = ({
  text,
  el: Wrapper = 'p',
  className,
  once,
  repeatDelay
}: AnimatedTextProps) => {
  const controls = useAnimation();
  const textArray = Array.isArray(text) ? text : [text];
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5, once });

  useEffect(() => {
    let timeout;
    const show = () => {
      controls.start('visible');
      if (repeatDelay) {
        timeout = setTimeout(async () => {
          await controls.start('hidden');
          controls.start('visible');
        }, repeatDelay);
      }
    };

    if (inView) {
      show();
    } else {
      controls.start('hidden');
    }
    return () => clearTimeout(timeout);
  }, [inView]);

  return (
    <Wrapper className={className}>
      <span className={style['sr-only']}> {text}</span>
      <motion.span
        ref={ref}
        initial='hidden'
        animate={controls}
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
          hidden: {}
        }}
        aria-hidden
      >
        {textArray.map((line) => (
          <span style={{ display: 'block' }}>
            {line.split(' ').map((word) => (
              <span style={{ display: 'inline-block' }}>
                {word.split('').map((char) => (
                  <motion.span
                    style={{ display: 'inline-block' }}
                    variants={defaultAnimations}
                  >
                    {char}
                  </motion.span>
                ))}
                <span style={{ display: 'inline-block' }}>&nbsp;</span>
              </span>
            ))}
          </span>
        ))}
      </motion.span>
    </Wrapper>
  );
};

export default AnimatedText;
