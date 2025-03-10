import { WagmiProvider, createConfig, http } from "wagmi";
import { hardhat, localhost, mainnet, sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { PropsWithChildren } from "react";

const config = createConfig(
  getDefaultConfig({
    chains: [sepolia, hardhat],
    transports: {
      [sepolia.id]: http(import.meta.env.SEPOLIA_RPC),
      [hardhat.id]: http(),
    },

    // Required API Keys
    walletConnectProjectId: "",

    // Required App Info
    appName: "NFT Marketplace",

    // Optional App Info
    appDescription: "NFT Marketplace Description",
  })
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: PropsWithChildren) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
