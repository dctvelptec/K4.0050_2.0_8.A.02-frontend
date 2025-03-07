import { useEffect, useState } from "react";
import { useAccount, usePublicClient } from "wagmi";
import { nftAddress, nftAddressAbi } from "../helpers/contracts";

export const useGetNFTs = () => {
  const { address, chainId, isConnected } = useAccount();
  const client = usePublicClient({ chainId });

  const [balanceOf, setBalanceOf] = useState(0);
  const [nfts, setNfts] = useState<number[]>([]);

  useEffect(() => {
    if (client && isConnected && address) {
      client
        .readContract({
          abi: nftAddressAbi,
          address: nftAddress,
          functionName: "balanceOf",
          args: [address],
        })
        .then((b: any) => {
          setBalanceOf(Number(b));
        });
    }
  }, [isConnected, client, address]);

  useEffect(() => {
    if (isConnected && address && client && balanceOf > 0) {
      const promises = [];
      for (let i = 0; i < balanceOf; i++) {
        promises.push(
          client?.readContract({
            abi: nftAddressAbi,
            address: nftAddress,
            functionName: "tokenOfOwnerByIndex",
            args: [address, i],
          })
        );
      }

      Promise.all(promises).then((data) => {
        setNfts(data.map(Number));
      });
    }
  }, [isConnected, balanceOf, client, address]);

  return nfts;
};
