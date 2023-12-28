import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Button, Checkbox, Flex, Form, Input } from 'antd';
import { useEffect } from 'react';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { useLazyLoginQuery } from '../../app-state/queries/usersApiSlice';
import style from './Loginpage.module.css';

type FieldType = {
  email: string;
  password: string;
  remember: boolean;
};

interface ErrorData {
  status: number;
  message: string;
}

const LoginPage = () => {
  const [loginTrigger, result] = useLazyLoginQuery();

  const navigate = useNavigate();

  const { error, isSuccess } = result;

  const [form] = Form.useForm();

  useEffect(() => {
    if (error) {
      if (
        ((error as FetchBaseQueryError).data as ErrorData).message ===
        'Incorrect password'
      ) {
        form.setFields([
          {
            name: 'password',
            errors: ['Incorrect password']
          }
        ]);
      }
      if (
        ((error as FetchBaseQueryError).data as ErrorData).message ===
        'Incorrect email'
      ) {
        form.setFields([
          {
            name: 'email',
            errors: ['Incorrect email']
          }
        ]);
      }
    }

    if (isSuccess) {
      navigate('/dashboard/summary');
    }
  }, [error, isSuccess]);

  const onFinish = async (values: FieldType) => {
    await loginTrigger({ email: values.email, password: values.password });
  };

  return (
    <section className={style.section}>
      <Form
        form={form}
        name='basic'
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete='off'
        className={style.form}
      >
        <h3 className={style.headline}>Welcome to SmarTracker</h3>
        <Form.Item<FieldType>
          label='Email'
          name='email'
          rules={[
            { required: true, message: 'Please enter your email!' },
            { type: 'email', message: 'Please enter a valid email' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          shouldUpdate
          label='Password'
          name='password'
          validateTrigger='onSubmit'
          rules={[{ required: true, message: 'Please enter your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Flex className={style['bottom-flex-container']} vertical gap='0.5rem'>
          <p className='body2'>
            <span>Do not have an account? </span>
            <Link to='/'>click here</Link>
          </p>
          <button
            className='body2'
            onClick={() => navigate('/forgot-password')}
          >
            Forgot my password
          </button>
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
