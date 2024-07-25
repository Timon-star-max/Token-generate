import * as z from "zod";

export const baseTokenSchema = z.object({
  tokenName: z
    .string()
    .min(3, { message: "Token Name must be at least 3 characters" }),
  tokenSymbol: z
    .string()
    .min(3, { message: "Token Symbol must be at least 3 characters" }),
  tokenInitsupply: z.coerce.number().min(21000000, {
    message: "Initial supply must be at least greater than 21000000.",
  }),
  tokenDecimals: z.coerce
    .number()
    .max(18, { message: "Initial supply must be at least greater than 18." }),
  maxSupply: z.number().optional(),
  buyTaxfee: z.number().optional(),
  sellTaxfee: z.number().optional(),
  liqidityShare: z.number().optional(),
  teamShare: z.number().optional(),
});

export type TokenFormValues = z.infer<typeof baseTokenSchema>;
