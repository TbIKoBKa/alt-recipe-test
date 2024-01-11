import { FC } from 'react';

import cls from './Navbar.module.scss';
import { NavbarConnectWallet } from '../NavbarConnectWallet/NavbarConnectWallet';
import { Text } from '@/shared/ui/Text';

export const Navbar: FC = () => {
  return (
    <header className={cls.root}>
      <div className={cls.wrapper}>
        <Text size='xxl' weight='bolder' color='inverted-primary'>
          Test Task
        </Text>
        <NavbarConnectWallet />
      </div>
    </header>
  );
};
