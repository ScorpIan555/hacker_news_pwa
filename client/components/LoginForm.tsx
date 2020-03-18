import React, { useRef, FC, useEffect } from 'react';
import { Form } from '@unform/web';
import { SubmitHandler, FormHandles } from '@unform/core';
// import { ExecutionResult } from '';
import ButtonC from './form-controls/Button';
// import { useRef } from 'react';
// import * as Yup from 'yup';

import {
  useLoginMutation,
  MeQuery,
  MeDocument
  // LoginMutation // won't need if I continue to infer the type of 'response' in api call handler
} from '../generated/graphql';
import { setAccessToken } from '../lib/utils/accessToken';
import Router from 'next/router';
import { IUser } from '../lib/typescript/IUser';
import { InputC } from './form-controls/Input';
import { tryCatch } from '../lib/utils/tryCatch';
import {
  useAuthDispatch,
  useAuthState
} from '../lib/store/contexts/authContext';
// import { ExecutionResult } from '../lib/typescript/shit';

// const schema = Yup.object().shape({
//   email: Yup.string()
//     .email('Custom invalid email message')
//     .required('Custom required message'),
//   password: Yup.string()
//     .max(11)
//     .required()
// });

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
    // console.log('useRef.formRef:::', formRef.current);
    // console.log('authDispatch::', authDispatch);
    // console.log('authState:::', authState);
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
    authDispatch({ type: 'login-start' });
    try {
      const res: Promise<IUser> = (await startGraphqlApiCall)(data);

      {
        res ? handleSuccessfulResponse(res) : console.log('res === false ');
      }
      return res;
    } catch (error) {
      console.log('error:::', error);
      handleGQLError(); // needs to be rewritten
      return error;
    }
  };

  const handleGQLError = () => {
    console.error(`you shouldn't be seeing this error...`);
    console.log(`you should NOT be seeing this error`);
    return 'fuuuuuuuuuuck';
  };

  const callGraphQLLogin = async (data: IUser) => {
    console.log('authState:::', authState);
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

    // {
    //   response
    //     ? response.errors
    //       ? console.log('response.errors::', response.errors)
    //       : console.log('response.data:::', response.data)
    //     : null;
    // }

    return response;

    // {
    //   response != undefined ? handleSuccessfulResponse(response) : null;
    // }
  };

  const handleSuccessfulResponse = (response: any) => {
    console.log('handleSuccessfulResponse ran...', response);
    authDispatch({ type: 'login-success' });
    if (response && response.data) {
      setAccessToken(response.data.login.accessToken);
      Router.push('/');
    }
    console.log('flow control check check', response);

    // Router.push('/'); // prob can abstract this into a utility
    // https://sergiodxa.com/articles/redirects-in-next-the-good-way/

    return response;
  };

  const startGraphqlApiCall = tryCatch({
    tryer: async (data: IUser) => callGraphQLLogin(data),
    catcher: (props: any, error: any) => {
      authDispatch({ type: 'login-fail' });
      console.log('props', props);
      console.log('err', error);
      // throw new Error(`Unhandled GraphQL Error.  Fix this:${err.message}`);
      alert(`${error} you friggin' goober`);
      return error;
    }
    // tryer: async (data: IUser) => {
    //   console.log('startGraphQLApiCall.data', data);
    //   console.log('startGraphQLApiCall.AuthContext:::', authState);

    //   // handleGraphQLRequest(data);
    //   /* before memoizing
    //     reread this: https://kentcdodds.com/blog/usememo-and-usecallback

    //   */
    //   let { email, password } = data;
    //   const response = await login({
    //     variables: {
    //       email,
    //       password
    //     },
    //     update: (store, { data }) => {
    //       console.log('update.store:::', store);
    //       console.log('update.data:::', data);
    //       if (!data) {
    //         return null;
    //       }

    //       store.writeQuery<MeQuery>({
    //         query: MeDocument,
    //         data: {
    //           me: data.login.user
    //         }
    //       });
    //     }
    //   });
    //   console.log('log response:::', response);

    //   /*
    //     @TODO
    //     pull these into their own functions
    //   */
    //   authDispatch({ type: 'login-success' });
    //   if (response && response.data) {
    //     setAccessToken(response.data.login.accessToken);
    //   }

    //   Router.push('/'); // prob can abstract this into a utility
    //   return response;
    // },
  });

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