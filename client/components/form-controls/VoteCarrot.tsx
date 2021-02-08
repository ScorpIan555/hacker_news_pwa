// import React from 'react';
import Router from 'next/router';
import {
  useUpdateLinksArrayMutation,
  useUpdateLinksUserHasVotedForFieldMutation, useVoteUpMutation
} from '../../generated/graphql';
import { useAuthState } from '../../lib/store/contexts';
import { IUser } from '../../lib/typescript/interfaces';
import { VoteCarrotWrapper } from './VoteCarrot.style';



// import { Router } from 'next/router';
// import { Redirect } from '../../lib/utils/redirect';
// import { IItem } from '../../lib/typescript/interfaces';

// import { IItem } from '../../lib/typescript/interfaces';

const voteForLink = async (voteForLinkProps: {
  id: any;
  voteUp: any;
  user: any;
  updateLinksUserHasVotedForField: any;
}) => {
  const {
    id,
    user,
    voteUp,
    updateLinksUserHasVotedForField,
  } = voteForLinkProps;
  let numVotes = 0;
  let votes = numVotes + 1;

  if (user === null) {
    //  https://stackoverflow.com/questions/58173809/next-js-redirect-from-to-another-page
    Router.push('/login');
    return;
  }

  console.log('VoteCarrot.voteForLink.votes:::', votes);
  console.log('VoteCarrot.id & user:::', id, user);
  console.log('typeof VoteCarrot.id:::', typeof id);
  // console.log('linksUserHasVotedFor:::', linksUserHasVotedFor);
  try {
    let res: any = await voteUp({
      variables: { id },
    });
    console.log('res:::', res);
    // addLink(user, updateLinksUserHasVotedForField);

    return;
  } catch (error) {
    console.log('error:::', error);
    console.error(error);
  }
};

const addLink = async (
  user: IUser | undefined,
  updateLinksUserHasVotedForField: any
) => {
  try {
    console.log('updateLinksUserHasVotedForField.user', user);

    // need to insert mutation
    await updateLinksUserHasVotedForField(user);

    return true;
  } catch (error) {
    console.log('error updateing UserHasVotedForField', error);
    console.error(error);
    return false;
  }
};

interface VoteCarrotInput {
  link: object;
  user: object;
  userId: number;
  linkId: number;
  email: string;
}

const VoteCarrot = ({ link, user, userId, linkId, email }: VoteCarrotInput) => {
  // instantiate gql queries
  const [voteUp] = useVoteUpMutation();
  const [
    updateLinksUserHasVotedForField,
  ] = useUpdateLinksUserHasVotedForFieldMutation();
  

  const [updateLinksArray] = useUpdateLinksArrayMutation();
  // const { link } = link;
  // let id: number = link?.id;
  // console.log('VoteCarrot.record', record);
  console.log('VoteCarrot.link:::', link);
  // let id: any = link?.id;
  console.log('VoteCarrot.link.id:::', link?.id);
  // console.log('VoteCarrot.link.url:::', link.?url);
  const { authStateContext } = useAuthState();
  console.log('authStateContext', authStateContext);
  console.log('authStateContext.user', authStateContext.user);
  // let userId: any = authStateContext?.user?.id;

  // let user: IUser | undefined = authStateContext?.user;
  // const {email} = authStateContext.user

  const handleClick = (event:any) => {
    event.preventDefault();

    updateLinksArray({variables: {userId, linkId, email}});

  }

  let linksUserHasVotedFor: any = authStateContext?.user?.linksUserHasVotedFor;
  console.log('linksUserHasVotedFor:::', linksUserHasVotedFor, user);

  const voteForLinkProps = {
    id: linkId,
    voteUp,
    user: user,
    updateLinksUserHasVotedForField,
  };

  // const updateLinksArrayProps = {
  //   userId, linkId, email
  // }: VoteCarrotInput

  return (
    <VoteCarrotWrapper>
      {/* <button onClick={() => {
        // voteForLink(voteForLinkProps)
        updateLinksArray(updateLinksArrayProps)
        }
      }>▲</button> */}
      <button onClick={handleClick}> ▲ </button>
    </VoteCarrotWrapper>
  );
};

export default VoteCarrot;
