import React from 'react'
import { ProposalDetail } from '../../types/types'

export const ProposalDetailCard = ({proposal}: {proposal: ProposalDetail}) => {
    return (
        <div className="max-w-96 rounded-md shadow-md p-4">
            <h2 className="font-bold text-2xl">{proposal.title}</h2>
            <p className="text-gray-600">{proposal.abstract}</p>
            <p className="flex items-center">
                <span className="mr-2">Duracion estimada: {proposal.estimatedDuration} min</span>
                <span className={`text-${proposal.status === "APROBADA" ? "green-600" : "red-600"}`}>{proposal.status}</span>
            </p>
            <p className="text-gray-600">Tema(s): {proposal.topics.join(", ")}</p>
            <p className="text-gray-600">Candidato: {proposal.candidate.name}</p>
            <p className="text-gray-600">Evento: {proposal.event.name}</p>
        </div>
    )
 } 
