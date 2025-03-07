import { useEffect } from "react";
import { toast } from "react-toastify";
import { useBuyOffer } from "../hooks/useBuyOffer";

export const BuyButton = ({
  offerId,
  value,
}: {
  offerId: number;
  value: bigint;
}) => {
  const { write, execution, isReady } = useBuyOffer({
    offerId,
    value,
  });

  useEffect(() => {
    if (execution.isSuccess) toast.success(`🚀 Congratulations`);
  }, [execution.isSuccess]);

  return (
    <button
      onClick={() => {
        isReady && write();
      }}
      className="btn btn-xs btn-primary"
    >
      {execution.isPending ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : (
        <span>Buy NFT</span>
      )}
    </button>
  );
};
