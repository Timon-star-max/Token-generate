import { createPublicClient, http } from "viem"
import { mainnet, sepolia } from "viem/chains"

export const chain = process.env.NODE_ENV === "production" && Number(process.env.NEXT_PUBLIC_PRODUCTION) ? mainnet : sepolia

export const publicClient = createPublicClient({
  chain,
  transport: http(process.env.NEXT_PUBLIC_RPC_URL),
})
