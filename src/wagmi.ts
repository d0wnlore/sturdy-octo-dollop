import { configureChains, createConfig } from "wagmi";
import {
  foundry,
  optimismGoerli,
  baseGoerli,
  zoraTestnet,
  sepolia,
} from "wagmi/chains";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";

const modeTestnet = {
  id: 919,
  name: "Mode Testnet",
  network: "mode-testnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://sepolia.mode.network"],
    },
    public: {
      http: ["https://sepolia.mode.network"],
    },
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://sepolia.explorer.mode.network",
    },
  },
  testnet: true,
};

/**
 * Tell wagmi which chains you want to support
 * To add a new chain simply import it and add it here
 * @see https://wagmi.sh/react/providers/configuring-chains
 */
const { chains, publicClient } = configureChains(
  [optimismGoerli, baseGoerli, zoraTestnet, sepolia, foundry, modeTestnet],
  [
    /**
     * Uncomment this line to use Alchemy as your provider
     * @see https://wagmi.sh/react/providers/alchemy
     */
    // alchemyProvider({ apiKey: import.meta.env.VITE_ALCHEMY_API_KEY! }),
    /**
     * Tells wagmi to use the default RPC URL for each chain
     * for some dapps the higher rate limits of Alchemy may be required
     */
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id === foundry.id) {
          return { http: "http://localhost:8545" };
        }
        return { http: chain.rpcUrls.default.http[0] };
      },
    }),
  ],
);

/**
 * Export chains to be used by rainbowkit
 * @see https://wagmi.sh/react/providers/configuring-chains
 */
export { chains };

/**
 * Configures wagmi connectors for rainbowkit
 * @see https://www.rainbowkit.com/docs/custom-wallet-list
 * @see https://wagmi.sh/react/connectors
 */
const { connectors } = getDefaultWallets({
  appName:
    "Optimism attestation station + Forge + Wagmi + RainbowKit + Vite App",
  chains,
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
});

/**
 * Creates a singleton wagmi client for the app
 * @see https://wagmi.sh/react/client
 */
export const config = createConfig({
  autoConnect: true,
  connectors: connectors,
  publicClient,
  webSocketPublicClient: publicClient,
});
