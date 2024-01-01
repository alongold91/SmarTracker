import { Button, ButtonProps } from 'antd';
import React from 'react';

interface PrimaryButtonProps {
  buttonText: string;
  htmlType?: ButtonProps['htmlType'];
  icon?: React.ReactNode;
  onClick?: () => void;
}

const PrimaryButton = ({
  buttonText,
  htmlType = 'button',
  icon,
  onClick
}: PrimaryButtonProps) => {
  return (
    <Button type='primary' htmlType={htmlType} icon={icon} onClick={onClick}>
      {buttonText}
    </Button>
  );
};

export default PrimaryButton;
