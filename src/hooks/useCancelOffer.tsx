import {
  marketplaceAddress,
  marketplaceAddressAbi,
} from "../helpers/contracts";
import { useExecuteFunction } from "./useExecuteFunction";

export const useCancelOffer = ({ offerId }: { offerId: number }) =>
  useExecuteFunction({
    abi: marketplaceAddressAbi,
    address: marketplaceAddress,
    functionName: "cancelOffer",
    args: [offerId],
    eventNames: ["OfferCanceled"],
    enabled: Boolean(offerId && offerId > 0),
  });
