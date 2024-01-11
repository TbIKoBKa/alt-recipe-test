import { FC } from 'react';

import cls from './NavbarChangeNetwork.module.scss';
import MetamaskLogo from '@/shared/assets/icons/metamask-logo.svg?react';
import { Button } from '@/shared/ui/Button';

export const NavbarChangeNetwork: FC = () => {
  return (
    <Button className={cls.profileMenu}>
      <MetamaskLogo />
    </Button>
  );
};
