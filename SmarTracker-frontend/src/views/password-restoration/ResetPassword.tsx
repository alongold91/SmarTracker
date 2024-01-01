import { Flex, Form, Input } from 'antd';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useLoginMutation,
  useResetPasswordMutation
} from '../../app-state/slices/rtk-query-slices/usersApiSlice';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SecondaryButton from '../../components/buttons/SecondaryButton';
import style from './PasswordRestoration.module.css';

interface FieldType {
  new_password: string;
  confirm_password: string;
}

interface DecodedResetToken {
  email: string;
  iat: number;
  exp: number;
}

const ResetPassword = () => {
  const [resetPassword, { isSuccess: resetMutationSuccessful }] =
    useResetPasswordMutation();
  const [login, { isSuccess: loginSuccessful }] = useLoginMutation();

  const { token } = useParams<{ token: string }>();

  const navigate = useNavigate();

  useEffect(() => {
    if (resetMutationSuccessful && loginSuccessful) {
      navigate('/dashboard/summary');
    }
  }, [resetMutationSuccessful, loginSuccessful]);

  const handleSubmit = async (values: FieldType) => {
    const { email } = jwtDecode<DecodedResetToken>(token as string);
    await resetPassword({
      resetToken: token as string,
      newPassword: values.new_password
    });
    login({ email, password: values.new_password });
  };

  const redirectToLoginPage = () => {
    navigate('/login');
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
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        autoComplete='off'
      >
        <h3 className={style.headline}>Reset your password</h3>

        <Form.Item<FieldType>
          label='Choose Password'
          name='new_password'
          validateTrigger='onSubmit'
          rules={[{ required: true, message: 'Please enter your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          label='Confirm Password'
          name='confirm_password'
          validateTrigger='onSubmit'
          dependencies={['new_password']}
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('new_password') === value) {
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
            <PrimaryButton buttonText='Reset Password' htmlType='submit' />
          </Form.Item>
          <Form.Item className={style.button}>
            <SecondaryButton buttonText='Go back to login screen' onClick={redirectToLoginPage} />
          </Form.Item>
        </Flex>
      </Form>
    </Flex>
  );
};

export default ResetPassword;
