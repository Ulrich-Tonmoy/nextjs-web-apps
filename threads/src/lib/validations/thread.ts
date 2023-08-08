import * as z from "zod";

export const ThreadValidation = z.object({
  thread: z
    .string()
    .nonempty()
    .min(3, { message: "Minimum 3 characters required" }),
  accountId: z.string().nonempty(),
  image: z.string().nullable(),
});

export const CommentValidation = z.object({
  thread: z
    .string()
    .nonempty()
    .min(3, { message: "Minimum 3 characters required" }),
  image: z.string().nullable(),
});
