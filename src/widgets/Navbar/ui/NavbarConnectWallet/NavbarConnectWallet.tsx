import { FC, useCallback } from 'react';
import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi';

import cls from './NavbarConnectWallet.module.scss';
import MetamaskLogo from '@/shared/assets/icons/metamask-logo.svg?react';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { formatAddressShort } from '@/shared/lib/format/formatAddressShort';
import { useIsSupportedChain } from '@/shared/lib/hooks/useIsSupportedChain';
import { toast } from 'react-toastify';

export const NavbarConnectWallet: FC = () => {
  const { connectors, connect } = useConnect({
    mutation: {
      onError(error) {
        toast(error.message);
      },
    },
  });
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
  const { chains, switchChain } = useSwitchChain();
  const isSupportedChain = useIsSupportedChain();

  const onClickHandler = useCallback(() => {
    if (isConnected) {
      if (isSupportedChain) {
        disconnect();
      } else {
        switchChain({
          chainId: chains[0].id,
        });
      }
    } else {
      connect({
        connector: connectors[0],
      });
    }
  }, [chains, connectors, isConnected, isSupportedChain, connect, disconnect, switchChain]);

  return (
    <Button className={cls.profileMenu} color='inverted-primary' onClick={onClickHandler}>
      {address ? (
        isSupportedChain ? (
          <Text>{formatAddressShort(address)}</Text>
        ) : (
          <Text color='orange-dark'>Wrong network</Text>
        )
      ) : (
        <MetamaskLogo />
      )}
    </Button>
  );
};
