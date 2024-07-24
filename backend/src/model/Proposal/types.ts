export type ForInsertProposal = {
    title: string;
    topicIds: number[];
    abstract: string;
    estimatedDuration: number;
    streamed: boolean;
    eventId: string;
    candidateId: string;
    statusId: number;
    attachmentsIds: number[];
  };

  export type ForUpdateProposal = {
    abstract: string;
    estimatedDuration: number;
    streamed: boolean;
    candidateId: string;
    statusId: number;
    attachmentsIds: number[];
  };

  export interface ProposalOutput {
    id: number;
    eventId: string;
    candidateId: string;
    title: string;
    abstract: string;
    estimatedDuration: number;
    statusId: number;
    streamed: boolean;
    uniqueCode: string;
    topics: { name: string }[];
    candidate: { id: string; name: string };
    event: { id: string; name: string };
  }