import {
  marketplaceAddress,
  marketplaceAddressAbi,
} from "../helpers/contracts";
import { useExecuteFunction } from "./useExecuteFunction";

export const useBuyOffer = ({
  offerId,
  value,
}: {
  offerId: number;
  value: bigint;
}) =>
  useExecuteFunction({
    abi: marketplaceAddressAbi,
    address: marketplaceAddress,
    functionName: "buyOffer",
    args: [offerId],
    eventNames: ["OfferSold"],
    value: value,
    enabled: Boolean(offerId && offerId > 0),
  });
