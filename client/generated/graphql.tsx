import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  bye: Scalars['String'];
  users: Array<User>;
  me?: Maybe<User>;
  linkFeed: Array<Link>;
};


export type QueryLinkFeedArgs = {
  skip: Scalars['Int'];
  limit: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  email: Scalars['String'];
  linksArray: Array<Scalars['Int']>;
  hiddenLinksArray: Array<Scalars['Int']>;
};

export type Link = {
  __typename?: 'Link';
  id: Scalars['Int'];
  url: Scalars['String'];
  domain: Scalars['String'];
  description: Scalars['String'];
  postedBy: Scalars['String'];
  votes: Scalars['Int'];
  voters: Array<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};


export type Mutation = {
  __typename?: 'Mutation';
  logout: Scalars['Boolean'];
  revokeRefreshTokensForUser: Scalars['Boolean'];
  login: LoginResponse;
  register: LoginResponse;
  addLinktoLinksArray: Scalars['Boolean'];
  hideLink: HiddenLinksArrayResponse;
  unhideLink: Array<Scalars['Int']>;
  removeLinkFromLinksArray: Scalars['Boolean'];
  createLink: Link;
  updateLink: Scalars['Boolean'];
  deleteLink: Scalars['Boolean'];
  voteUp: Link;
  voteDown: Link;
};


export type MutationRevokeRefreshTokensForUserArgs = {
  userId: Scalars['Int'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationAddLinktoLinksArrayArgs = {
  email: Scalars['String'];
  linkId: Scalars['Int'];
  id: Scalars['Int'];
};


export type MutationHideLinkArgs = {
  email: Scalars['String'];
  linkId: Scalars['Int'];
  id: Scalars['Int'];
};


export type MutationUnhideLinkArgs = {
  email: Scalars['String'];
  linkId: Scalars['Int'];
  id: Scalars['Int'];
};


export type MutationRemoveLinkFromLinksArrayArgs = {
  email: Scalars['String'];
  linkId: Scalars['Int'];
  id: Scalars['Int'];
};


export type MutationCreateLinkArgs = {
  options: LinkInput;
};


export type MutationUpdateLinkArgs = {
  input: LinkUpdateInput;
  id: Scalars['Int'];
};


export type MutationDeleteLinkArgs = {
  id: Scalars['Int'];
};


export type MutationVoteUpArgs = {
  id: Scalars['Int'];
};


export type MutationVoteDownArgs = {
  id: Scalars['Int'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  user: User;
};

export type HiddenLinksArrayResponse = {
  __typename?: 'HiddenLinksArrayResponse';
  user: User;
};

export type LinkInput = {
  url: Scalars['String'];
  description: Scalars['String'];
};

export type LinkUpdateInput = {
  url?: Maybe<Scalars['String']>;
  domain?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  votes?: Maybe<Scalars['Int']>;
};

export type AddLinktoLinksArrayMutationVariables = Exact<{
  id: Scalars['Int'];
  linkId: Scalars['Int'];
  email: Scalars['String'];
}>;


export type AddLinktoLinksArrayMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addLinktoLinksArray'>
);

export type ByeQueryVariables = Exact<{ [key: string]: never; }>;


export type ByeQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'bye'>
);

export type CreateLinkMutationVariables = Exact<{
  url: Scalars['String'];
  description: Scalars['String'];
}>;


export type CreateLinkMutation = (
  { __typename?: 'Mutation' }
  & { createLink: (
    { __typename?: 'Link' }
    & Pick<Link, 'id' | 'description' | 'url'>
  ) }
);

export type DeleteLinkMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteLinkMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteLink'>
);

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hello'>
);

export type HideLinkMutationVariables = Exact<{
  id: Scalars['Int'];
  linkId: Scalars['Int'];
  email: Scalars['String'];
}>;


export type HideLinkMutation = (
  { __typename?: 'Mutation' }
  & { hideLink: (
    { __typename?: 'HiddenLinksArrayResponse' }
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'hiddenLinksArray' | 'linksArray'>
    ) }
  ) }
);

export type LinkFeedQueryVariables = Exact<{
  limit: Scalars['Int'];
  skip: Scalars['Int'];
}>;


export type LinkFeedQuery = (
  { __typename?: 'Query' }
  & { linkFeed: Array<(
    { __typename?: 'Link' }
    & Pick<Link, 'id' | 'url' | 'description' | 'postedBy' | 'votes' | 'createdAt' | 'domain'>
  )> }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'linksArray'>
    ) }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'linksArray' | 'hiddenLinksArray'>
  )> }
);

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'linksArray'>
    ) }
  ) }
);

