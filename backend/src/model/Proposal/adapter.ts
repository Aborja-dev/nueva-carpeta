import { ForCreateProposalController, ForUpdateProposalController, ProposalControllerObject, ProposalStatus, ProposalStatuses } from "@/app/Proposal/types";
import { ForManagerProposalRepository } from "@/model/Proposal/interface";
import { TalkProposalRepo } from "@/model/Proposal/repository";
import { ProposalOutput } from "@/model/Proposal/types";
import { AdapterError } from "@/utils/error/AdapterError";
import { getIndexFromObject } from "@/utils/helpers";


export class ProposalAdapter implements ForManagerProposalRepository {
    constructor(
        private readonly repository: TalkProposalRepo
    ) { }

    async insert(input: ForCreateProposalController): Promise<void> {
        await this.repository.insert({
            ...input,
            topicIds: ToModel.topics(input.topics, this.repository.topics),
            statusId: ToModel.statusId(input.status),
            attachmentsIds: [],
        })
    }

    async update({ id, input }: { id: number, input: Partial<ForUpdateProposalController> }): Promise<void> {
        await this.repository.update(id, {
            ...input,
            statusId: input.status ? ToModel.statusId(input.status) : undefined,
            status: undefined,
        })
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id)
    }

    async getById(id: number, candidateId: string): Promise<ProposalControllerObject | null> {
        const result = await this.repository.getById(id, candidateId)
        if (!result) return null
        return this.transform(result)
    }

    async listAll(): Promise<ProposalControllerObject[]> {
        const result = await this.repository.listAll()
        return result.map((proposal) => this.transform(proposal))
    }

    async listByStatus(status: ProposalStatus): Promise<ProposalControllerObject[]> {
        const result = await this.repository.listByStatus(ToModel.statusId(status))
        return result.map((proposal) => this.transform(proposal))
    }

    async filterBy(candidateId: string): Promise<ProposalControllerObject[]> {
        const result = await this.repository.filterBy(candidateId)
        return result.map((proposal) => this.transform(proposal))
    }

    async searchByEvent(id: string[]): Promise<Pick<ProposalControllerObject, 'id' | 'title'>[]> {
        const result = await this.repository.searchByEvent(id)
        return result
    }

    private transform (input: ProposalOutput): ProposalControllerObject {
        return {
            ...input,
            status: ToController.status(input.statusId),
            topics: ToController.topics(input.topics)
        }
    }

    get topics () {
        return this.repository.topics
    }
}

const ToModel = {
    topics(topics: string[], topicsInDb: {id: number; name: string}[]): number[] {
        // transforma los topics de string a su id
        return topics.map(topicName => {
            const topic = topicsInDb.find(topic => topic.name.toUpperCase() === topicName.toUpperCase())
            if (!topic) throw new AdapterError('ProposalAdapter toModel topics',`topic ${topicName} not found`)
            return topic.id
        })
    },
    statusId(status: ProposalStatus): number {
        try {
            return getIndexFromObject(ProposalStatuses, status)
        } catch (error) {
            throw new AdapterError('Proposal Adapter status', 'invalid type')
        }
    }
}

const ToController = {
    status(statusId: number): ProposalStatus {
        const id = statusId as keyof typeof ProposalStatuses
        return ProposalStatuses[id]
    },
    topics(topics: { name: string; }[]): string[] {
        return topics.map(({ name }) => name)
    },
}





