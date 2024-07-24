import { TalkProposalRepo } from "@/model/Proposal/repository";
import { ProposalOutput } from "@/model/Proposal/types";


export class ProposalAdapter {
    constructor(
        private readonly repository: TalkProposalRepo
    ) { }

    async insert(input: ForCreateProposal): Promise<void> {
        await this.repository.insert({
            ...input,
            topicIds: input.topics,
            statusId: input.status,
            attachmentsIds: [],
        })
    }

    async update({ id, input }: { id: number, input: Partial<ForUpdateProposal> }): Promise<void> {
        await this.repository.update(id, input)
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id)
    }

    async getById(id: number): Promise<ProposalControllerObject | null> {
        const result = await this.repository.getById(id)
        if (!result) return null
        return this.transform(result)
    }

    async listAll(): Promise<ProposalControllerObject[]> {
        const result = await this.repository.listAll()
        return result.map((proposal) => this.transform(proposal))
    }

    async filterBy(candidateId: string): Promise<ProposalControllerObject[]> {
        const result = await this.repository.filterBy(candidateId)
        return result.map((proposal) => this.transform(proposal))
    }

    private transform (input: ProposalOutput): ProposalControllerObject {
        return {
            ...input,
            status: ToController.status(input.statusId),
            topics: ToController.topics(input.topics)
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


// Definición del mapeo de estados fuera de la clase
const ProposalStatuses = {
    0: 'ENVIADA',
    1: 'EN_PROCESO',
    2: 'PRESELECCION',
    3: 'APROBADA',
    4: 'RECHAZADA'
} as const;

type ProposalStatus = typeof ProposalStatuses[keyof typeof ProposalStatuses];

export interface ForCreateProposal {
    title: string,
    abstract: string,
    estimatedDuration: number,
    status: number,
    streamed: boolean,
    uniqueCode: string,
    topics: number[],
    eventId: string,
    candidateId: string
}

export interface ForUpdateProposal {
    abstract: string,
    estimatedDuration: number,
    status: number,
    streamed: boolean,
}

export interface ProposalControllerObject {
    id: number;
    title: string;
    abstract: string;
    estimatedDuration: number;
    status: ProposalStatus;
    streamed: boolean;
    uniqueCode: string;
    topics: string[];
    candidate: { id: string; name: string };
    event: { id: string; name: string };
}