export type RemoveLinkFromLinksArrayMutationVariables = Exact<{
  id: Scalars['Int'];
  linkId: Scalars['Int'];
  email: Scalars['String'];
}>;


export type RemoveLinkFromLinksArrayMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeLinkFromLinksArray'>
);

export type UpdateLinkMutationVariables = Exact<{
  id: Scalars['Int'];
  url?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  domain?: Maybe<Scalars['String']>;
}>;


export type UpdateLinkMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateLink'>
);

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'linksArray' | 'hiddenLinksArray'>
  )> }
);

export type VoteDownMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type VoteDownMutation = (
  { __typename?: 'Mutation' }
  & { voteDown: (
    { __typename?: 'Link' }
    & Pick<Link, 'id' | 'votes'>
  ) }
);

export type VoteUpMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type VoteUpMutation = (
  { __typename?: 'Mutation' }
  & { voteUp: (
    { __typename?: 'Link' }
    & Pick<Link, 'id' | 'votes'>
  ) }
);


export const AddLinktoLinksArrayDocument = gql`
    mutation addLinktoLinksArray($id: Int!, $linkId: Int!, $email: String!) {
  addLinktoLinksArray(id: $id, linkId: $linkId, email: $email)
}
    `;
export type AddLinktoLinksArrayMutationFn = Apollo.MutationFunction<AddLinktoLinksArrayMutation, AddLinktoLinksArrayMutationVariables>;

/**
 * __useAddLinktoLinksArrayMutation__
 *
 * To run a mutation, you first call `useAddLinktoLinksArrayMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddLinktoLinksArrayMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addLinktoLinksArrayMutation, { data, loading, error }] = useAddLinktoLinksArrayMutation({
 *   variables: {
 *      id: // value for 'id'
 *      linkId: // value for 'linkId'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useAddLinktoLinksArrayMutation(baseOptions?: Apollo.MutationHookOptions<AddLinktoLinksArrayMutation, AddLinktoLinksArrayMutationVariables>) {
        return Apollo.useMutation<AddLinktoLinksArrayMutation, AddLinktoLinksArrayMutationVariables>(AddLinktoLinksArrayDocument, baseOptions);
      }
export type AddLinktoLinksArrayMutationHookResult = ReturnType<typeof useAddLinktoLinksArrayMutation>;
export type AddLinktoLinksArrayMutationResult = Apollo.MutationResult<AddLinktoLinksArrayMutation>;
export type AddLinktoLinksArrayMutationOptions = Apollo.BaseMutationOptions<AddLinktoLinksArrayMutation, AddLinktoLinksArrayMutationVariables>;
export const ByeDocument = gql`
    query Bye {
  bye
}
    `;

/**
 * __useByeQuery__
 *
 * To run a query within a React component, call `useByeQuery` and pass it any options that fit your needs.
 * When your component renders, `useByeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useByeQuery({
 *   variables: {
 *   },
 * });
 */
export function useByeQuery(baseOptions?: Apollo.QueryHookOptions<ByeQuery, ByeQueryVariables>) {
        return Apollo.useQuery<ByeQuery, ByeQueryVariables>(ByeDocument, baseOptions);
      }
export function useByeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ByeQuery, ByeQueryVariables>) {
          return Apollo.useLazyQuery<ByeQuery, ByeQueryVariables>(ByeDocument, baseOptions);
        }
export type ByeQueryHookResult = ReturnType<typeof useByeQuery>;
export type ByeLazyQueryHookResult = ReturnType<typeof useByeLazyQuery>;
export type ByeQueryResult = Apollo.QueryResult<ByeQuery, ByeQueryVariables>;
export const CreateLinkDocument = gql`
    mutation CreateLink($url: String!, $description: String!) {
  createLink(options: {url: $url, description: $description}) {
    id
    description
    url
  }
}
    `;
export type CreateLinkMutationFn = Apollo.MutationFunction<CreateLinkMutation, CreateLinkMutationVariables>;

