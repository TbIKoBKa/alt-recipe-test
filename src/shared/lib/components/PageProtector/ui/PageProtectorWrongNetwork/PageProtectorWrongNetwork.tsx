import { FC } from 'react';

import { Text } from '@/shared/ui/Text';
import cls from './PageProtectorWrongNetwork.module.scss';

export const PageProtectorWrongNetwork: FC = () => {
  return (
    <div className={cls.root}>
      <Text centered>Wallet is connected to wrong network</Text>
    </div>
  );
};
