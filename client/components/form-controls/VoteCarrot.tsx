// import React from 'react';
import { useAuthState } from 'lib/store/contexts';
import { ILink } from 'lib/typescript/interfaces';
import { useEffect } from 'react';
import {
  useAddLinktoLinksArrayMutation,
  useVoteUpMutation,
} from '../../generated/graphql';
import { VoteCarrotWrapper } from './VoteCarrot.style';

// interface VoteCarrotInput {
//   link: object;
// }

const VoteCarrot = ({ link }: { link: ILink }) => {
  const [voteUp] = useVoteUpMutation();
  const [addLinktoLinksArray] = useAddLinktoLinksArrayMutation();
  const { authStateContext } = useAuthState();
  // const [link, setLink] = useState<ILink>(item);
  // const [linkObj, setLinkObj] = useState(link);

  // const
  // console.log('VoteCarrot....link, user, userId, linkId, email:::', link, user, userId, linkId, email)
  // const [linkOb, setLinkObj] = useState();
  // const [userId, setUserId] = useState();
  // const [linkId, setLinkId] = useState();

  useEffect(() => {
    // console.log('useEffect.linkObj', linkObj)
    console.log('useEffect.link:::', link);
    // setLink(item);
  }),
    [link?.id];

  const handleClick = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const { user } = authStateContext;

    const { id, email } = user;
    const linkId: number = link?.id;
    // console.log('id:::', id)
    // console.log('email:::', email);
    console.log('linkId2:::', linkId);

    // Now, I have to set this up as a type guard.

    try {
      console.log('variables:::', id, linkId, email);
      const res = await addLinktoLinksArray({
        variables: { id, linkId, email },
      });
      voteUpCall({ variables: { id: linkId } });
      return res;
    } catch (error) {
      console.log('error:::', error);
      // throw new Error()
    }
  };

  const voteUpCall = async ({ variables: { id: linkId } }: any) => {
    try {
      const res = await voteUp({
        variables: { id: linkId },
      });
      return res;
    } catch (error) {
      console.log('error:::', error);
    }
  };

  return (
    <VoteCarrotWrapper>
      {/* {linksArray.includes(linkId) ? <a style={{visibility: "hidden"}}> ▲ </a> : <a onClick={handleClick}> ▲ </a> } */}
      <a onClick={handleClick}> ▲ </a>
    </VoteCarrotWrapper>
  );
};

export default VoteCarrot;
