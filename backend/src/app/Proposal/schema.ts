import { ProposalStatuses } from '@/app/Proposal/types';
import { z } from 'zod';

// Esquema de validación con Zod
export const CreateProposalSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  abstract: z.string().min(1, { message: "Abstract is required" }),
  estimatedDuration: z.number().positive({ message: "Estimated duration must be a positive number" }),
  status: z.nativeEnum(ProposalStatuses, { errorMap: () => ({ message: "Invalid proposal status" }) }),
  streamed: z.boolean(),
  uniqueCode: z.string().min(1, { message: "Unique code is required" }),
  topics: z.array(z.string().min(1, { message: "Topic cannot be empty" })).min(1, { message: "At least one topic is required" }),
  eventId: z.string().min(1, { message: "Event ID is required" }),
  candidateId: z.string().min(1, { message: "Candidate ID is required" })
});


