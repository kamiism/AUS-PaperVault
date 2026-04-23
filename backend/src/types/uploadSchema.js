import z from "zod";

export const uploadSchema = z.object({
    department: z.string(),
    semester: z.string(),
    subject: z.string(),
    year: z.string(),
    isAnonymous: z.string().optional(),
});
