import { FC, useCallback, useEffect, useState } from 'react';
import { useAccount, usePublicClient } from 'wagmi';
import { Transaction, isAddressEqual } from 'viem';

import { Text } from '@/shared/ui/Text';
import cls from './HomeTransactions.module.scss';
import { Button } from '@/shared/ui/Button';
import { TransactionRow } from '@/features/TransactionRow';
import { Loader } from '@/shared/ui/Loader';

const DEFAULT_STEP = 100n;

export const HomeTransactions: FC = () => {
  const { address } = useAccount();
  const { getBlockNumber, getBlock } = usePublicClient();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [lastLoadedBlock, setLastLoadedBlock] = useState<bigint | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const blockInited = !!lastLoadedBlock;

  const initLastLoadedBlock = useCallback(async () => {
    const num = await getBlockNumber({
      cacheTime: 30000,
    });
    setLastLoadedBlock(num);
  }, [getBlockNumber]);

  const getTransactions = useCallback(async () => {
    if (address && lastLoadedBlock) {
      setIsLoading(true);

      const fromBlock = lastLoadedBlock - DEFAULT_STEP - 1n;
      const toBlock = lastLoadedBlock - 1n;

      console.log('🚀 ~ getTransactions ~ lastLoadedBlock:', fromBlock, toBlock);
      for (let i = fromBlock; i < toBlock; i++) {
        const block = await getBlock({
          includeTransactions: true,
          blockNumber: i,
        });

        const txs = block.transactions as Transaction[];
        const txsFiltered = txs.filter(
          (tx) => (tx.to && isAddressEqual(address, tx.to)) || isAddressEqual(address, tx.from)
        );

        setTransactions((prev) => prev?.concat(txsFiltered));
      }

      setLastLoadedBlock(fromBlock);
      setIsLoading(false);
    }
  }, [address, lastLoadedBlock]);

  useEffect(() => {
    initLastLoadedBlock();
  }, [initLastLoadedBlock]);

  useEffect(() => {
    if (blockInited) {
      getTransactions();
    }
  }, [blockInited]);

  useEffect(() => {
    setTransactions([]);
  }, [address]);

  const loading = isLoading || !lastLoadedBlock;

  return (
    <section className={cls.root}>
      <Text element='h1' size='xl' weight='bolder'>
        Transactions
      </Text>
      <div className={cls.list}>
        {transactions?.map(({ hash, value, from, to }) => (
          <TransactionRow key={hash} value={value} from={from} to={to} hash={hash} />
        ))}
        {loading && <Loader />}
      </div>
      <div className={cls.buttonWrapper}>
        <Button disabled={loading} size='s' variant='filled' color='primary' onClick={getTransactions}>
          Show more
        </Button>
        <Text>Last loaded block: {lastLoadedBlock?.toString()}</Text>
      </div>
    </section>
  );
};
