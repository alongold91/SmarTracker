import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Button, Checkbox, Flex, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../app-state/slices/rtk-query-slices/usersApiSlice';
import style from './Loginpage.module.css';
import DescriptiveLoader from '../../components/loaders/DescriptiveLoader';

type FieldType = {
  email: string;
  password: string;
  trust: boolean;
};

interface ErrorData {
  status: number;
  message: string;
}

const LoginPage = () => {
  const [login, {error, isSuccess, isLoading}] = useLoginMutation();

  const [trustsDevice, setTrustsDevice] = useState<boolean>(false);

  const navigate = useNavigate();

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
      if (trustsDevice) {
        localStorage.setItem('persist', 'true');
      }
      else {
        sessionStorage.setItem('inSession', 'true');
      }
    }
  }, [error, isSuccess]);

  const onFinish = (values: FieldType) => {
    setTrustsDevice(values.trust)
     login({ email: values.email, password: values.password, trustsDevice: values.trust });
  };

  if (isLoading) {
    return (
      <Flex
        align='center'
        justify='center'
        className='full-screen-size'
      >
        <DescriptiveLoader
          text='connecting...'
          size='large'
          whileCondition={isLoading}
          repeatDelay={1200}
        />
      </Flex>
    );
  }



  return (
    <section className={style.section}>
      <Form
        form={form}
        name='basic'
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ trust: false }}
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
            <Link to='/signup'>click here</Link>
          </p>
          <button
            className='body2'
            onClick={() => navigate('/forgot-password')}
          >
            Forgot my password
          </button>
        </Flex>
        <Form.Item<FieldType>
          name='trust'
          valuePropName='checked'
          wrapperCol={{ offset: 6, span: 16 }}
        >
          <Checkbox>I trust this device</Checkbox>
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
