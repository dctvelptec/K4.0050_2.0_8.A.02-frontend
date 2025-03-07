import { formatEther } from "viem";
import { useAccount } from "wagmi";
import { useGetOfferings } from "../hooks/useGetOfferings";
import { BuyButton } from "./BuyButton";
import { CancelButton } from "./CancelButton";
import { TokenImage } from "./TokenImage";

export const Marketplace = () => {
  const { address, isConnected } = useAccount();
  const { data, isLoading } = useGetOfferings();
  return (
    <div>
      <h1 className="text-2xl">Offerings</h1>
      {isLoading ? (
        <span className="flex flex-row items-center gap-2">
          <span className="loading loading-spinner loading-md"></span>{" "}
          <span>load offers</span>
        </span>
      ) : data && data.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Price</th>
                <th>Seller</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map(({ tokenId, price, seller, status, offerId }, i) => (
                <tr key={i}>
                  <th>#{tokenId}</th>
                  <td>
                    <TokenImage tokenId={tokenId} />
                  </td>
                  <td>{formatEther(price)} ETH</td>
                  <td>{seller}</td>
                  <td>
                    {isConnected ? (
                      <span>
                        {seller == address && status == 0 && (
                          <CancelButton offerId={Number(offerId)} />
                        )}
                        {seller != address && status == 0 && (
                          <BuyButton offerId={Number(offerId)} value={price} />
                        )}
                        {status == 1 && "SOLD"}
                        {status == 2 && "CANCELED"}
                      </span>
                    ) : (
                      <span>Connect wallet</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <span>no offers available</span>
      )}
    </div>
  );
};
