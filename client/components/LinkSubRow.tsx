// import React from 'react';
import { themeGet } from '@styled-system/theme-get';
import {
  MeDocument,
  MeQuery,
  useHideLinkMutation,
  useMeQuery,
  useRemoveLinkFromLinksArrayMutation,
  useVoteDownMutation,
} from 'generated/graphql';
import { useAuthDispatch, useAuthState } from 'lib/store/contexts';
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
  const { data } = useMeQuery();
  const [removeLinkFromLinksArray] = useRemoveLinkFromLinksArrayMutation();
  const [hideLink] = useHideLinkMutation();
  // const [hideLink, {data, error}] = useHideLinkMutation({
  //   update (cache, { data }) {
  //     // We use an update function here to write the
  //     // new value of the GET_ALL_TODOS query.
  //     const newLinkFromResponse = data //
  //     console.log('newLinkFromResponse:::', newLinkFromResponse);
  //     const existingLinkList = cache.readQuery<LinkFeedQuery>({
  //       query: LinkFeedDocument,
  //     });

  //     /*
  //     User
  //     1) I need to overwrite the cache for the User result,
  //     because the hiddenLinkList is a property on the User,

  //     # also, user object is stored in the app state,
  //     I need to look into what cahnges to state these mutations
  //     will require.

  //     LinkFeed
  //     2) Re-run the LinkFeed Query with the new user object

  //     */

  //     if (existingLinkList && newLinkFromResponse) {
  //       cache.writeQuery({
  //         query: LinkFeedDocument,
  //         data: {
  //           linkFeed: [
  //             ...existingLinkList?.linkFeed ,
  //             newLinkFromResponse,
  //           ],
  //         },
  //       });
  //     }
  //   }
  // });
  // const {data} = useLinkFeedQuery(); won't need this b/c I'm reading from the cache.

  const { authStateContext } = useAuthState();
  const authDispatch = useAuthDispatch();

  // useEffect(() => {
  //   console.log('LinkSubRow', votes, postedBy, hoursAgo, linksArray, linkId);
  // }),
  //   [votes];

  const handleUnvoteClick = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const { user } = authStateContext;

    const { id, email }: { id: number; email: string } = user;

    try {
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
    // rerunMeQuery();
    updateStateAfterSuccessfulHandleUnvoteClickCall();
    try {
      await voteDown({
        variables: { id: linkId },
      });

      return; // I can either keep this and try to run that process thru GQL or I can just take the response object from this call (outside the graph) and plug it in....
    } catch (error) {
      console.log('error:::', error);
      return error;
    }
  };

  const updateStateAfterSuccessfulHandleUnvoteClickCall = () => {
    if (data && data.me) {
      authDispatch({ type: 'me-query-user-update', payload: data?.me });
    }
  };

  const handleHideClick = async (event: any) => {
    event?.preventDefault();
    console.log('handleHideClick.Hide:::', linkId);
    const { user } = authStateContext;
    const {
      id,
      email,
    }: {
      id: number;
      email: string;
      hiddleLinksArray: number[];
      linksArray: number[];
    } = user;

    await hideLink({
      variables: { id: id, linkId: linkId, email },

      update: (store, { data }) => {
        if (!data) {
          return null;
        }

        store.writeQuery<MeQuery>({
          query: MeDocument,

          data: {
            me: data.hideLink.user,
          },
        });
      },
    });

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
