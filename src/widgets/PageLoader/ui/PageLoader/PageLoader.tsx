import classNames from 'classnames';

import { Loader } from '@/shared/ui/Loader';
import cls from './PageLoader.module.scss';
import { FC } from 'react';

interface IPageLoaderProps {
  className?: string;
}

export const PageLoader: FC<IPageLoaderProps> = (props) => {
  const { className } = props;

  return (
    <div className={classNames(cls.root, {}, [className])}>
      <Loader />
    </div>
  );
};
