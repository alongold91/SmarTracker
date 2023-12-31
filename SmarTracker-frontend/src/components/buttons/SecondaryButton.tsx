import { Button, ButtonProps } from 'antd';
import React from 'react';

interface SecondaryButtonProps {
  buttonText: string;
  icon?: React.ReactNode;
}

const SecondaryButton = ({
  buttonText,
  icon
}: SecondaryButtonProps) => {
  return (
    <Button type='default' htmlType='button' icon={icon}>
      {buttonText}
    </Button>
  );
};

export default SecondaryButton;
