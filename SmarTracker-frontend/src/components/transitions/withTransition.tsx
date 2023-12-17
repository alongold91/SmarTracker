import { motion } from 'framer-motion';
import React from 'react';

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { delay: 0.5, duration: 0.5 }
  },
  exit: {
    x: '-100vw',
    transition: { ease: 'easeInOut' }
  }
};

const withTransition = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
    >
      <WrappedComponent {...props} />
    </motion.div>
  );
};

export default withTransition;
