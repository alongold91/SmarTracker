import { Button, ButtonProps } from 'antd';
import React from 'react';

interface PrimaryButtonProps {
  buttonText: string;
  htmlType?: ButtonProps['htmlType'];
  icon?: React.ReactNode;
}

const PrimaryButton = ({
  buttonText,
  htmlType = 'button',
  icon
}: PrimaryButtonProps) => {
  return (
    <Button type='primary' htmlType={htmlType} icon={icon}>
      {buttonText}
    </Button>
  );
};

export default PrimaryButton;
