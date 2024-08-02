import { ForCreateProposalController, ProposalControllerObject } from "@/app/Proposal/types";
import { CandidateService } from "@/app/service/UserCandidate";
import { Handler, Request } from "express";
import { where } from "sequelize";

export class ProposalController {

    constructor(
        private readonly candidate: CandidateService
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
        await this.candidate.setUserId(userId)
        try {
            const proposals = await this.candidate.getMyProposals()
            return res.status(200).json(proposals)
        } catch (error: any) {
            return res.status(400).json({ message: error.message, where: error.where })
        }
    }
    getOne: Handler = async (req: Request, res) => {
        const userId = req.query.userId as string
        await this.candidate.setUserId(userId)
        try {
            const proposal = await this.candidate.checkMyProposal(Number(req.params.id))
            return res.status(200).json(proposal)
        } catch (error: any) {
            return res.status(400).json({ message: error.message })
        }
    }
    update: Handler = async (req: Request, res) => {
        const input = req.body
        const userId = req.query.userId as string
        await this.candidate.setUserId(userId)
        try {
            await this.candidate.update(Number(req.params.id), input)
            return res.status(200).json({ message: 'proposal updated' })
        } catch (error: any) {
            return res.status(400).json({ message: error.where })
        }
    }
}