import { ForUpdateProposal, ProposalOutput, ForInsertProposal } from "@/model/Proposal/types"
import { ModelError } from "@/utils/error/ModelError"
import { PrismaClient } from "@prisma/client"


export class TalkProposalRepo  {
    private _topics: { name: string, id: number }[] = []
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
        } catch (error: any) {
            throw this.onError('insert', error.message, error)
        }
        
    }

    async getById (id: number, candidateId: string): Promise<ProposalOutput | null> {
        try {
            const proposal = await this.dbConnection.talkProposal.findUnique({
                where: {
                    id: id,
                    candidateId: candidateId
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
        } catch (error: any) {
            throw this.onError('getById', error.message, error)
        }
    }

    async listAll (): Promise<ProposalOutput[]> {
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
        } catch (error: any) {
            throw this.onError('listAll', error.message, error)
        }
    }

    async filterBy (candidateId: string): Promise<ProposalOutput[]> {
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
        } catch (error: any) {
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
        } catch (error: any) {
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
        } catch (error: any) {
            throw this.onError('delete', error.message, error)
        }
    }
    private onError(where: string, message?: string, ...args: any) {
        throw new ModelError( `${this.constructor.name} ${where}`, message ?? 'Error' ,...args)
    }
    get topics(): { name: string, id: number }[] {
        return this._topics
    }
    public async loadTopics() {
        const topics  = await this.dbConnection.topic.findMany({
            select: {
                name: true,
                id: true
            }
        })
        this._topics = topics
    }
  }
