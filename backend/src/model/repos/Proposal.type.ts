import { TalkProposalModel } from "@/model/repos/entities"


export type ForInsertProposal = Pick<TalkProposalModel, 'title' | 'topicIds' | 'abstract' | 'estimatedDuration' | 'streamed' | 'eventId' | 'candidateId' | 'statusId' | 'attachmentsIds' >
export type ForUpdateProposal = Pick<TalkProposalModel,  'abstract' | 'estimatedDuration' | 'streamed' | 'statusId' | 'attachmentsIds' >