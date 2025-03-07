import { ConnectKitButton } from "connectkit";
import "./App.css";
import { Web3Provider } from "./Web3Provider";
import { Marketplace } from "./components/Marketplace";
import { NFTCreator } from "./components/NFTCreator";

function App() {
  return (
    <Web3Provider>
      <div className="flex flex-col border-collapse max-w-[1024px]">
        <div className="w-full m-5 flex flex-row items-center gap-4">
          <span>Connect wallet:</span>
          <span>
            <ConnectKitButton />
          </span>
        </div>
        <div className="divider"></div>
        <div className="w-full m-5">
          <Marketplace />
        </div>
        <div className="divider"></div>
        <div className="w-full m-5">
          <NFTCreator />
        </div>
      </div>
    </Web3Provider>
  );
}

export default App;
