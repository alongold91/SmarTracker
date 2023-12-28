import { Input, Form, Button } from 'antd';
import React from 'react';

type FieldType = {
  email: string;
};

const ForgotPassword = () => {
  return (
    <section>
      <Form
        name='basic'
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={() => {}}
        autoComplete='off'
      >
        <Form.Item
          label='Email'
          name='email'
          rules={[
            { required: true, message: 'Please enter your email!' },
            { type: 'email', message: 'Please enter a valid email' }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
};

export default ForgotPassword;
