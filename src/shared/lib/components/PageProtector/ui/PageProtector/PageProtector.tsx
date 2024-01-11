import { FC, PropsWithChildren } from 'react';
import { useAccount } from 'wagmi';

import { useIsSupportedChain } from '@/shared/lib/hooks/useIsSupportedChain';
import { PageProtectorNotConnected } from '../PageProtectorNotConnected/PageProtectorNotConnected';
import { PageProtectorWrongNetwork } from '../PageProtectorWrongNetwork/PageProtectorWrongNetwork';

interface IPageProtectorProps extends PropsWithChildren {}

export const PageProtector: FC<IPageProtectorProps> = (props) => {
  const { children } = props;

  const { isConnected } = useAccount();
  const isSupportedChain = useIsSupportedChain();

  return isConnected ? isSupportedChain ? children : <PageProtectorWrongNetwork /> : <PageProtectorNotConnected />;
};
