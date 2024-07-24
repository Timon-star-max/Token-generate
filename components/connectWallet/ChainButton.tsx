import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "./ChainButton.module.css";
import { Button } from "@/components/ui/button";

export const ChainButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div>
            {(() => {
              if (!connected) {
                return (
                  <Button
                    onClick={openConnectModal}
                    type="button"
                    className="bg-[#db3e00] w-full"
                  >
                    Select Network
                  </Button>
                );
              }
              if (chain.unsupported) {
                return (
                  <Button
                    onClick={openChainModal}
                    type="button"
                    className="bg-[#05B7D1] w-full"
                  >
                    Wrong network
                  </Button>
                );
              }
              return (
                <div className="flex flex-row">
                  <Button onClick={openChainModal} className="rounded-l-xl mr-2 bg-[#05B7D1]">
                    {chain.name}
                  </Button>
                  <Button onClick={openAccountModal} className="rounded-r-xl bg-[#05B7D1] w-full">
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ""}
                  </Button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
