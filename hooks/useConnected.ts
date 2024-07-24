import { useAccount } from "wagmi"
import { chain as c } from "@/contract/client"

const useConnected = () => {
  const { isConnected, chain } = useAccount()

  const connected =
    isConnected && chain?.id === c.id

  return { connected, status }
}

export default useConnected
