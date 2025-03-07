import { nftAddress, nftAddressAbi } from "../helpers/contracts";
import { useExecuteFunction } from "./useExecuteFunction";

export const useMintNFT = (ipfsHash: string, enabled: boolean) =>
  useExecuteFunction({
    abi: nftAddressAbi,
    address: nftAddress,
    functionName: "publicMint",
    args: [ipfsHash],
    eventNames: ["Transfer"],
    enabled,
  });
