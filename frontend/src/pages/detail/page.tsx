import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { ProposalDetail } from '../../types/types'
import { ProposalDetailCard } from './PRoposalDetailCard'

const DetailPage = () => {
  const { proposal } = useLoaderData() as { proposal: ProposalDetail }
  return (
    <div className='mx-auto w-5/6'>
      <ProposalDetailCard proposal={proposal} />
    </div>
  )
}

export default DetailPage
