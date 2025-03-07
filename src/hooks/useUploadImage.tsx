import { useQuery } from "@tanstack/react-query";
import { PinataSDK } from "pinata-web3";

export const useUploadImage = (file?: File) => {
  const pinata = new PinataSDK({
    pinataJwt: import.meta.env.VITE_PINATA_JWT,
    pinataGateway: "azure-immediate-swordtail-576.mypinata.cloud",
  });

  return useQuery({
    queryKey: ["upload", file],
    queryFn: async ({ queryKey: [, file] }) => {
      if (file) {
        const { IpfsHash } = await pinata.upload.file(file as File);
        return IpfsHash;
      }
    },
    enabled: false,
  });
};
