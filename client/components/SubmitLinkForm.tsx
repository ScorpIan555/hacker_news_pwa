import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import { useRouter } from 'next/router';
import React, { FC, useRef } from 'react';
import { useCreateLinkMutation, useMeQuery } from '../generated/graphql';
import { useAuthState } from '../lib/store/contexts';
import { theme } from '../lib/theme';
import { Button, InputC } from './form-controls';

// import Router from 'next/router';

interface ILinkSubmission {
  url: string;
  description: string;
  postedBy: string;
}

const SubmitLinkForm: FC = () => {
  const initialValues: ILinkSubmission = {
    url: '',
    description: '',
    postedBy: '',
  };

  // initialize React/GraphQL hooks
  const formRef = useRef<FormHandles>(null);

  const { authStateContext } = useAuthState();
  const { data } = useMeQuery();
  const [createLink] = useCreateLinkMutation();

  const router = useRouter(); 

  const handleSubmit: SubmitHandler<ILinkSubmission> = async (link) => {
    console.log('authState:::', authStateContext);
    console.log('data::: ', data); // not sure if I wanna use the query directly or can i just use the authStateContext

    if (data?.me === null) {
      router.push('/login');
    } else {
      try {
        submitToGraphQL(link);
      } catch (error) {
        console.log('error:::', error);
        return error;
      }
    }
  };

  const submitToGraphQL = async (link: ILinkSubmission) => {
    console.log('data:::', link);
    let { url, description } = link;

    const response = await createLink({
      variables: { url, description },
    });

    if (response) {
      console.log('submit link response:::', response);
      // Router.push('/');
      router.push('/');
    }
    return response;
  };

  return (
    <Form ref={formRef} onSubmit={handleSubmit} initialData={initialValues}>
      <div>
        <InputC name="url" type="text" placeholder="url" />
      </div>
      <div>
        <InputC name="description" type="text" placeholder="description" />
      </div>

      <div>
        <Button buttonType="submit" name="Submit!" theme={theme} />
      </div>
    </Form>
  );
};

export default SubmitLinkForm;
