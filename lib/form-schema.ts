import * as z from "zod";

export const tokenSchema = z.object({
  tokenName: z
    .string()
    .min(3, { message: "Token Name must be at least 3 characters" }),
  tokenSymbol: z
    .string()
    .min(3, { message: "Token Symbol must be at least 3 characters" }),
  tokenInitsupply: z.coerce.number().min(21000000, {
    message: "Initial supply must be at least greater than 21000000.",
  }),
  maxsupply: z.coerce.number().min(21000000, {
    message: "Max supply must be at least greater than 21000000.",
  }),
  taxfee: z.coerce
    .number()
    .max(3, {
      message: "Initial supply must be at least less than 3.",
    })
    .min(0, {
      message: "Initial supply must be at least greater than 0.",
    }),
  liqidityfee: z.coerce.number().max(100, {
    message: "Initial supply must be at least greater than 100%.",
  }),
  teamfee: z.coerce.number().max(100, {
    message: "Initial supply must be at least greater than 100%.",
  }),
  tokenDecimals: z.coerce
    .number()
    .max(18, { message: "Initial supply must be at least greater than 18." }),
  // jobs array is for the dynamic fields
  burn: z.boolean().default(false).optional(),
  mint: z.boolean().default(false).optional(),
  pause: z.boolean().default(false).optional(),
  blacklist: z.boolean().default(false).optional(),
  deflation: z.boolean().default(false).optional(),
  s_deflation: z.boolean().default(false).optional(),
  privateKey: z
    .string()
    .min(66, { message: "Private Key must be 66 characters" })
    .max(66, { message: "Private Key must be 66 characters" }),
});

export type TokenFormValues = z.infer<typeof tokenSchema>;
