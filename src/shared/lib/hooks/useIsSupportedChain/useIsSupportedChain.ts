import { useAccount, useConfig } from 'wagmi';

export const useIsSupportedChain = () => {
  const { chains } = useConfig();
  const { chainId } = useAccount();

  return chainId && chains.some((c) => c.id === chainId);
};
