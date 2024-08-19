import { CreateProposalSchema } from "@/app/Proposal/schema";
import { ForCreateProposalController, ForUpdateProposalController } from "@/app/Proposal/types";
import { ForManageEventRepository } from "@/model/Event/interface";
import { ForManagerProposalRepository } from "@/model/Proposal/interface";
import { ForManageUserRepository } from "@/model/User/interface";
import { CustomError } from "@/utils/error/ServiceError";

export class CandidateService {
    private _userId: string | null = null 
    constructor(
        private readonly eventRepo: ForManageEventRepository,
        private readonly proposalRepo: ForManagerProposalRepository,
        private readonly userRepo: ForManageUserRepository
    ) {}
    getEvent = async (id: string) => {
        return await this.eventRepo.search(id)
    }
    makeProposal = async (input: ForCreateProposalController) => {
        const event = await this.eventRepo.search(input.eventId)
        if (!event) throw new CustomError({where: 'candidate makeProposal', type: 'ServiceError', message: 'event not found'})
        const userCandidate = await this.userRepo.getById(input.candidateId)
        if (!userCandidate) throw new CustomError({where: 'candidate makeProposal', type: 'ServiceError', message: 'user not found'})
        CreateProposalSchema.parse(input)
        await this.proposalRepo.insert(input)
    }
    getMyProposals = async () => {
        if (!this._userId) throw new CustomError({where: 'candidate getMyProposals', type: 'ServiceError', message: 'user not found or not exists'})
        const proposals = await this.proposalRepo.filterBy(this._userId as string)
        return proposals.map(proposal => ({
            id: proposal.id,
            title: proposal.title,
            topics: proposal.topics,
            candidate: proposal.candidate.name,
            event: proposal.event.name,
            status: proposal.status
        }))
    }
    checkMyProposal = async (id: number) => {
        if (!this._userId) throw new CustomError({where: 'candidate checkMyProposal', type: 'ServiceError', message: 'user not found or not exists'})
        return await this.proposalRepo.getById(id, this._userId)
    }
    setUserId = async (value: string) => {
        this._userId = await this.checkUser(value)
    }
    update = async (id: number, input: Partial<ForUpdateProposalController>) => {
        const { abstract, streamed } = input
        if (!this._userId) throw new CustomError({where: 'candidate update', type: 'ServiceError', message: 'user not found or not exists'})
        const proposal = await this.proposalRepo.getById(id, this._userId as string)
        const belongsToCandidate = proposal?.candidate.id === this._userId
        if(!belongsToCandidate) throw new CustomError({where: 'candidate update', type: 'ServiceError', message: 'proposal does not belong to user'})
        await this.proposalRepo.update({id, input: {abstract, streamed}})
    }
    delete = async (id: number) => {
        if (!this._userId) throw new CustomError({where: 'candidate delete', type: 'ServiceError', message: 'user not found or not exists'})
        const proposal = await this.proposalRepo.getById(id, this._userId as string)
        const belongsToCandidate = proposal?.candidate.id === this._userId
        if(!belongsToCandidate) throw new CustomError({where: 'candidate delete', type: 'ServiceError', message: 'proposal does not belong to user'})
        await this.proposalRepo.delete(id)
    }
    async checkUser(value: string) {
        const user = await this.userRepo.search(value)
        if (!user) throw new CustomError({where: 'candidate checkUser', type: 'BadRequest', message: 'user not found'})
        if (user.type !== 'CANDIDATE') throw new CustomError({where: 'candidate checkUser', type: 'BadRequest', message: 'user is not a candidate'})
        return value
    }
}