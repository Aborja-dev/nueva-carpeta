import { useNavigate } from 'react-router-dom'
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
}


const CreateProposalPage = () => {
  const navigate = useNavigate()
  const submitHandler = async (values: ProposalFormData) => {
    const proposal = createProposal(values)
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
      eventId: '03db1eec-8968-4f5f-b6eb-6345706f9b55',
      status: 'ENVIADA',
      uniqueCode: crypto.randomUUID(),
    }
  }
  return (
    <div>
      <button onClick={() => navigate(-1)}>Regresar</button>
      <div className='w-3/4 mx-auto'>
        <CreateForm onSubmit={submitHandler} />
      </div>
    </div>
  )
}

export default CreateProposalPage
