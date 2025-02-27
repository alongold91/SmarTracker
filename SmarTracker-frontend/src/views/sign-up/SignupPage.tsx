import classes from './Signup.module.css';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Button, Input } from 'antd';
// Define the validation schema with Zod
const formSchema = z
  .object({
    email: z.string().min(1, 'Email is required').email('Invalid email format'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string().min(1, 'Please confirm your password')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  });

type FormData = z.infer<typeof formSchema>;

const SignupPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };
  return (
    <section className={`horizontal-align ${classes['form-wrapper']}`}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <Controller
          name='email'
          control={control}
          render={({ field }) => (
            <div>
              <label>Email</label>
              <Input
                {...field}
                placeholder='Enter email'
                status={errors.email ? 'error' : ''}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
          )}
        />
        <Controller
          name='password'
          control={control}
          render={({ field }) => (
            <div>
              <label>Password</label>
              <Input.Password
                {...field}
                placeholder='Enter password'
                status={errors.password ? 'error' : ''}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>
          )}
        />

        <Controller
          name='confirmPassword'
          control={control}
          render={({ field }) => (
            <div>
              <label>Confirm Password</label>
              <Input.Password
                className={classes.test}
                {...field}
                placeholder='Confirm password'
                status={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && (
                <p>{errors.confirmPassword.message}</p>
              )}
            </div>
          )}
        />

        <Button type='primary' htmlType='submit' block>
          Submit
        </Button>
      </form>
    </section>
  );
};

export default SignupPage;
