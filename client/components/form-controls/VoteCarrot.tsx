// import React from 'react';
import { useAuthState } from 'lib/store/contexts'
import { useEffect } from 'react'
import {
  useAddLinktoLinksArrayMutation, useVoteUpMutation
} from '../../generated/graphql'
import { VoteCarrotWrapper } from './VoteCarrot.style'

interface VoteCarrotInput {
  link: object
  user: object
  userId: number
  linkId: number
  email: string
}

const VoteCarrot = ({ link, linkId }: VoteCarrotInput) => {
  const [voteUp] = useVoteUpMutation()
  const [addLinktoLinksArray] = useAddLinktoLinksArrayMutation()
  const { authStateContext } = useAuthState()
  // const [linkObj, setLinkObj] = useState(link);

  // const
  // console.log('VoteCarrot....link, user, userId, linkId, email:::', link, user, userId, linkId, email)
  // const [linkOb, setLinkObj] = useState();
  // const [userId, setUserId] = useState();
  // const [linkId, setLinkId] = useState();

  useEffect(() => {
    // console.log('useEffect.linkObj', linkObj)
    console.log('useEffect.link:::', link)
  })

  const handleClick = async (event) => {
    event.preventDefault()
    const { user } = authStateContext

    const { id, email } = user
    const linkId: number = link?.id
    // console.log('id:::', id)
    // console.log('email:::', email);
    console.log('linkId2:::', linkId)

    // Now, I have to set this up as a type guard.

    try {
      console.log('variables:::', id, linkId, email)
      const res = await addLinktoLinksArray({ variables: { id, linkId, email } })
      voteUpCall({ variables: { id: linkId } })
      return res
    } catch (error) {
      console.log('error:::', error)
      // throw new Error()
    }
  }

  const voteUpCall = async ({ variables: { id: linkId } }: any) => {
    try {
      const res = await voteUp({
        variables: { id: linkId },
      })
      return res
    } catch (error) {
      console.log('error:::', error)
    }
  }

  return (
    <VoteCarrotWrapper>
      {/* {linksArray.includes(linkId) ? <a style={{visibility: "hidden"}}> ▲ </a> : <a onClick={handleClick}> ▲ </a> } */}
      <a onClick={handleClick}> ▲ </a>
    </VoteCarrotWrapper>
  )
}

export default VoteCarrot
