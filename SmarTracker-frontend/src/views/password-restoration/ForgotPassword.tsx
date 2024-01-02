import { Button, Flex, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import { useForgotPasswordMutation } from '../../app-state/slices/rtk-query-slices/usersApiSlice';
import DescriptiveLoader from '../../components/loaders/DescriptiveLoader';
import EmailSent from './EmailSent';
import style from './PasswordRestoration.module.css';

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
      <Flex
        align='center'
        justify='center'
        className='full-screen-size'
      >
        <DescriptiveLoader
          text='Sending...'
          size='large'
          whileCondition={isLoading}
          repeatDelay={1200}
        />
      </Flex>
    );
  }

  if (emailSent) {
    return <EmailSent />;
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
        style={{ width: '36%' }}
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
