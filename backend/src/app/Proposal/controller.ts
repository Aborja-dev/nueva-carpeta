import { CommonService } from "@/app/service/CommonService";
import { CandidateService } from "@/app/service/UserCandidate";

export class ProposalController {

    constructor(
        private readonly common: CommonService,
        private readonly candidate: CandidateService
    ) {}

    create = async (input: any) => {}
}