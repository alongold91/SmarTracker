import React from 'react';
import { Button, Checkbox, Flex, Form, Input } from 'antd';
import style from './Loginpage.module.css';
import { Link } from 'react-router-dom';
import { useLazyLoginQuery } from '../../app-state/queries/usersApiSlice';

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

type FieldType = {
  email: string;
  password: string;
  remember: boolean;
};

const LoginPage = () => {
  const [loginTrigger, result] = useLazyLoginQuery();

  const onFinish = (values: FieldType) => {
    loginTrigger({ email: values.email, password: values.password });
  };

  return (
    <section className={style.section}>
      <Form
        name='basic'
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
        className={style.form}
      >
        <h3 className={style.headline}>Welcome to SmarTracker</h3>
        <Form.Item<FieldType>
          label='Email'
          name='email'
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Flex className={style['bottom-flex-container']} vertical gap='0.5rem'>
          <p className='body2'>
            <span>Do not have an account? </span>
            <Link to='/' style={{ fontWeight: 'bold' }}>
              click here
            </Link>
          </p>
          <button className='body2'>Forgot my password</button>
        </Flex>
        <Form.Item<FieldType>
          name='remember'
          valuePropName='checked'
          wrapperCol={{ offset: 6, span: 16 }}
        >
          <Checkbox>Remember me for 30 days</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
};

export default LoginPage;
