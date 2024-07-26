import { AuthService } from "@/app/common/AuthService";
import { CommonService } from "@/app/service/CommonService";
import { CandidateService } from "@/app/service/UserCandidate";
import { compositionPrisma } from "@/model";
import { TalkProposalRepo } from "@/model/Proposal/repository";
import { DatabaseModelType } from "@/types";
import { Prisma, PrismaClient } from "@prisma/client";

 
export const createServer = async (db: DatabaseModelType) => {
    const client = new PrismaClient()
    
    const candidate = new CandidateService(
        db.repositories.event,
        db.repositories.proposal,
        db.repositories.user
    )
    const commonService = new CommonService(
        db.repositories.user
    )
/*     await commonService.register({
        name: 'Abraham',
        email: 'email@email.com',
        type: 'CANDIDATE',
        password: '123asdfg'
    }) */
   await candidate.setUserId('01bd03ea-a120-4622-bf5e-56328a1646f5')
    console.log(
        await candidate.checkMyProposal(5)
    );
       
}
    

(async () => {
    createServer(await compositionPrisma())
})()