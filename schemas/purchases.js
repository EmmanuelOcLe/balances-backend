import * as z from "zod";

export const purchase = z.object({
  purchaseName: z.string().min(1),
  purchaseCost: z.number().min(1),
  payId: z.int().min(1)
});

export const pay = z.object({
  payName: z.string().min(1),
  payInitialAmount: z.number().min(1)
});