import { Flex, Spin } from 'antd';
import AnimatedText from '../animated-text/AnimatedText';

interface DescriptiveLoaderProps {
  text: string | string[];
  repeatDelay?: number;
  whileCondition?: boolean;
  size?: 'small' | 'large';
}

const DescriptiveLoader = ({
  text,
  repeatDelay,
  whileCondition,
  size = 'small'
}: DescriptiveLoaderProps) => {
  return (
    <Flex gap='0.5rem' align='center'>
      <Spin size={size} />
      <AnimatedText
        text={text}
        className={size === 'small' ? 'caption' : undefined}
        repeatDelay={repeatDelay}
        whileCondition={whileCondition}
        el={size === 'small' ? 'p' : 'h5'}
      />
    </Flex>
  );
};

export default DescriptiveLoader;
