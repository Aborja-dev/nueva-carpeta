import { ForCreateProposalController } from "@/app/Proposal/types";
import { ForManageEventRepository } from "@/model/Event/interface";
import { ForManagerProposalRepository } from "@/model/Proposal/interface";

export class CandidateService {
    constructor(
        private readonly eventRepo: ForManageEventRepository,
        private readonly proposalRepo: ForManagerProposalRepository
    ) {}
    getEvent = async (id: string) => {
        return await this.eventRepo.search(id)
    }
    makeProposal = async (input: ForCreateProposalController) => {
        await this.proposalRepo.insert(input)
    }
    getMyProposals = async (candidateId: string) => {
        return await this.proposalRepo.filterBy(candidateId)
    }
    checkMyProposal = async (id: number) => {
        return await this.proposalRepo.getById(id)
    }
}