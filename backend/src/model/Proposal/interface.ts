import { ForCreateProposalController, ForUpdateProposalController, ProposalControllerObject, ProposalStatus } from "@/app/Proposal/types";

export interface ForManagerProposalRepository {
    topics: { name: string, id: number }[]
    insert(input: ForCreateProposalController): Promise<void>;
    update({ id, input }: { id: number, input: Partial<ForUpdateProposalController> }): Promise<void>;
    delete(id: number): Promise<void>;
    getById(id: number, candidateId: string): Promise<any>; // Asume que devuelve algún tipo de objeto o entidad
    listAll(): Promise<any[]>; // Asume que devuelve un array de objetos o entidades
    filterBy(candidateId: string): Promise<any[]>; // Asume que devuelve un array de objetos o entidades
    listByStatus(status: ProposalStatus): Promise<any[]>
    searchByEvent(id: string[]): Promise<Pick<ProposalControllerObject, 'id' | 'title'>[]>
}