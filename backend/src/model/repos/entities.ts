import { EventStatuses, EventTypes, ProposalStatuses, UserTypes } from "../types/enum";

export type UserModel = {
    id: string;
    name: string;
    email: string;
    type: UserTypes;
    typeId: number;
  };

  export type EventModel = {
    id: string;
    name: string;
    url: string;
    startingDate: Date;
    endingDate: Date;
    timezone: string;
    description: string;
    organizerId: string[];
    status: EventStatuses;
    statusId: number;

    type: EventTypes;
    typeId: number;

    proposalsStartingDate?: Date;
    proposalsEndingDate?: Date;
    bannerUrl?: string;
    location?: string;
};

export type TalkProposalModel = {
  id: number;

  event?: {
    id: string;
    name: string;
  };
  eventId: string;
  
  candidate?: {
    id: string;
    name: string;
  };
  candidateId: string;

  status?: ProposalStatuses;
  statusId: number;

  title: string;
  abstract: string;
  estimatedDuration: number;
  attachmentsIds: number[];
  streamed: boolean;
  uniqueCode: string;
  topicIds: number[];
  topics: {
      name: string;
  }[];
};

export type AttachmentOnProposal = {
  id: number;
  description?: string;
  alt?: string;
  url: string;
  file: string;
  proposal: TalkProposalModel;
  proposalId: number;
};

// Tipo para Topic
export type Topic = {
  id: number;
  name: string;
  description?: string;
  proposals: TalkProposalModel[];
};