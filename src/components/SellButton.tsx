import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useCreateOffer } from "../hooks/useCreateOffer";
import { toast } from "react-toastify";

export const SellButton = ({ tokenId }: { tokenId: number }) => {
  const [showForm, setShowForm] = useState(false);
  const [amount, setAmount] = useState("");

  const { write, isSuccess, isLoading } = useCreateOffer(
    tokenId,
    Number(amount)
  );

  const handleSellNow = useCallback(() => {
    if (+amount > 0) write();
  }, [write, amount]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(`Created offer for NFT #${tokenId}`);
      setShowForm(false);
      setAmount("");
    }
  }, [isSuccess]);

  return (
    <div className="flex flex-row gap-2 items-center mt-2">
      {showForm ? (
        <>
          <input
            type="number"
            disabled={isLoading}
            className="input"
            placeholder="Enter ETH amount"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setAmount(event.target.value);
            }}
          />
          <button
            onClick={() => {
              handleSellNow();
            }}
            disabled={isLoading}
            className="btn btn-xs btn-primary"
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <span>Sell now</span>
            )}
          </button>
        </>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="btn btn-xs btn-primary"
        >
          Sell NFT
        </button>
      )}
    </div>
  );
};
