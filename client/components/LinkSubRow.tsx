// import React from 'react';
import { themeGet } from '@styled-system/theme-get';
import {
  LinkFeedDocument,
  LinkFeedQuery,
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
  const [hideLink, {data, error}] = useHideLinkMutation({
    update (cache, { data }) {
      // We use an update function here to write the 
      // new value of the GET_ALL_TODOS query.
      const newLinkFromResponse = data // 
      console.log('newLinkFromResponse:::', newLinkFromResponse);
      const existingLinkList = cache.readQuery<LinkFeedQuery>({
        query: LinkFeedDocument,
      });

      /*
      User
      1) I need to overwrite the cache for the User result, 
      because the hiddenLinkList is a property on the User,
      
      # also, user object is stored in the app state, 
      I need to look into what cahnges to state these mutations
      will require.
      
      LinkFeed
      2) Re-run the LinkFeed Query with the new user object


      */

      if (existingLinkList && newLinkFromResponse) {
        cache.writeQuery({
          query: LinkFeedDocument,
          data: {
            linkFeed: [
              ...existingLinkList?.linkFeed ,
              newLinkFromResponse,
            ],
          },
        });
      }
    }
  });
  // const {data} = useLinkFeedQuery(); won't need this b/c I'm reading from the cache.

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

    let data = {
      email,
    }

    await hideLink({
      variables: { id: id, linkId: linkId, email },
    
    // update: (store, { data }) => {
    //   if (!data) {
    //     return null;
    //   }

    //   store.writeQuery<MeQuery>({
    //     query: MeDocument,
    //     data: {
    //       me: data.hideLink  // what goes here???
    //     },
    //   });
    // },
    })

    /*

      Might wanna look into bringing the MeQuery in here.

      
    */
   
    // }),

    // update: (store, { linkId }) => {
    //   if (!data) {
    //     return null;
    //   }

    //   store.writeQuery<LinkFeedQuery>({
    //     query: LinkFeedDocument,
    //     data: {
    //       // me: data.login.user,
    //       linkFeed 
    //     },
    //   });
    // },
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
