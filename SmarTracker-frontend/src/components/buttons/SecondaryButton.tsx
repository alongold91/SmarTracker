import { Button } from 'antd';
import React from 'react';

interface SecondaryButtonProps {
  buttonText: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

const SecondaryButton = ({
  buttonText,
  icon,
  onClick
}: SecondaryButtonProps) => {
  return (
    <Button type='default' htmlType='button' icon={icon} onClick={onClick}>
      {buttonText}
    </Button>
  );
};

export default SecondaryButton;
