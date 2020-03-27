import React, { useRef, FC } from 'react';
import Router from 'next/router';
import { Form } from '@unform/web';
import { SubmitHandler, FormHandles } from '@unform/core';
// @TODO pull in and set up yup
// import * as Yup from 'yup';

// get form controls used in component
import { InputC, ButtonC } from './form-controls';

// get generated custom GraphQL hook for register page
import { useRegisterMutation, MeDocument, MeQuery } from '../generated/graphql';

// get app librarie
// import { setAccessToken } from '../lib/utils';
import { useAuthDispatch, useAuthState } from '../lib/store/contexts';
import { setAccessToken } from '../lib/utils';
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

const RegisterForm: FC = () => {
  // unform requires some default data for initial render
  const initialValues: IUser = {
    email: '',
    password: '',
    type: ''
  };

  // initialize React hooks
  const formRef = useRef<FormHandles>(null);
  const [register] = useRegisterMutation();
  const authDispatch = useAuthDispatch();
  const { authStateContext } = useAuthState();

  const handleSubmit: SubmitHandler<ILoginUser> = async data => {
    /*
    
    Set client-side to 'login-start'
    Make async call to GraphQL back-end
    Handle successful response or throw an error

    */
    authDispatch({ type: 'register-start' });
    try {
      callGraphQLLogin(data);
    } catch (error) {
      console.log('error:::', error);
      return error;
    }
  };

  const callGraphQLLogin = async (data: ILoginUser) => {
    console.log('authState:::', authStateContext);
    /* 
      Call GraphQL back-end Api
      If successful:
        1) update client-side state w/ user info
        2) set the access token
        3) Push Router state to index page

      If not successful, throw an error

    */
    let { email, password } = data;
    const response = await register({
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
            me: data.register.user
          }
        });
      }
    });

    console.log('response::', response);

    //

    // Manage successful response
    // if (response && response.data && response.data.register) {
    if (response?.data?.register) {
      // 1) update client-side state w/ user info
      authDispatch({
        type: 'register-success',
        payload: response.data.register.user
      });
      // 2) set the access token
      setAccessToken(response.data.register.accessToken);
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
      <br />
      <div>
        <InputC name="password" type="password" placeholder="password" />
      </div>
      <div>
        <InputC
          name="password-confirm"
          type="password"
          placeholder="confirm password"
        />
      </div>
      <div>
        <ButtonC buttonType="submit" name="Sign Up!" />
      </div>
    </Form>
  );
};

export default RegisterForm;
