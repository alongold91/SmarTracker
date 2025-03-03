import classes from './Signup.module.css';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Button, Checkbox, Flex, Input, InputNumber, Select } from 'antd';
// Define the validation schema with Zod
const formSchema = z
  .object({
    email: z.string().min(1, 'Email is required').email('Invalid email format'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    homeCurrency: z.string().min(1, 'Please select a currency'),
    interestedInWarningEmails: z.boolean(),
    warningPercentage: z.number().refine((data) => data >= 0 && data <= 100, {
      message: 'Warning percentage must be between 0 and 100'
    })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  });

type FormData = z.infer<typeof formSchema>;

const SignupPage = () => {
  const {
    control,
    getValues,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      homeCurrency: '',
      interestedInWarningEmails: false,
      warningPercentage: undefined
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
        <Controller
          name='homeCurrency'
          control={control}
          render={({ field }) => (
            <div className={`${classes['full-row']} ${classes['select']}`}>
              <label>Select Currency</label>
              <Select {...field} placeholder='Select currency'>
                <Select.Option value='USD'>USD</Select.Option>
                <Select.Option value='EUR'>EUR</Select.Option>
              </Select>
              {errors.homeCurrency && <p>{errors.homeCurrency.message}</p>}
            </div>
          )}
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Controller
            name='interestedInWarningEmails'
            control={control}
            render={({ field }) => (
              <div>
                <label style={{ fontSize: '12px', marginRight: '5px' }}>
                  Notify me when expenses reach a budget percentage{' '}
                </label>
                <Checkbox {...field} checked={getValues('interestedInWarningEmails')} />
                {errors.interestedInWarningEmails && (
                  <p>{errors.interestedInWarningEmails.message}</p>
                )}
              </div>
            )}
          />
          <Controller
            name='warningPercentage'
            control={control}
            render={({field}) => (
              <Flex align='center' gap='.5rem'>
                <InputNumber
                  {...field}
                  disabled={!watch('interestedInWarningEmails')}
                  style={{ width: '30%' }} //TODO: GIVE IT A CLASS
                 
                />
                <p>%</p>
                // TODO: ADD ERROR TEXT
              </Flex>
            )}
          />
        </div>

        <Button type='primary' htmlType='submit' block>
          Submit
        </Button>
      </form>
    </section>
  );
};

export default SignupPage;
