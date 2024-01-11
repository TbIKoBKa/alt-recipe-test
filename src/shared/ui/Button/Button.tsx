import { FC, ButtonHTMLAttributes, memo } from 'react';
import classNames from 'classnames';

import cls from './Button.module.scss';

type TSize = 'm' | 's';
type TColor = 'primary' | 'inverted-primary' | 'orange';
type TVariant = 'filled' | 'border' | 'unstyled';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: TSize;
  color?: TColor;
  variant?: TVariant;
  fluid?: boolean;
  centered?: boolean;
}

export const Button: FC<IButtonProps> = memo((props) => {
  const {
    className,
    size = 'm',
    color = 'primary',
    variant = 'filled',
    fluid = false,
    centered = false,
    ...rest
  } = props;

  return (
    <button
      className={classNames(cls.root, cls[size], cls[color], cls[variant], className, {
        [cls.fluid]: fluid,
        [cls.centered]: centered,
      })}
      {...rest}
    />
  );
});
