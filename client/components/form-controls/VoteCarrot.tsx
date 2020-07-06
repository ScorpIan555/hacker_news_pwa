// import React from 'react';
import { useAuthState } from '../../lib/store/contexts';

import { VoteCarrotWrapper } from './VoteCarrot.style';

import { useVoteUpMutation } from '../../generated/graphql';
import { IUser } from '../../lib/typescript/interfaces';
// import { IItem } from '../../lib/typescript/interfaces';

// import { IItem } from '../../lib/typescript/interfaces';

const voteForLink = async (
  id: number,
  voteUp: any,
  user: IUser | undefined
  // userId: number,
  // linksUserHasVotedFor: string
) => {
  let numVotes = 0;
  let votes = numVotes + 1;
  // let input: any = {
  //   id: link?.id,
  //   linksUserHasVotedFor: linksUserHasVotedFor,
  // };

  console.log('VoteCarrot.voteForLink.votes:::', votes);
  console.log('VoteCarrot.id & user:::', id, user);
  console.log('typeof VoteCarrot.id:::', typeof id);
  // console.log('linksUserHasVotedFor:::', linksUserHasVotedFor);
  try {
    let res: any = await voteUp({
      variables: { id },
    });
    console.log('res:::', res);
    updateLinksUserHasVotedForField(user);

    return;
  } catch (error) {
    console.log('error:::', error);
    console.error(error);
  }
};

const updateLinksUserHasVotedForField = (user: IUser | undefined) => {
  try {
    console.log('updateLinksUserHasVotedForField.user', user);

    // need to insert mutation

    return;
  } catch (error) {
    console.log('error updateing UserHasVotedForField', error);
    console.error(error);
    return false;
  }
};

const VoteCarrot = ({ link }: any) => {
  // instantiate gql query
  const [voteUp] = useVoteUpMutation();
  // const { link } = link;
  // let id: number = link?.id;
  // console.log('VoteCarrot.record', record);
  console.log('VoteCarrot.link:::', link);
  let id: any = link?.id;
  console.log('VoteCarrot.link.id:::', link?.id);
  // console.log('VoteCarrot.link.url:::', link.?url);
  const { authStateContext } = useAuthState();
  console.log('authStateContext', authStateContext);
  console.log('authStateContext.user', authStateContext.user);
  // let userId: any = authStateContext?.user?.id;

  let user: IUser | undefined = authStateContext?.user;

  let linksUserHasVotedFor: any = authStateContext?.user?.linksUserHasVotedFor;
  console.log('linksUserHasVotedFor:::', linksUserHasVotedFor, user);

  return (
    <VoteCarrotWrapper>
      <a onClick={() => voteForLink(id, voteUp, user)}>▲</a>
    </VoteCarrotWrapper>
  );
};

export default VoteCarrot;
