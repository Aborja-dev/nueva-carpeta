import { ForManageEventRepository } from "@/model/Event/interface"
import { ForManagerProposalRepository } from "@/model/Proposal/interface"
import { ForManageUserRepository } from "@/model/User/interface"
import { PrismaClient } from "@prisma/client"

export interface ForDBManager<ConnectionType> {
    data: {
        eventStatus: any
        eventTypes: any
        event: any
        proposalsStatus: any
    }
    connection: ConnectionType
    close(): Promise<void>
    startTransaction(): Promise<void>
    commit(): Promise<void>
    rollback(): Promise<void>
    endTransaction(): Promise<void>
}

export class PrismaDBManager  {
    data: any = {}
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
    async loadData () {
        const eventStatus = await this.connection.eventStatus.findMany()
        const eventTypes = await this.connection.eventType.findMany()
        const eventList = await this.connection.event.findMany({
            select: {
                id: true,
                name: true,
            }
        })
        const proposalsStatus = await this.connection.proposalStatus.findMany()

        this.data['eventStatus'] = eventStatus 
        this.data['eventTypes'] = eventTypes
        this.data['event'] = eventList
        this.data['proposalsStatus'] = proposalsStatus

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
    await manager.loadData()
    return {
        repositories,
        manager
    }
}