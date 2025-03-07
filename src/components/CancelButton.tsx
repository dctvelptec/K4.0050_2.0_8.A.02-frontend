import { useEffect } from "react";
import { toast } from "react-toastify";
import { useCancelOffer } from "../hooks/useCancelOffer";

export const CancelButton = ({ offerId }: { offerId: number }) => {
  const { write, execution, isReady } = useCancelOffer({
    offerId,
  });

  useEffect(() => {
    if (execution.isSuccess) toast.success(`Offer canceled`);
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
        <span>Cancel</span>
      )}
    </button>
  );
};
