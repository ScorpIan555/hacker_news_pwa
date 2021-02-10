// import React from 'react';
import { themeGet } from '@styled-system/theme-get'
import {
  useRemoveLinkFromLinksArrayMutation,
  useVoteUpMutation
} from 'generated/graphql'
import { useAuthState } from 'lib/store/contexts'
import { useEffect } from 'react'
import styled from 'styled-components'

const SubRow = styled.div`
  margin-left: 10px;
  font-size: ${themeGet('fontSizes.2', '12')}px;
  color: #828282;
`

const LinkSubRow = ({
  votes,
  postedBy,
  hoursAgo,
  linksArray,
  id,
}: {
  votes: number
  postedBy: string
  hoursAgo: string
  linksArray: number[]
  id: number
}) => {
  const [voteDown] = useVoteUpMutation()
  const [removeLinkFromLinksArray] = useRemoveLinkFromLinksArrayMutation()
  const { authStateContext } = useAuthState()

  useEffect(() => {
    console.log('LinkSubRow')
  })

  const handleClick = async (event: { preventDefault: () => void }) => {
    event.preventDefault()
    const { user } = authStateContext

    const { id, email } = user
    const linkId: number = link?.id
    // console.log('id:::', id)
    // console.log('email:::', email);
    console.log('linkId2:::', linkId)

    try {
      console.log('variables:::', id, linkId, email)
      const res = await removeLinkFromLinksArray({
        variables: { id, linkId, email },
      })
      voteDownCall({ variables: { id: linkId } })
      return res
    } catch (error) {
      console.log('error:::', error)
      // throw new Error()
    }
  }

  const voteDownCall = async ({ id: linkId }) => {
    try {
      const res = await voteDown({
        variables: { id: linkId },
      })
      return res
    } catch (error) {
      console.log('error:::', error)
    }
  }

  return (
    <SubRow>
      {votes} points by: {postedBy}
      {hoursAgo}
      {linksArray?.includes(id) ? (
        <a onClick={handleClick}>'| hide |'</a>
      ) : null}
      {/* {'| hide link |'} */}
      <a>'| Hide |'</a> {' # comments'}
    </SubRow>
  )
}

export default LinkSubRow
