import { ModelError } from "@model/ErrorHandler";
import { UserModel } from "@repos/entities";
import { ProposalStatuses } from "@model/types/enum";
import { PrismaClient } from "@prisma/client/extension";

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
  
  // Tipo para TalkProposal
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
  
  type ForInsertProposal = Pick<TalkProposalModel, 'title' | 'topicIds' | 'abstract' | 'estimatedDuration' | 'streamed' | 'eventId' | 'candidateId' | 'statusId' | 'attachmentsIds' >
  type ForUpdateProposal = Pick<TalkProposalModel,  'abstract' | 'estimatedDuration' | 'streamed' | 'statusId' | 'attachmentsIds' >
  export class TalkProposalRepo {

    constructor(
        private readonly dbConnection: PrismaClient
    ) {}
    async insert (input: ForInsertProposal): Promise<void> {
        const {title, topicIds, abstract, estimatedDuration, streamed, eventId, candidateId, statusId, attachmentsIds} = input
        try {
            await this.dbConnection.talkProposal.create({
                data: {
                    title,
                    topics: {
                        connect: topicIds.map(id => ({id}))
                    },
                    abstract,
                    estimatedDuration,
                    streamed,
                    event: {
                        connect: {id: eventId}
                    },
                    candidate: {
                        connect: {id: candidateId}
                    },
                    status: {
                        connect: {id: statusId}
                    },
                    attachments: {
                        connect: attachmentsIds.map(id => ({id}))
                    }
                }
            })
        } catch (error) {
            throw this.onError('insert', error.message, error)
        }
        
    }

    async getById (id: number): Promise<TalkProposalModel | null> {
        try {
            const proposal = await this.dbConnection.talkProposal.findUnique({
                where: {
                    id
                },
                include: {
                    topics: {
                        select: {
                            name: true
                        }
                    },
                    candidate: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    event: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            })
            return proposal
        } catch (error) {
            throw this.onError('getById', error.message, error)
        }
    }

    async listAll (): Promise<TalkProposalModel[]> {
        try {
            const proposals = await this.dbConnection.talkProposal.findMany({
                include: {
                    topics: {
                        select: {
                            name: true
                        }
                    },
                    candidate: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    event: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }})
            return proposals
        } catch (error) {
            throw this.onError('listAll', error.message, error)
        }
    }

    async filterBy (candidateId: string): Promise<TalkProposalModel[]> {
        try {
            const proposals = await this.dbConnection.talkProposal.findMany({
                where: {
                    candidateId
                },
                include: {
                    topics: {
                        select: {
                            name: true
                        }
                    },
                    candidate: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    event: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }})
            return proposals
        } catch (error) {
            throw this.onError('filterBy', error.message, error)
        }       
    }

    async update (id: number, input: Partial<ForUpdateProposal>): Promise<void> {
        try {
            await this.dbConnection.talkProposal.update({
                where: {
                    id
                },
                data: input
            })
        } catch (error) {
            throw this.onError('update', error.message, error)
        }
    }

    async delete (id: number): Promise<void> {
        try {
            await this.dbConnection.talkProposal.delete({
                where: {
                    id
                }
            })
        } catch (error) {
            throw this.onError('delete', error.message, error)
        }
    }
    private onError(where: string, message?: string, ...args: any) {
        throw new ModelError( `${this.constructor.name} ${where}`, message ?? 'Error' ,...args)
    }

  }