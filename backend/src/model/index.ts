import { ForManageEventRepository } from "@/model/Event/interface"
import { ForManagerProposalRepository } from "@/model/Proposal/interface"
import { ForManageUserRepository } from "@/model/User/interface"
import { PrismaClient } from "@prisma/client"

export interface ForDBManager<ConnectionType> {
    connection: ConnectionType
    close(): Promise<void>
    startTransaction(): Promise<void>
    commit(): Promise<void>
    rollback(): Promise<void>
    endTransaction(): Promise<void>
}

export class PrismaDBManager implements ForDBManager<PrismaClient> {
    constructor(public readonly connection: PrismaClient) { }
    close(): Promise<void> {
        return this.connection.$disconnect()
    }
    startTransaction(): Promise<void> {
        throw new Error('Method not implemented.')
    }
    commit(): Promise<void> {
        throw new Error('Method not implemented.')
    }
    rollback(): Promise<void> {
        throw new Error('Method not implemented.')
    }
    endTransaction(): Promise<void> {
        throw new Error('Method not implemented.')
    }
}

export const compositionPrisma = async (): Promise<{
    repositories: {
        event: ForManageEventRepository
        user: ForManageUserRepository
        proposal: ForManagerProposalRepository
    }
    manager: ForDBManager<PrismaClient>
}> => {
    const client = new PrismaClient()
    const eventRepo = new (await import('./Event/repository')).EventRepo(client)
    const userRepo = new (await import('./User/repository')).UserRepo(client)
    const proposalRepo = new (await import('./Proposal/repository')).TalkProposalRepo(client)
    await proposalRepo.loadTopics()

    const repositories = {
        event: new (await import('./Event/adapter')).EventAdapter(eventRepo),
        user: new (await import('./User/adapter')).UserAdapter(userRepo),
        proposal: new (await import('./Proposal/adapter')).ProposalAdapter(proposalRepo),
    }
    const manager = new PrismaDBManager(client)
    return {
        repositories,
        manager
    }
}