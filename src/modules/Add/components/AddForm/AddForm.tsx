import React, { ChangeEvent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { AddStoreInstance } from 'modules/Add/store';
import './AddForm.css';

type UserSubmitForm = {
  username: string;
  password: string;
  acceptTerms: boolean;
};

const defaultValues: UserSubmitForm = {
  username: '',
  password: '',
  acceptTerms: false,
};

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required')
    .min(6, 'Username must be at least 6 characters')
    .max(20, 'Username must not exceed 20 characters'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(40, 'Password must not exceed 40 characters'),
  acceptTerms: Yup.bool().required('You must accept terms').oneOf([true], 'Accept Terms is required'),
});

export const AddForm = () => {
  const { handleSubmit, reset, control, setValue } = useForm<UserSubmitForm>({
    defaultValues: defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: UserSubmitForm) => {
    console.log(JSON.stringify(data, null, 2));
  };

  const onUsernameChange = (evt: ChangeEvent<HTMLInputElement>) => setValue('username', evt.target.value);
  const onPasswordChange = (evt: ChangeEvent<HTMLInputElement>) => setValue('password', evt.target.value);
  const onAcceptChange = (evt: ChangeEvent<HTMLInputElement>) => setValue('acceptTerms', evt.target.checked);

  return (
    <div className="register-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Username</label>
          <Controller
            control={control}
            name="username"
            render={({ field, fieldState: { error } }) => (
              <div>
                <input
                  value={field.value}
                  onChange={onUsernameChange}
                  type="text"
                  className={`form-control ${error?.message ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{error?.message}</div>
              </div>
            )}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <Controller
            control={control}
            name="password"
            render={({ field, fieldState: { error } }) => (
              <div>
                <input
                  value={field.value}
                  onChange={onPasswordChange}
                  type="password"
                  className={`form-control ${error?.message ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{error?.message}</div>
              </div>
            )}
          />
        </div>

        <Controller
          control={control}
          name="acceptTerms"
          render={({ field, fieldState: { error } }) => (
            <div className="form-group form-check">
              <input
                checked={field.value}
                onChange={onAcceptChange}
                type="checkbox"
                className={`form-check-input ${error?.message ? 'is-invalid' : ''}`}
              />
              <label htmlFor="acceptTerms" className="form-check-label">
                I have read and agree to the Terms
              </label>
              <div className="invalid-feedback">{error?.message}</div>
            </div>
          )}
        />

        <div className="form-group">
          <button type="reset" onClick={() => reset()} className="btn btn-warning float-right">
            Reset
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
