import { useReadContract } from "wagmi";
import { nftAddress, nftAddressAbi } from "../helpers/contracts";

export const useGetTokenUri = (tokenId: number) =>
  useReadContract({
    abi: nftAddressAbi,
    address: nftAddress,
    functionName: "tokenURI",
    args: [tokenId],
  });
