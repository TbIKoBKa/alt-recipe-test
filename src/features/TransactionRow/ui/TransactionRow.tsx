import { FC } from 'react';

import cls from './TransactionRow.module.scss';
import { Text } from '@/shared/ui/Text';
import { Transaction } from 'viem';
import { formatAddressShort } from '@/shared/lib/format/formatAddressShort';
import { formatBalance } from '@/shared/lib/format/formatBalance';
import { useAccount } from 'wagmi';

interface ITransactionProps extends Pick<Transaction, 'from' | 'to' | 'value' | 'hash'> {}

export const TransactionRow: FC<ITransactionProps> = (props) => {
  const { from, to, value, hash } = props;

  const { chain } = useAccount();

  return (
    <a className={cls.root} href={`${chain?.blockExplorers?.default.url}/tx/${hash}`} target='_blank' rel='noreferrer'>
      <div className={cls.left}>
        <div>
          <Text size='l' weight='bolder'>
            From
          </Text>
          <Text size='l'>{formatAddressShort(from)}</Text>
        </div>
        <div>
          <Text size='l' weight='bolder'>
            To
          </Text>
          <Text size='l'>{to ? formatAddressShort(to) : 'NULL'}</Text>
        </div>
      </div>
      <div className={cls.right}>
        <Text size='l' weight='bolder'>
          Value
        </Text>
        <Text className={cls.value} size='l'>
          {formatBalance(value, chain?.nativeCurrency.decimals, chain?.nativeCurrency.symbol)}
        </Text>
      </div>
    </a>
  );
};
