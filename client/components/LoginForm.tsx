import React, { useRef, FC } from 'react';
import { Form } from '@unform/web';
import { SubmitHandler, FormHandles } from '@unform/core';
import FormControlInput from './form-controls/Input';
import ButtonC from './form-controls/Button';
// import { useRef } from 'react';
// import * as Yup from 'yup';

interface FormData {
  email: string;
  password: string;
}

// const schema = Yup.object().shape({
//   email: Yup.string()
//     .email('Custom invalid email message')
//     .required('Custom required message'),
//   password: Yup.string()
//     .max(11)
//     .required()
// });

const LoginForm: FC = () => {
  const initialValues: FormData = {
    email: '',
    password: ''
  };

  const formRef = useRef<FormHandles>(null);

  const handleSubmit: SubmitHandler<FormData> = async data => {
    console.log('data:::', data);
    console.log('formRef:::', formRef.current);
    // submit logic here
    try {
      return;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form ref={formRef} onSubmit={handleSubmit} initialData={initialValues}>
      <FormControlInput name="email" type="email" />
      <FormControlInput name="password" type="password" />

      <ButtonC buttonType="submit" name="submit" />
    </Form>
  );
};

export default LoginForm;
