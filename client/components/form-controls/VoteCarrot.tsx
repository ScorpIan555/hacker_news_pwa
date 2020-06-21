// import React from 'react';
import { useAuthState } from '../../lib/store/contexts';

import { VoteCarrotWrapper } from './VoteCarrot.style';

import { useVoteUpMutation } from '../../generated/graphql';

const voteForLink = async (
  voteUp: any,
  userId: number,
  linksUserHasVotedFor: string
) => {
  let numVotes = 0;
  let votes = numVotes + 1;
  console.log('VoteCarrot.voteForLink.votes:::', votes);
  console.log('VoteCarrot.userId:::', userId);
  console.log('linksUserHasVotedFor:::', linksUserHasVotedFor);
  voteUp(userId);
  return;
};

const VoteCarrot = (link: any) => {
  // instantiate gql query
  const [voteUp] = useVoteUpMutation();

  console.log('VoteCarrot.link:::', link);
  const { authStateContext } = useAuthState();
  console.log('authStateContext', authStateContext);
  console.log('authStateContext.user', authStateContext.user);
  let userId: any = authStateContext?.user?.id;
  let linksUserHasVotedFor: any = authStateContext?.user?.linksUserVotedFor;
  console.log('linksUserHasVotedFor:::', linksUserHasVotedFor);

  return (
    <VoteCarrotWrapper>
      <a onClick={() => voteForLink(voteUp, userId, linksUserHasVotedFor)}>▲</a>
    </VoteCarrotWrapper>
  );
};

export default VoteCarrot;
