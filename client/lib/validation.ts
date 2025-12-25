import { z } from "zod";

export const festivalsSearchParamsSchema = z.object({
  city: z.string().trim().max(50).catch(""),
  festival: z.string().trim().max(100).catch(""),
  genre: z.string().trim().max(30).catch(""),
});

export type festivalsSearchParams = z.infer<typeof festivalsSearchParamsSchema>;

export const calendarSearchParamsSchema = z.object({
  date: z.date().nullable().catch(null),
  city: z.string().trim().max(50).catch(""),
  location: z.string().trim().max(50).catch(""),
  type: z.enum(["Koncert", "Festiwal"]).nullable().catch(null),
  region: z
    .enum([
      "Dolnośląskie",
      "Kujawsko-Pomorskie",
      "Lubelskie",
      "Lubuskie",
      "Łódzkie",
      "Małopolskie",
      "Mazowieckie",
      "Opolskie",
      "Podkarpackie",
      "Podlaskie",
      "Pomorskie",
      "Śląskie",
      "Świętokrzyskie",
      "Warmińsko-Mazurskie",
      "Wielkopolskie",
      "Zachodniopomorskie",
    ])
    .nullable()
    .catch(null),
});

export type calendarSearchParams = z.infer<typeof calendarSearchParamsSchema>;