/**
 * __useCreateLinkMutation__
 *
 * To run a mutation, you first call `useCreateLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLinkMutation, { data, loading, error }] = useCreateLinkMutation({
 *   variables: {
 *      url: // value for 'url'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreateLinkMutation(baseOptions?: Apollo.MutationHookOptions<CreateLinkMutation, CreateLinkMutationVariables>) {
        return Apollo.useMutation<CreateLinkMutation, CreateLinkMutationVariables>(CreateLinkDocument, baseOptions);
      }
export type CreateLinkMutationHookResult = ReturnType<typeof useCreateLinkMutation>;
export type CreateLinkMutationResult = Apollo.MutationResult<CreateLinkMutation>;
export type CreateLinkMutationOptions = Apollo.BaseMutationOptions<CreateLinkMutation, CreateLinkMutationVariables>;
export const DeleteLinkDocument = gql`
    mutation DeleteLink($id: Int!) {
  deleteLink(id: $id)
}
    `;
export type DeleteLinkMutationFn = Apollo.MutationFunction<DeleteLinkMutation, DeleteLinkMutationVariables>;

/**
 * __useDeleteLinkMutation__
 *
 * To run a mutation, you first call `useDeleteLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLinkMutation, { data, loading, error }] = useDeleteLinkMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteLinkMutation(baseOptions?: Apollo.MutationHookOptions<DeleteLinkMutation, DeleteLinkMutationVariables>) {
        return Apollo.useMutation<DeleteLinkMutation, DeleteLinkMutationVariables>(DeleteLinkDocument, baseOptions);
      }
export type DeleteLinkMutationHookResult = ReturnType<typeof useDeleteLinkMutation>;
export type DeleteLinkMutationResult = Apollo.MutationResult<DeleteLinkMutation>;
export type DeleteLinkMutationOptions = Apollo.BaseMutationOptions<DeleteLinkMutation, DeleteLinkMutationVariables>;
export const HelloDocument = gql`
    query Hello {
  hello
}
    `;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
        return Apollo.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, baseOptions);
      }
export function useHelloLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, baseOptions);
        }
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = Apollo.QueryResult<HelloQuery, HelloQueryVariables>;
export const HideLinkDocument = gql`
    mutation hideLink($id: Int!, $linkId: Int!, $email: String!) {
  hideLink(id: $id, linkId: $linkId, email: $email) {
    user {
      id
      email
      hiddenLinksArray
      linksArray
    }
  }
}
    `;
export type HideLinkMutationFn = Apollo.MutationFunction<HideLinkMutation, HideLinkMutationVariables>;

/**
 * __useHideLinkMutation__
 *
 * To run a mutation, you first call `useHideLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHideLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [hideLinkMutation, { data, loading, error }] = useHideLinkMutation({
 *   variables: {
 *      id: // value for 'id'
 *      linkId: // value for 'linkId'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useHideLinkMutation(baseOptions?: Apollo.MutationHookOptions<HideLinkMutation, HideLinkMutationVariables>) {
        return Apollo.useMutation<HideLinkMutation, HideLinkMutationVariables>(HideLinkDocument, baseOptions);
      }
export type HideLinkMutationHookResult = ReturnType<typeof useHideLinkMutation>;
export type HideLinkMutationResult = Apollo.MutationResult<HideLinkMutation>;
export type HideLinkMutationOptions = Apollo.BaseMutationOptions<HideLinkMutation, HideLinkMutationVariables>;
export const LinkFeedDocument = gql`
    query LinkFeed($limit: Int!, $skip: Int!) {
  linkFeed(limit: $limit, skip: $skip) {
    id
    url
    description
    postedBy
    votes
    createdAt
    domain
  }
}
    `;

/**
 * __useLinkFeedQuery__
 *
 * To run a query within a React component, call `useLinkFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useLinkFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLinkFeedQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useLinkFeedQuery(baseOptions: Apollo.QueryHookOptions<LinkFeedQuery, LinkFeedQueryVariables>) {
        return Apollo.useQuery<LinkFeedQuery, LinkFeedQueryVariables>(LinkFeedDocument, baseOptions);
      }
export function useLinkFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LinkFeedQuery, LinkFeedQueryVariables>) {
          return Apollo.useLazyQuery<LinkFeedQuery, LinkFeedQueryVariables>(LinkFeedDocument, baseOptions);
        }
export type LinkFeedQueryHookResult = ReturnType<typeof useLinkFeedQuery>;
export type LinkFeedLazyQueryHookResult = ReturnType<typeof useLinkFeedLazyQuery>;
export type LinkFeedQueryResult = Apollo.QueryResult<LinkFeedQuery, LinkFeedQueryVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
    user {
      id
      email
      linksArray
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    email
    linksArray
    hiddenLinksArray
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!) {
  register(email: $email, password: $password) {
    accessToken
    user {
      id
      email
      linksArray
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const RemoveLinkFromLinksArrayDocument = gql`
    mutation removeLinkFromLinksArray($id: Int!, $linkId: Int!, $email: String!) {
  removeLinkFromLinksArray(id: $id, linkId: $linkId, email: $email)
}
    `;
export type RemoveLinkFromLinksArrayMutationFn = Apollo.MutationFunction<RemoveLinkFromLinksArrayMutation, RemoveLinkFromLinksArrayMutationVariables>;

/**
 * __useRemoveLinkFromLinksArrayMutation__
 *
 * To run a mutation, you first call `useRemoveLinkFromLinksArrayMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveLinkFromLinksArrayMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeLinkFromLinksArrayMutation, { data, loading, error }] = useRemoveLinkFromLinksArrayMutation({
 *   variables: {
 *      id: // value for 'id'
 *      linkId: // value for 'linkId'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useRemoveLinkFromLinksArrayMutation(baseOptions?: Apollo.MutationHookOptions<RemoveLinkFromLinksArrayMutation, RemoveLinkFromLinksArrayMutationVariables>) {
        return Apollo.useMutation<RemoveLinkFromLinksArrayMutation, RemoveLinkFromLinksArrayMutationVariables>(RemoveLinkFromLinksArrayDocument, baseOptions);
      }
export type RemoveLinkFromLinksArrayMutationHookResult = ReturnType<typeof useRemoveLinkFromLinksArrayMutation>;
export type RemoveLinkFromLinksArrayMutationResult = Apollo.MutationResult<RemoveLinkFromLinksArrayMutation>;
export type RemoveLinkFromLinksArrayMutationOptions = Apollo.BaseMutationOptions<RemoveLinkFromLinksArrayMutation, RemoveLinkFromLinksArrayMutationVariables>;
export const UpdateLinkDocument = gql`
    mutation UpdateLink($id: Int!, $url: String, $description: String, $domain: String) {
  updateLink(
    id: $id
    input: {url: $url, description: $description, domain: $domain}
  )
}
    `;
export type UpdateLinkMutationFn = Apollo.MutationFunction<UpdateLinkMutation, UpdateLinkMutationVariables>;

/**
 * __useUpdateLinkMutation__
 *
 * To run a mutation, you first call `useUpdateLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLinkMutation, { data, loading, error }] = useUpdateLinkMutation({
 *   variables: {
 *      id: // value for 'id'
 *      url: // value for 'url'
 *      description: // value for 'description'
 *      domain: // value for 'domain'
 *   },
 * });
 */
