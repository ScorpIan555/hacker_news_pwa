// import React from 'react';

import { VoteCarrotWrapper } from './VoteCarrot.style';

const voteForLink = () => {
  let numVotes = 0;
  let votes = numVotes + 1;
  console.log('VoteCarrot.voteForLink.votes:::', votes);
  return;
};

const VoteCarrot = (link: any) => {
  console.log('VoteCarrot.link:::', link);
  return (
    <VoteCarrotWrapper>
      <a onClick={voteForLink}>▲</a>
    </VoteCarrotWrapper>
  );
};

export default VoteCarrot;
