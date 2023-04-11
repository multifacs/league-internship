import React, { ChangeEvent, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { EditStoreInstance } from 'modules/Edit/store';
import './EditForm.css';
import { AddEntity } from 'domains/Form.entity';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  info: Yup.string().required('Info is required'),
  isImportant: Yup.bool(),
  isDone: Yup.bool(),
});

export const EditForm = () => {
  const { taskId } = useParams();

  console.log(taskId); // 👉️ {userId: '4200'}

  const defaultValues: AddEntity = {
    name: '',
    info: '',
    isImportant: false,
    isDone: false,
  };

  const { handleSubmit, reset, control, setValue } = useForm<AddEntity>({
    defaultValues: defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: AddEntity) => {
    console.log(data);
    EditStoreInstance.editTask(taskId as string, data);
  };

  const onNameChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => setValue('name', evt.target.value), []);
  const onInfoChange = (evt: ChangeEvent<HTMLInputElement>) => setValue('info', evt.target.value);
  const onIsImportantChange = (evt: ChangeEvent<HTMLInputElement>) => setValue('isImportant', evt.target.checked);
  const onIsDoneChange = (evt: ChangeEvent<HTMLInputElement>) => setValue('isDone', evt.target.checked);

  return (
    <div className="register-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Name</label>
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState: { error } }) => (
              <div>
                <input
                  value={field.value}
                  onChange={onNameChange}
                  type="text"
                  className={`form-control ${error?.message ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{error?.message}</div>
              </div>
            )}
          />
        </div>

        <div className="form-group">
          <label>Info</label>
          <Controller
            control={control}
            name="info"
            render={({ field, fieldState: { error } }) => (
              <div>
                <input
                  value={field.value}
                  onChange={onInfoChange}
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
          name="isImportant"
          render={({ field, fieldState: { error } }) => (
            <div className="form-group form-check">
              <input
                checked={field.value}
                onChange={onIsImportantChange}
                type="checkbox"
                className={`form-check-input ${error?.message ? 'is-invalid' : ''}`}
              />
              <label htmlFor="acceptTerms" className="form-check-label">
                isImportant
              </label>
              <div className="invalid-feedback">{error?.message}</div>
            </div>
          )}
        />

        <Controller
          control={control}
          name="isDone"
          render={({ field, fieldState: { error } }) => (
            <div className="form-group form-check">
              <input
                checked={field.value}
                onChange={onIsDoneChange}
                type="checkbox"
                className={`form-check-input ${error?.message ? 'is-invalid' : ''}`}
              />
              <label htmlFor="acceptTerms" className="form-check-label">
                isDone
              </label>
              <div className="invalid-feedback">{error?.message}</div>
            </div>
          )}
        />

        <div className="form-group form-row">
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
