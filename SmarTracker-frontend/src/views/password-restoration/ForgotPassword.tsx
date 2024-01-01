import { Input, Form, Button, Flex } from 'antd';
import style from './PasswordRestoration.module.css';
import React, { useEffect, useState } from 'react';
import { useForgotPasswordMutation } from '../../app-state/slices/rtk-query-slices/usersApiSlice';
import EmailSent from './EmailSent';
import AnimatedText from '../../components/animated-text/AnimatedText';

type FieldType = {
  email: string;
};

const ForgotPassword = () => {
  const [sendResetPasswordEmail, { isSuccess: resetPasswordSent, isLoading }] =
    useForgotPasswordMutation();

  const [emailSent, setEmailSent] = useState<boolean>(false);

  useEffect(() => {
    if (resetPasswordSent) {
      setEmailSent(true);
    }
  }, [resetPasswordSent]);

  const handleSubmit = (values: FieldType) => {
     sendResetPasswordEmail(values.email);
  };

  if (isLoading) {
    return (
      <h6>Loading...</h6>
    )
  }

  if (emailSent) {
    return (
      <EmailSent />
    )
  }

  if (true) {
    return (
      <AnimatedText text='Hello everybody' repeatDelay={1500} />
    )
  }

  return (
    <Flex
      component='section'
      justify='center'
      align='center'
      className={style.section}
    >
      <Form
        name='basic'
        labelCol={{ span: 3 }}
        style={{ width: '30%' }}
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        autoComplete='off'
      >
        <h6 style={{ paddingBottom: '1.5rem' }}>
          Please enter your email address for a password reset link
        </h6>
        <Form.Item
          label='Email'
          name='email'
          wrapperCol={{ offset: 1, span: 18 }}
          rules={[
            { required: true, message: 'Please enter your email!' },
            { type: 'email', message: 'Please enter a valid email' }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 7 }}>
          <Button type='primary' htmlType='submit'>
            Email me a reset password link
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default ForgotPassword;
