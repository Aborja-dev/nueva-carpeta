import { ForCreateEventController } from "@/app/Event/types"
import { ProposalStatus } from "@/app/Proposal/types"
import { ForManageEventRepository } from "@/model/Event/interface"
import { ForManagerProposalRepository } from "@/model/Proposal/interface"
import { ForManageUserRepository } from "@/model/User/interface"
import { CustomError } from "@/utils/error/ServiceError"
import pc from "picocolors";
export class OrganizerService {
    private _userId: string | null = null
    private _events: string[] = []
    constructor(
        private readonly eventRepo: ForManageEventRepository,
        private readonly proposalRepo: ForManagerProposalRepository,
        private readonly userRepo: ForManageUserRepository
    ) { }
    createEvent = async (input: ForCreateEventController) => {
        await this.eventRepo.insert(input)
    }
    getMyEvent = async (id: string) => {
        return await this.eventRepo.search(id)
    }
    changeProposalStatus = async (listToUpdate: { id: number, status: ProposalStatus }[]) => {
        const proposalList = await this.proposalRepo.searchByEvent(this._events)
        const updatePromise = listToUpdate.map((updateItem) => {
            if (proposalList.some(proposal => proposal.id === updateItem.id)) {
                return this.proposalRepo.update({ id: updateItem.id, input: { status: updateItem.status } })
            }
        })
        Promise.all(updatePromise).then((info) => console.log(pc.green('updatePromise'), info));
        
    }
    getProposalsBystatus = async (status: ProposalStatus) => {
        return await this.proposalRepo.listByStatus(status)
    }
    setUserId = async (value: string) => {
        this._userId = await this.checkUser(value)
        await this.loadEvents(this._userId)
    }
    private async loadEvents(userId: string) {
        if (!this._userId) throw new CustomError({ where: 'organizer loadEvents', type: 'ServiceError', message: 'user not found or not exists' })
        const events = await this.eventRepo.listByOrganizer(userId)
        this._events = events.map(event => event.id)
    }
    async checkUser(value: string): Promise<string> {
        const user = await this.userRepo.search(value)
        if (!user) throw new CustomError({ where: 'organizer checkUser', type: 'BadRequest', message: 'user not found' })
        if (user.type !== 'ORGANIZER') throw new CustomError({ where: 'organizer checkUser', type: 'BadRequest', message: 'user is not a organizer' })
        return value
    }

}