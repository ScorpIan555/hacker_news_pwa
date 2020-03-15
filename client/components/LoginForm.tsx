import React, { useRef, FC, useEffect } from 'react';
import { Form } from '@unform/web';
import { SubmitHandler, FormHandles } from '@unform/core';
import ButtonC from './form-controls/Button';
// import { useRef } from 'react';
// import * as Yup from 'yup';

// import {componse} from 'lodash/fp'

import { useLoginMutation, MeQuery, MeDocument } from '../generated/graphql';
// import { setAccessToken } from '../lib/utils/accessToken';
// import Router from 'next/router';
import { IUser } from '../lib/typescript/IUser';
import { InputC } from './form-controls/Input';
import { tryCatch } from '../lib/utils/tryCatch';
import {
  useAuthDispatch,
  useAuthState
  // authDispatch
} from '../lib/store/contexts/authContext';

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

const LoginForm: FC = props => {
  const initialValues: IUser = {
    email: '',
    password: '',
    type: ''
  };

  console.log('initialValues::', initialValues);
  console.log('AnyProps:::', props);

  const formRef = useRef<FormHandles>(null);
  const [login] = useLoginMutation();
  const authDispatch = useAuthDispatch();
  const authState = useAuthState();

  useEffect(() => {
    console.log('useRef.formRef:::', formRef.current);
    console.log('authDispatch::', authDispatch);
    console.log('authState:::', authState);
  });

  /*
  ///  using this as a highlevel reference: https://medium.com/@nadeesha/a-practical-guide-to-writing-more-functional-javascript-db49409f71
          this submit needs to essentially go thru a compose/pipe series
          it shoud be aeries of functions that passes values thru the pipe
          and returns the value


          the side effects will be change nav & make an api call
          each of those should be their own function

          so ...

          const loginUser = (userData) => {
            const op = compose(
              callLoginMutation, x
              handleReturnValueAndOrToken,
              updateClientStore,
            )
          }



          I've created action types and the basic actions...
          need now to have the actions hit the async/curried loginReducer to update the clinet state 
          for right now, I'm going to continue to make the api call from the component
          apparentlly react suspense will be the new way to do this...


  ///  need to 
  ///
  /// 
  ///



  */

  const handleSubmit: SubmitHandler<IUser> = async data => {
    data.type = 'login';
    // let props = {
    //   data,
    //   login
    // };

    // signInStart(data); // needs to be a useDispatch()
    authDispatch({ type: 'login-start' });
    startGraphqlApiCall(data);
  };

  // const updateStateToLoading = () => {
  //   // const action = {
  //   //   type: 'login-start'
  //   // };
  //   // const draft = {

  //   // }
  //   // loginReducer(action);
  // };

  const startGraphqlApiCall = tryCatch({
    tryer: async (data: IUser) => {
      console.log('startGraphQLApiCall.data', data);
      // handleGraphQLRequest(data);
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

      return response;
    },
    catcher: (err: any) => {
      return err;
    }
  });

  // const handleSubmit: SubmitHandler<IUser> = async data => {
  //   // console.log('data:::', data);
  //   console.log('formRef.submit:::', formRef.current);
  //   // submit logic here
  //   try {
  //     handleGraphQLRequest(data);
  //     return;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const handleGraphQLRequest = async (data: { email: any; password: any }) => {
  //   console.log('handleGraphqlRequest::', data);
  //   let { email, password } = data;

  //   try {
  //     const response = await login({
  //       variables: {
  //         email,
  //         password
  //       },
  //       update: (store, { data }) => {
  //         if (!data) {
  //           return null;
  //         }

  //         store.writeQuery<MeQuery>({
  //           query: MeDocument,
  //           data: {
  //             me: data.login.user
  //           }
  //         });
  //       }
  //     });

  //     console.log(response);

  //     if (response && response.data) {
  //       setAccessToken(response.data.login.accessToken);
  //     }

  //     Router.push('/'); // prob can abstract this into a utility
  //   } catch (error) {
  //     console.log('handleGraphQLRequest.error:::', error);
  //   }
  // };

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
