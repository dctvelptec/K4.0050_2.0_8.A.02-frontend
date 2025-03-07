import { useQuery } from "@tanstack/react-query";
import { useAccount, useWalletClient } from "wagmi";
import {
  marketplaceAddress,
  marketplaceAddressAbi,
  nftAddress,
  nftAddressAbi,
} from "../helpers/contracts";
import { useCallback } from "react";
import { parseEther } from "viem";

export const useCreateOffer = (tokenId: number, amount: number) => {
  const { isConnected, address } = useAccount();

  const { data: walletClient } = useWalletClient();

  const { refetch, ...rest } = useQuery({
    queryKey: [tokenId, amount, address],
    queryFn: async () => {
      if (!walletClient) return;

      return walletClient
        .writeContract({
          abi: nftAddressAbi,
          address: nftAddress,
          functionName: "approve",
          args: [marketplaceAddress, tokenId],
        })
        .then(() =>
          walletClient.writeContract({
            abi: marketplaceAddressAbi,
            address: marketplaceAddress,
            functionName: "createOffer",
            args: [nftAddress, tokenId, parseEther(amount.toString())],
          })
        );
    },
    enabled: false,
  });

  const write = useCallback(() => {
    if (isConnected && walletClient) refetch();
    else throw new Error("no wallet client available");
  }, [isConnected, walletClient, refetch]);

  return { write, ...rest };
};
