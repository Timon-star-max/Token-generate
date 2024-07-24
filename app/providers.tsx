"use client";

import React from "react";
import {
  getDefaultConfig,
  darkTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { sepolia,mainnet } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!;

const config = getDefaultConfig({
  appName: "TokenG",
  projectId: projectId,
  chains: [sepolia, mainnet],
  ssr: true,
});

const theme = darkTheme();

const queryClient = new QueryClient();

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => (
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider theme={theme}>{children}</RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);
