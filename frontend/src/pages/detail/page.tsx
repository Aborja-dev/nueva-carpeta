import React from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { ProposalDetail } from '../../types/types'
import { ProposalDetailCard } from './PRoposalDetailCard'

const DetailPage = () => {
  const navigate = useNavigate()
  const { proposal } = useLoaderData() as { proposal: ProposalDetail }
  return (
    <div className='mx-auto w-5/6'>
      <ProposalDetailCard proposal={proposal} />
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  )
}

export default DetailPage