export function useUpdateLinkMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLinkMutation, UpdateLinkMutationVariables>) {
        return Apollo.useMutation<UpdateLinkMutation, UpdateLinkMutationVariables>(UpdateLinkDocument, baseOptions);
      }
export type UpdateLinkMutationHookResult = ReturnType<typeof useUpdateLinkMutation>;
export type UpdateLinkMutationResult = Apollo.MutationResult<UpdateLinkMutation>;
export type UpdateLinkMutationOptions = Apollo.BaseMutationOptions<UpdateLinkMutation, UpdateLinkMutationVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    id
    email
    linksArray
    hiddenLinksArray
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const VoteDownDocument = gql`
    mutation VoteDown($id: Int!) {
  voteDown(id: $id) {
    id
    votes
  }
}
    `;
export type VoteDownMutationFn = Apollo.MutationFunction<VoteDownMutation, VoteDownMutationVariables>;

/**
 * __useVoteDownMutation__
 *
 * To run a mutation, you first call `useVoteDownMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteDownMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteDownMutation, { data, loading, error }] = useVoteDownMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useVoteDownMutation(baseOptions?: Apollo.MutationHookOptions<VoteDownMutation, VoteDownMutationVariables>) {
        return Apollo.useMutation<VoteDownMutation, VoteDownMutationVariables>(VoteDownDocument, baseOptions);
      }
export type VoteDownMutationHookResult = ReturnType<typeof useVoteDownMutation>;
export type VoteDownMutationResult = Apollo.MutationResult<VoteDownMutation>;
export type VoteDownMutationOptions = Apollo.BaseMutationOptions<VoteDownMutation, VoteDownMutationVariables>;
export const VoteUpDocument = gql`
    mutation VoteUp($id: Int!) {
  voteUp(id: $id) {
    id
    votes
  }
}
    `;
export type VoteUpMutationFn = Apollo.MutationFunction<VoteUpMutation, VoteUpMutationVariables>;

/**
 * __useVoteUpMutation__
 *
 * To run a mutation, you first call `useVoteUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteUpMutation, { data, loading, error }] = useVoteUpMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useVoteUpMutation(baseOptions?: Apollo.MutationHookOptions<VoteUpMutation, VoteUpMutationVariables>) {
        return Apollo.useMutation<VoteUpMutation, VoteUpMutationVariables>(VoteUpDocument, baseOptions);
      }
export type VoteUpMutationHookResult = ReturnType<typeof useVoteUpMutation>;
export type VoteUpMutationResult = Apollo.MutationResult<VoteUpMutation>;
export type VoteUpMutationOptions = Apollo.BaseMutationOptions<VoteUpMutation, VoteUpMutationVariables>;