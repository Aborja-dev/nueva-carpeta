import { ForCreateProposalController, ProposalControllerObject, ProposalStatus } from "@/app/Proposal/types";
import { OrganizerService } from "@/app/service/OrganizerService";
import { CandidateService } from "@/app/service/UserCandidate";
import { Handler, Request } from "express";

export class ProposalController {
    constructor(
        private readonly candidate: CandidateService,
        private readonly organizer: OrganizerService
    ) { }

    create: Handler = async (req: Request<{}, {}, ForCreateProposalController>, res) => {
        const input = req.body
        try {
            await this.candidate.makeProposal(input)
            return res.status(201).json({ message: 'proposal created' })

        } catch (error: any) {
            return res.status(400).json({ message: error.message })
        }
    }
    listAll: Handler = async (req: Request<any, ProposalControllerObject[], { userId: string }>, res) => {
        const { userId } = req.params as { userId: string }
        const userInfo = req.app.locals.user as {id: string, type: string}
        console.log(userInfo);
        const role = userInfo.type.toLowerCase()
        try {
            if (role === 'candidate') {
                await this.candidate.setUserId(userId)
                const proposals = await this.candidate.getMyProposals()
                return res.status(200).json(proposals)
            }
            if (role === 'organizer') {
                const status = req.query.status as ProposalStatus
                await this.organizer.setUserId(userId)
                const proposals = await this.organizer.getProposalsBystatus(status)
                return res.status(200).json(proposals)
            }
        } catch (error: any) {
            return res.status(400).json({ message: error.message, where: error.where })
        }
    }
    getOne: Handler = async (req: Request, res) => {
        const userId = req.query.userId as string
        try {
            await this.candidate.setUserId(userId)
            const proposal = await this.candidate.checkMyProposal(Number(req.params.id))
            return res.status(200).json(proposal)
        } catch (error: any) {
            return res.status(400).json({ message: error.message })
        }
    }
    update: Handler = async (req: Request, res) => {
        const input = req.body
        const userId = req.query.userId as string
        const role = req.query.role as string
        try {
            if (role === 'candidate') {
                await this.candidate.setUserId(userId)
                await this.candidate.update(Number(req.params.id), input)
                return res.status(200).json({ message: 'proposal updated' })
            }
        } catch (error: any) {
            return res.status(400).json({ message: error.message })
        }
    }
}