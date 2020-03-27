import React, { useRef, FC } from 'react';
import Router from 'next/router';
import { Form } from '@unform/web';
import { SubmitHandler, FormHandles } from '@unform/core';

// @TODO pull in and set up yup
// import * as Yup from 'yup';

// get form controls used in component
import { InputC, Button } from './form-controls';

// get generated custom GraphQL hook for login page
import { useLoginMutation, MeQuery, MeDocument } from '../generated/graphql';

// get app libraries
import { setAccessToken } from '../lib/utils';
import { useAuthDispatch, useAuthState } from '../lib/store/contexts';
import { theme } from '../lib/theme';
import { IUser, ILoginUser } from '../lib/typescript/interfaces';

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
  // unform requires some default data for initial render
  const initialValues: IUser = {
    email: '',
    password: '',
    type: ''
  };

  // initialize React hooks
  const formRef = useRef<FormHandles>(null);
  const [login] = useLoginMutation();
  const authDispatch = useAuthDispatch();
  const authState = useAuthState();

  const handleSubmit: SubmitHandler<ILoginUser> = async data => {
    /*
    
    Set client-side to 'login-start'
    Make async call to GraphQL back-end
    Handle successful response or throw an error

    */
    authDispatch({ type: 'login-start' });
    try {
      callGraphQLLogin(data);
    } catch (error) {
      console.log('error:::', error);
      alert(error.message);
      return error;
    }
  };

  const callGraphQLLogin = async (data: ILoginUser) => {
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

    // Manage successful response
    if (response && response.data) {
      //
      // 1) update client-side state w/ user info
      authDispatch({
        type: 'login-success',
        payload: response.data.login.user
      });
      //
      // 2) set the access token
      setAccessToken(response.data.login.accessToken);
      //
      // 3) Push Router state to index page
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
        <Button buttonType="submit" name="Login!" theme={theme} />
      </div>
    </Form>
  );
};

export default LoginForm;
