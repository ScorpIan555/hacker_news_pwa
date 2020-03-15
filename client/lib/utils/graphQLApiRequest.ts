import { useLoginMutation, MeDocument, MeQuery } from '../../generated/graphql';
import { setAccessToken } from './accessToken';
// import { Router } from 'next/router';

const [login] = useLoginMutation();

export const handleGraphQLRequesttt = async (data: {
  email: any;
  password: any;
}) => {
  console.log('handleGraphqlRequest::', data);
  let { email, password } = data;
  console.log('handleGraphqlRequest.data:::', data);

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

    // Router.push('/'); // prob can abstract this into a utility
  } catch (error) {
    console.log('handleGraphQLRequest.error:::', error);
  }
};
