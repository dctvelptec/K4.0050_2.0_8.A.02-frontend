import { useGetTokenUri } from "../hooks/useGetTokenUri";

export const TokenImage = ({ tokenId }: { tokenId: number }) => {
  const { data, isLoading } = useGetTokenUri(tokenId);
  return (
    <span>
      {isLoading ? (
        "fetching image..."
      ) : data ? (
        <img src={data as string} className="max-w-32" />
      ) : (
        "error fetching!"
      )}
    </span>
  );
};
