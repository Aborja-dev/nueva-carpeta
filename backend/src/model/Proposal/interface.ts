import { ForCreateProposalController, ForUpdateProposalController } from "@/app/Proposal/types";

export interface ForManagerProposalRepository {
    insert(input: ForCreateProposalController): Promise<void>;
    update({ id, input }: { id: number, input: Partial<ForUpdateProposalController> }): Promise<void>;
    delete(id: number): Promise<void>;
    getById(id: number): Promise<any>; // Asume que devuelve algún tipo de objeto o entidad
    listAll(): Promise<any[]>; // Asume que devuelve un array de objetos o entidades
    filterBy(candidateId: string): Promise<any[]>; // Asume que devuelve un array de objetos o entidades
}