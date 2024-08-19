/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLoaderData, useNavigate } from 'react-router-dom'
import { CreateForm } from './CreateForm'
import { CandidateRequest } from '../../services/api_gateway';
import { getSesion } from '../../services/service';
import { onErrorAlert, onSuccessAlert } from '../../utils/helpers';
import { ForCreateProposal } from '../../types/types';
export interface ProposalFormData {
  title: string;
  abstract: string;
  estimatedDuration: number;
  streamed: boolean;
  topics: string[];
  event: string;
}


const CreateProposalPage = () => {
  const navigate = useNavigate()
  const {event, topics} = useLoaderData() as {event: any, topics: any}
  console.log(event, topics);
  const submitHandler = async (values: ProposalFormData) => {
    const proposal = createProposal(values)
    debugger
    const result = await CandidateRequest.createOne(proposal)
    const ok = typeof result === 'string' ? false : true
    if (ok) {
      navigate('/')
      onSuccessAlert('Propuesta creada')
    } else {
      onErrorAlert(result)
    }

  }
  const createProposal = (input: ProposalFormData): ForCreateProposal => {
    const userID = getSesion()?.id
    return {
      ...input,
      candidateId: userID as string,
      eventId: input.event,
      status: 'ENVIADA',
      uniqueCode: crypto.randomUUID(),
    }
  }
  return (
    <div>
      <button onClick={() => navigate(-1)}>Regresar</button>
      <div className='w-3/4 mx-auto'>
        <CreateForm 
        onSubmit={submitHandler} 
        events={event.map((e: any) =>({id: e.id, value: e.name}))} 
        topics={topics.map((t: any) => ({id: t.name, value: t.name}))}/>
      </div>
    </div>
  )
}

export default CreateProposalPage
