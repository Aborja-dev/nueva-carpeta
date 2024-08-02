import z from "zod";
const CreateEventSchema = z.object({
  name: z.string(),
  description: z.string(),
  organizers: z.array(z.string()),
  type: z.enum([
    'PRESENCIAL',
    'VIRTUAL',
    'HYBRID',
  ]),
  url: z.string().nullable(),
  bannerUrl: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  startingDate: z.string(),
  endingDate: z.string(),
  proposalsStartingDate: z.date().nullable().optional(),
  proposalsEndingDate: z.date().nullable().optional(),
  timezone: z.string(),
});


export default CreateEventSchema