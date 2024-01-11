import { FC } from 'react';

import { Text } from '@/shared/ui/Text';
import cls from './PageProtectorNotConnected.module.scss';

export const PageProtectorNotConnected: FC = () => {
  return (
    <div className={cls.root}>
      <Text centered>Wallet is not connected</Text>
    </div>
  );
};
