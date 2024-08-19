
import { useLoaderData, useNavigate } from 'react-router-dom'
import { ProposalDetail } from '../../types/types'
import { ProposalDetailCard } from './PRoposalDetailCard'
import { useState } from 'react'
import UpdateForm from './UpdateForm'
import { CandidateRequest } from '../../services/api_gateway'
import { onErrorAlert, onSuccessAlert } from '../../utils/helpers'

const DetailPage = () => {
  const navigate = useNavigate()
  const [state, setState] = useState<"DETAIL" | "UPDATE">("DETAIL")
  const { proposal } = useLoaderData() as { proposal: ProposalDetail }
  const updateHandler = (id, values) => {
    const result = CandidateRequest.update(id, values)
    if (typeof result === 'string') {
      onErrorAlert(result)
    } else {
      setState('DETAIL')
      onSuccessAlert('Propuesta actualizada')
    }
    
  }
  return (
    <div className='mx-auto w-5/6'>
      {
        state === 'UPDATE'
        ? <UpdateForm onSubmit={updateHandler} proposal={proposal} />
        : <ProposalDetailCard proposal={proposal} />

      }
      
      {
        state === 'DETAIL'
          ? (<button className='mr-4' onClick={() => { setState('UPDATE') }}>Edit</button>)
          : (<button className='mr-4' onClick={() => { setState('DETAIL') }}>Ver detalles</button>)
      }
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  )
}

export default DetailPage
