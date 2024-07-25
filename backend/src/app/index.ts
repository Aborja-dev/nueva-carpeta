import { AuthService } from "@/app/common/AuthService";
import { CommonService } from "@/app/service/CommonService";
import { CandidateService } from "@/app/service/UserCandidate";
import { compositionPrisma } from "@/model";
import { DatabaseModelType } from "@/types";

 
export const createServer = async (db: DatabaseModelType) => {
    const candidate = new CandidateService(
        db.repositories.event,
        db.repositories.proposal
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
    await candidate.makeProposal({
        eventId: '8e957ce7-70ba-4873-9145-d8c70012ddca',
        candidateId: 'de605169-4c78-43b9-a66e-f687675f5054',
        topics: ['DESARROLLO', 'COMUNICACIÓN'],
        title: 'test',
        abstract: 'test',
        estimatedDuration: 50,
        status: 'ENVIADA',
        streamed: true,
        uniqueCode: 'test'
    })   
}
    

(async () => {
    createServer(await compositionPrisma())
})()