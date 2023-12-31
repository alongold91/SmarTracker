import { Button, Flex, Form, Input } from 'antd';
import style from './PasswordRestoration.module.css';
import React from 'react';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SecondaryButton from '../../components/buttons/SecondaryButton';

interface FieldType {
  choose_password: string;
  confirm_password: string;
}

const handleSubmit = (values: FieldType) => {
  console.log(values);
};

const ResetPassword = () => {
  return (
    <Flex
      component='section'
      justify='center'
      align='center'
      className={style.section}
    >
      <Form
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        autoComplete='off'
      >
        <h3 className={style.headline}>Reset your password</h3>

        <Form.Item<FieldType>
          label='Choose Password'
          name='choose_password'
          validateTrigger='onSubmit'
          rules={[{ required: true, message: 'Please enter your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          label='Confirm Password'
          name='confirm_password'
          validateTrigger='onSubmit'
          dependencies={['choose_password']}
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('choose_password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  'The two passwords that you entered do not match.'
                );
              }
            })
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Flex justify='center' gap='1rem'>
          <Form.Item className={style.button}>
          <PrimaryButton buttonText='Reset Password' htmlType='submit'/>
          </Form.Item>
          <Form.Item className={style.button}>
          <SecondaryButton buttonText='Go back to login screen' />
          </Form.Item>
        </Flex>
      </Form>
    </Flex>
  );
};

export default ResetPassword;
