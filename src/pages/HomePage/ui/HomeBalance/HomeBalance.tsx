import { FC } from 'react';

import { Text } from '@/shared/ui/Text';
import cls from './HomeBalance.module.scss';
import { useAccount, useBalance } from 'wagmi';
import { formatBalance } from '@/shared/lib/format/formatBalance';
import { Loader } from '@/shared/ui/Loader';

export const HomeBalance: FC = () => {
  const { address } = useAccount();
  const { data, isLoading } = useBalance({
    address,
  });

  const formattedBalance = formatBalance(data?.value, data?.decimals, data?.symbol);

  return (
    <section className={cls.root}>
      <Text element='h1' size='xl' weight='bolder'>
        Balance
      </Text>
      {isLoading ? (
        <Loader />
      ) : (
        <Text color='gray-dark' size='l'>
          {formattedBalance}
        </Text>
      )}
    </section>
  );
};
