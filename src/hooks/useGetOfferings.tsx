import { useReadContract } from "wagmi";
import {
  marketplaceAddress,
  marketplaceAddressAbi,
} from "../helpers/contracts";

export const useGetOfferings = () =>
  useReadContract({
    abi: marketplaceAddressAbi,
    address: marketplaceAddress,
    functionName: "fetchAllOffers",
    query: { select: (data) => data as any[] },
  });
