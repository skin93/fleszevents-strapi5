// lib/validations.ts
import { z } from "zod";

export const festivalsSearchParamsSchema = z.object({
  city: z.string().trim().max(50).catch(""),
  festival: z.string().trim().max(100).catch(""),
  genre: z.string().trim().max(30).catch(""),
});

export type festivalsSearchParams = z.infer<typeof festivalsSearchParamsSchema>;
