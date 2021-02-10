// import React from 'react';
import { themeGet } from '@styled-system/theme-get';
import {
  useRemoveLinkFromLinksArrayMutation,
  useVoteUpMutation
} from 'generated/graphql';
import { useAuthState } from 'lib/store/contexts';
import { SyntheticEvent, useEffect } from 'react';
import styled from 'styled-components';

const SubRow = styled.div`
  margin-left: 10px;
  font-size: ${themeGet('fontSizes.2', '12')}px;
  color: #828282;
`;

const LinkSubRow = ({
  votes,
  postedBy,
  hoursAgo,
  linksArray,
  linkId,
  isLinkHidden,
  handleHideClick
}: {
  votes: number;
  postedBy: string;
  hoursAgo: string;
  linksArray: number[];
  linkId: number;
  isLinkHidden: boolean;
  handleHideClick: SyntheticEvent
}) => {
  const [voteDown] = useVoteUpMutation();
  const [removeLinkFromLinksArray] = useRemoveLinkFromLinksArrayMutation();
  const { authStateContext } = useAuthState();

  useEffect(() => {
    console.log(
      'LinkSubRow',
      votes,
      postedBy,
      hoursAgo,
      linksArray,
      linkId,
      isLinkHidden
    );
  });

  const handleUnvoteClick = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const { user } = authStateContext;

    const { id, email }: {id: number, email: string} = user;
    // const linkId: number = link?.id;
    // console.log('id:::', id)
    // console.log('email:::', email);
    console.log('linkId2:::', linkId);

    try {
      console.log('variables:::', id, linkId, email);
      const res = await removeLinkFromLinksArray({
        variables: { id, linkId, email },
      });
      voteDownCall({ variables: { id: linkId } });
      return res;
    } catch (error) {
      console.log('error:::', error);
      // throw new Error()
    }
  };

  const voteDownCall = async ({ linkId }) => {
    console.log('linkId:::', linkId);
    try {
      const res = await voteDown({
        variables: { id: linkId },
      });
      return res;
    } catch (error) {
      console.log('error:::', error);
    }
  };



  return (
    <SubRow>
      {votes} points by: {postedBy}
      {hoursAgo}
      {linksArray?.includes(linkId) ? (
        <a onClick={handleUnvoteClick}>'| unvote |'</a>
      ) : null}
      {linksArray?.includes(linkId) ? (
        <a onClick={handleHideClick}>'| hide |'</a>
      ) : null}
      {/* {'| hide link |'} */}
      {' # comments'}
    </SubRow>
  );
};

export default LinkSubRow;
