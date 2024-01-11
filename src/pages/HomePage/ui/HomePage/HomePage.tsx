import { FC } from 'react';

import { Page } from '@/shared/lib/components/Page';
import { PageProtector } from '@/shared/lib/components/PageProtector';
import { HomeTransactions } from '../HomeTransactions/HomeTransactions';
import cls from './HomePage.module.scss';
import { HomeBalance } from '../HomeBalance/HomeBalance';
import { HomeTransfer } from '../HomeTransfer/HomeTransfer';

const HomePage: FC = () => {
  return (
    <Page wrapperClassName={cls.wrapper}>
      <PageProtector>
        <div className={cls.left}>
          <HomeBalance />
          <HomeTransfer />
        </div>
        <div className={cls.right}>
          <HomeTransactions />
        </div>
      </PageProtector>
    </Page>
  );
};

export default HomePage;
