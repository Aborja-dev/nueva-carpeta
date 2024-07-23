import { TalkProposalModel } from "@/model/repos/entities";
import { ForInsertProposal, ForUpdateProposal } from "@/model/repos/Proposal.type";


export interface ForProposalRepositoryOperations {
  insert(input: ForInsertProposal): Promise<void>;
  getById(id: number): Promise<TalkProposalModel | null>;
  listAll(): Promise<TalkProposalModel[]>;
  filterBy(candidateId: string): Promise<TalkProposalModel[]>;
  update(id: number, input: Partial<ForUpdateProposal>): Promise<void>;
  delete(id: number): Promise<void>;
}