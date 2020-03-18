import React, { useRef, FC } from 'react';
import { Form } from '@unform/web';
import { SubmitHandler, FormHandles } from '@unform/core';
import ButtonC from './form-controls/Button';
// import * as Yup from 'yup';

import { useLoginMutation, MeQuery, MeDocument } from '../generated/graphql';
import { setAccessToken } from '../lib/utils/accessToken';
import Router from 'next/router';
import { IUser } from '../lib/typescript/IUser';
import { InputC } from './form-controls/Input';
import {
  useAuthDispatch,
  useAuthState
} from '../lib/store/contexts/authContext';

// @Todo need to add in Yum validations
// probably set this up in a util

// const schema = Yup.object().shape({
//   email: Yup.string()
//     .email('Custom invalid email message')
//     .required('Custom required message'),
//   password: Yup.string()
//     .max(11)
//     .required()
// });

/*
  Login Form Component

  Uses Unform form library which uses a React Ref to access the <input> DOM object
  
  Form Data is submitted and sent to the GraphQL back-end via a login mutation React hook

  Client-side state is managed in a React context and updated and accessed with React hooks
*/
const LoginForm: FC = () => {
  const initialValues: IUser = {
    email: '',
    password: '',
    type: ''
  };

  const formRef = useRef<FormHandles>(null);
  const [login] = useLoginMutation();
  const authDispatch = useAuthDispatch();
  const authState = useAuthState();

  const handleSubmit: SubmitHandler<IUser> = async data => {
    /*
    
    Set client-side to 'login-start'
    Make async call to GraphQL back-end
    Handle successful response or throw an error

    */
    authDispatch({ type: 'login-start' });
    try {
      const res = (await callGraphQLLogin)(data);

      return res;
    } catch (error) {
      console.log('error:::', error);
      return error;
    }
  };

  const callGraphQLLogin = async (data: IUser) => {
    console.log('authState:::', authState);
    /* 
      Call GraphQL back-end Api
      If successful:
        1) update client-side state w/ user info
        2) set the access token
        3) Push Router state to index page

      If not successful, throw an error

    */
    let { email, password } = data;
    const response = await login({
      variables: {
        email,
        password
      },
      update: (store, { data }) => {
        console.log('update.store:::', store);
        console.log('update.data:::', data);
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

    // manage successful response
    if (response && response.data) {
      console.log(
        'response.data.login.accessToken',
        response.data.login.accessToken
      );
      authDispatch({
        type: 'login-success',
        payload: response.data.login.user
      });
      setAccessToken(response.data.login.accessToken);
      Router.push('/');
    }

    return response;
  };

  return (
    <Form ref={formRef} onSubmit={handleSubmit} initialData={initialValues}>
      <div>
        <InputC name="email" type="email" placeholder="email" />
      </div>
      <div>
        <InputC name="password" type="password" placeholder="password" />
      </div>

      <div>
        <ButtonC buttonType="submit" name="submit" />
      </div>
    </Form>
  );
};

export default LoginForm;
