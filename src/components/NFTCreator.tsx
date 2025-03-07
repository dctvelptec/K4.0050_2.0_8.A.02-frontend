import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useUploadImage } from "../hooks/useUploadImage";
import { useAccount } from "wagmi";
import { useMintNFT } from "../hooks/useMintNFT";
import { toast } from "react-toastify";
import { useGetNFTs } from "../hooks/useGetNFTs";
import { TokenImage } from "./TokenImage";
import { SellButton } from "./SellButton";

export const NFTCreator = () => {
  const { isConnected } = useAccount();
  const [fileImg, setFileImg] = useState<File>();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const { data, refetch, isLoading } = useUploadImage(fileImg);

  const { execution, isReady, write, reset, hash } = useMintNFT(
    data || "",
    !!uploadedImage
  );

  const myNFTS = useGetNFTs();

  const handleClick = useCallback(() => {
    fileImg && refetch();
  }, [fileImg]);

  useEffect(() => {
    if (data) {
      const _img = `https://ipfs.io/ipfs/${data}`;
      toast.success(`Image uploaded to ${_img}`);
      setUploadedImage(_img);
    }
  }, [data]);

  useEffect(() => {
    if (isReady) write();
  }, [isReady]);

  useEffect(() => {
    if (execution.isSuccess) {
      toast.success(`NFT created on tx: ${hash}`);
      reset();
    }
  }, [execution.isSuccess]);

  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-2xl">NFT Creator</h2>
      {!isConnected ? (
        <div>Please connect your wallet</div>
      ) : (
        <>
          <div>
            <input
              type="file"
              disabled={isLoading || execution.isPending}
              className="file-input"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (e.target.files && e.target.files[0]) {
                  setFileImg(e.target.files[0]);
                }
              }}
              required
            />
            <fieldset className="fieldset">
              <button
                onClick={handleClick}
                disabled={isLoading || execution.isPending}
                className="btn"
              >
                {!isLoading && !execution.isPending && "Create NFT"}
                {isLoading && "...uploading image"}
                {execution.isPending && "...creating NFT"}
              </button>
            </fieldset>
          </div>
          <h2 className="text-2xl">My NFTs</h2>
          <div>
            {myNFTS && myNFTS.length > 0 ? (
              <div className="flex flex-col gap-4">
                {myNFTS.map((tokenId) => (
                  <span key={tokenId}>
                    Token ID #{tokenId}
                    <br /> <TokenImage tokenId={tokenId} />
                    <SellButton tokenId={tokenId} />
                  </span>
                ))}
              </div>
            ) : (
              <span>No NFTs yet</span>
            )}
          </div>
        </>
      )}
    </div>
  );
};
