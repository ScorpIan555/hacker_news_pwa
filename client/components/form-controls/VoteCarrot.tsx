// import React from 'react';
import { useAuthState } from 'lib/store/contexts';
import { useEffect } from 'react';
import {
  useUpdateLinksArrayMutation,
  useVoteUpMutation
} from '../../generated/graphql';
import { VoteCarrotWrapper } from './VoteCarrot.style';

interface VoteCarrotInput {
  link: object;
  user: object;
  userId: number;
  linkId: number;
  email: string;
}

const VoteCarrot = ({ link, linkId }: VoteCarrotInput) => {
  const [voteUp] = useVoteUpMutation();
  const [updateLinksArray] = useUpdateLinksArrayMutation();
  const {authStateContext} = useAuthState();
  // const [linkObj, setLinkObj] = useState(link);
  
  // const 
  // console.log('VoteCarrot....link, user, userId, linkId, email:::', link, user, userId, linkId, email)
  // const [linkOb, setLinkObj] = useState();
  // const [userId, setUserId] = useState();
  // const [linkId, setLinkId] = useState();

  useEffect(() => {
    // console.log('useEffect.linkObj', linkObj)
    console.log('useEffect.link:::', link );

  })
    

  const handleClick = async (event) => {
    
    event.preventDefault();
    const {user} = authStateContext;
    // console.log('link, user, userId, linkId, email:::', link, user, userId, linkId, email)
    // console.log(' user, userId, linkId, email:::', user, userId, linkId, email)
    // console.log('userId, linkId, email:::', userId, linkId, email)
    // console.log(' linkId, email:::', linkId, email)
    // console.log(' email:::', email)
    // // const id: number = userId;
    // console.log('link2:::', link);
    // console.log('user2:::', user);
    // console.log('userId2:::', userId);
    // console.log('linkId2:::', linkId);
    // console.log('email2:::', email)

    const { id, email} = user;
    const linkId: number = link?.id;
    // console.log('id:::', id)
    // console.log('email:::', email);
    console.log('linkId2:::', linkId);
    

    // Now, I have to set this up as a type guard.
     
try {
  console.log('variables:::', id, linkId, email)
  const res = await updateLinksArray({variables: {id, linkId, email}});
  voteUpCall({variables: {id: linkId}});
  return res;
} catch (error) {
  console.log('error:::', error);
  // throw new Error()
} 
  }

  const voteUpCall = async ({variables: {id: linkId}}) => {
    
    try {
      const res = await voteUp({
        variables: { id: linkId }
      });
      return res;
    } catch (error) {
        console.log('error:::', error)
    }
  }

  const {user} = authStateContext;
  let linksArray = []
  if( user !== null || undefined) {
    linksArray = user.linksArray
  }

  return (
    <VoteCarrotWrapper linkId={linkId}>
      {/* {linksArray.includes(linkId) ? <a style={{visibility: "hidden"}}> ▲ </a> : <a onClick={handleClick}> ▲ </a> } */}
       <a onClick={handleClick}> ▲ </a>
  </VoteCarrotWrapper>
  )
}

export default VoteCarrot;