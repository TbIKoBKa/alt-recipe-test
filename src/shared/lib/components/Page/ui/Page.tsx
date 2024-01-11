import { FC, PropsWithChildren } from 'react';

import cls from './Page.module.scss';
import classNames from 'classnames';

interface IPageProps extends PropsWithChildren {
  className?: string;
  wrapperClassName?: string;
  fluid?: boolean;
  noPadding?: boolean;
}

export const Page: FC<IPageProps> = (props) => {
  const { className, wrapperClassName, fluid = false, noPadding = false, children } = props;

  return (
    <main
      className={classNames(cls.root, className, {
        [cls.noPadding]: noPadding,
      })}
    >
      <div
        className={classNames(cls.wrapper, wrapperClassName, {
          [cls.fluid]: fluid,
        })}
      >
        {children}
      </div>
    </main>
  );
};
