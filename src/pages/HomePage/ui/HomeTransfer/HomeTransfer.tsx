import { FC } from 'react';

import { Text } from '@/shared/ui/Text';
import cls from './HomeTransfer.module.scss';
import { TransferForm } from '@/features/TransferForm';

export const HomeTransfer: FC = () => {
  return (
    <section className={cls.root}>
      <Text element='h1' size='xl' weight='bolder'>
        Transfer
      </Text>
      <TransferForm />
    </section>
  );
};
