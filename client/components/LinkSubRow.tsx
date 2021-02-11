// import React from 'react';
import { themeGet } from '@styled-system/theme-get';
import {
  useHideLinkMutation,
  useRemoveLinkFromLinksArrayMutation,
  useVoteDownMutation
} from 'generated/graphql';
import { useAuthState } from 'lib/store/contexts';
import { useEffect } from 'react';
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
  hiddenLinksArray,
  linkId,
}: {
  votes: number;
  postedBy: string;
  hoursAgo: string;
  linksArray: number[];
  hiddenLinksArray: number[];
  linkId: number;
}) => {
  const [voteDown] = useVoteDownMutation();
  const [removeLinkFromLinksArray] = useRemoveLinkFromLinksArrayMutation();
  const [hideLink] = useHideLinkMutation();

  const { authStateContext } = useAuthState();

  useEffect(() => {
    console.log('LinkSubRow', votes, postedBy, hoursAgo, linksArray, linkId);
  });

  const handleUnvoteClick = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const { user } = authStateContext;

    const { id, email }: { id: number; email: string } = user;
    // const linkId: number = link?.id;
    // console.log('id:::', id)
    // console.log('email:::', email);
    console.log('linkId2:::', linkId);

    try {
      console.log('removeLinkFromLinksArray.variables:::', id, linkId, email);
      await removeLinkFromLinksArray({
        variables: { id, linkId, email },
      });

      return voteDownCall({ linkId });
    } catch (error) {
      console.log('error:::', error);
      // throw new Error()
    }
  };

  const voteDownCall = async ({ linkId }: { linkId: number }) => {
    console.log('voteDownCall.linkId:::', linkId);
    try {
      const res = await voteDown({
        variables: { id: linkId },
      });
      return res;
    } catch (error) {
      console.log('error:::', error);
    }
  };

  const handleHideClick = async () => {
    event.preventDefault();
    console.log('handleHideClick.Hide:::', linkId);
    const { user } = authStateContext;
    const {
      id,
      email,
    }: { id: number; email: string; hiddleLinksArray: number[] } = user;

    await hideLink({
      variables: { id: id, linkId: linkId, email },
    });
  };

  return (
    <SubRow>
      {votes} points by: {postedBy}
      {hoursAgo}
      {linksArray?.includes(linkId) ? (
        <a onClick={handleUnvoteClick}>'| unvote |'</a>
      ) : null}
      {hiddenLinksArray?.includes(linkId) ? null : (
        <a onClick={handleHideClick}>'| hide |'</a>
      )}
      {/* {'| hide link |'} */}
      {' # comments'}
    </SubRow>
  );
};

export default LinkSubRow;
