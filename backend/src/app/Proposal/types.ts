// Definición del mapeo de estados fuera de la clase
export const ProposalStatuses = {
    0: 'ENVIADA',
    1: 'EN_PROCESO',
    2: 'PRESELECCION',
    3: 'APROBADA',
    4: 'RECHAZADA'
} as const;

export type ProposalStatus = typeof ProposalStatuses[keyof typeof ProposalStatuses];

export interface ForCreateProposalController {
    title: string,
    abstract: string,
    estimatedDuration: number,
    status: ProposalStatus,
    streamed: boolean,
    uniqueCode: string,
    topics: string[],
    eventId: string,
    candidateId: string
}

export interface ForUpdateProposalController {
    abstract: string,
    estimatedDuration: number,
    status: number,
    streamed: boolean,
}

export interface ProposalControllerObject {
    id: number;
    title: string;
    abstract: string;
    estimatedDuration: number;
    status: ProposalStatus;
    streamed: boolean;
    uniqueCode: string;
    topics: string[];
    candidate: { id: string; name: string };
    event: { id: string; name: string };
}
