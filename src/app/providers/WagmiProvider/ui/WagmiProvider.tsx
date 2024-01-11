import { FC, PropsWithChildren } from 'react';
import { WagmiProvider as WagmiProviderCore } from 'wagmi';
import { QueryClientProvider } from '@tanstack/react-query';

import { config } from '../const/config';
import { queryClient } from '../const/queryClient';

interface IWagmiProviderProps extends PropsWithChildren {}

export const WagmiProvider: FC<IWagmiProviderProps> = (props) => {
  const { children } = props;

  return (
    <WagmiProviderCore config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProviderCore>
  );
};
