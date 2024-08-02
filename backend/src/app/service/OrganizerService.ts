import CreateEventSchema from "@/app/Event/Schema"
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
    private _proposals: any[] = []
    constructor(
        private readonly eventRepo: ForManageEventRepository,
        private readonly proposalRepo: ForManagerProposalRepository,
        private readonly userRepo: ForManageUserRepository
    ) { }
    createEvent = async (input: ForCreateEventController) => {
        CreateEventSchema.parse(input)
        await this.eventRepo.insert(input)
    }
    getMyEvent = async (id: string) => {
        // revisa si el servicio tiene el id del usuario
        if (!this._userId) throw new CustomError({ where: 'organizer getMyEvent', type: 'ServiceError', message: 'user not found or not exists' })
        // busca el evento por su id
        const event = await this.eventRepo.search(id)
        // revisa si el evento existe
        if (!event) throw new CustomError({ where: 'organizer getMyEvent', type: 'ServiceError', message: 'event not found' })
        // revisa si el evento pertenece al usuario
        const isBelongs = event.organizers.some(organizer => organizer.id === this._userId)
        if (!isBelongs) throw new CustomError({ where: 'organizer getMyEvent', type: 'AuthError', message: 'event not belongs to you' })
        // retorna el evento si es correcto
        return event
    }
    changeProposalStatus = async (listToUpdate: { id: number, status: ProposalStatus }[]) => {
        // revisa si el servicio tiene el id del usuario
        if (!this._events) throw new CustomError({ where: 'organizer changeProposalStatus', type: 'ServiceError', message: 'user not found or not exists' })
        // busca las propuestas asociadas a los eventos del usuario
        const proposalList = await this.proposalRepo.searchByEvent(this._events)
        // revisa si las propuestas existen y pertenecen a algun evento del usuario
        const updatePromise = listToUpdate.map((updateItem) => {
            // busca el id de la propuesta que coincida con la lista
            const isProposalInList = proposalList.some(proposal => proposal.id === Number(updateItem.id))
            if (isProposalInList) {
                return this.proposalRepo.update({ id: Number(updateItem.id), input: { status: updateItem.status } })
            }
        })
        Promise.all(updatePromise).then((info) => console.log(pc.green('updatePromise'), info));
        
    }
    getProposalsBystatus = async (status: ProposalStatus) => {
        const list = await this.proposalRepo.listByStatus(status)
        // solo devuelve las propuestas que coincidan con el atributo _proposals
        return list.map(proposal => {
            if (this._proposals.some(p => p.id === proposal.id)) return proposal
        })
    }
    setUserId = async (value: string) => {
        this._userId = await this.checkUser(value)
        await this.loadEvents(this._userId)
        this._proposals = await this.proposalRepo.searchByEvent(this._events)
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