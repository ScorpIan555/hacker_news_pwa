import React, { useRef, FC } from 'react';
import { Form } from '@unform/web';
import { SubmitHandler, FormHandles } from '@unform/core';
import FormControlInput from './form-controls/Input';
import ButtonC from './form-controls/Button';
// import { useRef } from 'react';
// import * as Yup from 'yup';

import { useLoginMutation, MeQuery, MeDocument } from '../generated/graphql';
import { setAccessToken } from '../lib/utils/accessToken';
import Router from 'next/router';
import { IUser } from '../lib/interfaces/IUser';

// const schema = Yup.object().shape({
//   email: Yup.string()
//     .email('Custom invalid email message')
//     .required('Custom required message'),
//   password: Yup.string()
//     .max(11)
//     .required()
// });

// interface FormData {
//   email:string;
//   password: string
// }

const LoginForm: FC = () => {
  const initialValues: IUser = {
    email: '',
    password: ''
  };

  console.log('initialValues::', initialValues);

  const formRef = useRef<FormHandles>(null);
  const [login] = useLoginMutation();

  const handleSubmit: SubmitHandler<IUser> = async data => {
    console.log('data:::', data);
    console.log('formRef:::', formRef.current);
    // submit logic here
    try {
      handleGraphQLRequest(data);
      return;
    } catch (err) {
      console.error(err);
    }
  };

  const handleGraphQLRequest = async (data: { email: any; password: any }) => {
    let { email, password } = data;

    try {
      const response = await login({
        variables: {
          email,
          password
        },
        update: (store, { data }) => {
          if (!data) {
            return null;
          }

          store.writeQuery<MeQuery>({
            query: MeDocument,
            data: {
              me: data.login.user
            }
          });
        }
      });

      console.log(response);

      if (response && response.data) {
        setAccessToken(response.data.login.accessToken);
      }

      Router.push('/');
    } catch (error) {
      console.log('handleGraphQLRequest.error:::', error);
    }
  };

  return (
    <Form ref={formRef} onSubmit={handleSubmit} initialData={initialValues}>
      <div>
        <FormControlInput name="email" type="email" placeholder="email" />
      </div>
      <div>
        <FormControlInput
          name="password"
          type="password"
          placeholder="password"
        />
      </div>

      <div>
        <ButtonC buttonType="submit" name="submit" />
      </div>
    </Form>
  );
};

export default LoginForm;
