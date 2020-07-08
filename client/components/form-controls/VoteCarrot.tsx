// import React from 'react';
import { useAuthState } from '../../lib/store/contexts';

import { VoteCarrotWrapper } from './VoteCarrot.style';

import {
  useVoteUpMutation,
  useUpdateLinksUserHasVotedForFieldMutation,
} from '../../generated/graphql';
import { IUser } from '../../lib/typescript/interfaces';
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

  console.log('VoteCarrot.voteForLink.votes:::', votes);
  console.log('VoteCarrot.id & user:::', id, user);
  console.log('typeof VoteCarrot.id:::', typeof id);
  // console.log('linksUserHasVotedFor:::', linksUserHasVotedFor);
  try {
    let res: any = await voteUp({
      variables: { id },
    });
    console.log('res:::', res);
    addLink(user, updateLinksUserHasVotedForField);

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

const VoteCarrot = ({ link }: any) => {
  // instantiate gql query
  const [voteUp] = useVoteUpMutation();
  const [
    updateLinksUserHasVotedForField,
  ] = useUpdateLinksUserHasVotedForFieldMutation();
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

  const voteForLinkProps = {
    id,
    voteUp,
    user,
    updateLinksUserHasVotedForField,
  };

  return (
    <VoteCarrotWrapper>
      <a onClick={() => voteForLink(voteForLinkProps)}>▲</a>
    </VoteCarrotWrapper>
  );
};

export default VoteCarrot;
