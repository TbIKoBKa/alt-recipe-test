import classNames from 'classnames';
import { FC, HTMLProps, memo } from 'react';

import cls from './Text.module.scss';

export type TTextElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
export type TTextSize = 'xxl' | 'xl' | 'l' | 'm' | 's' | 'xs' | 'xxs' | 'xxxs';
export type TTextColor = 'primary' | 'secondary' | 'inverted-primary' | 'gray-dark' | 'green-dark' | 'orange-dark';
export type TTextWeight = 'normal' | 'medium' | 'bold' | 'bolder';

interface ITextProps extends Omit<HTMLProps<HTMLHeadElement>, 'size'> {
  element?: TTextElement;
  size?: TTextSize;
  color?: TTextColor;
  underline?: boolean;
  weight?: TTextWeight;
  centered?: boolean;
}

export const Text: FC<ITextProps> = memo((props) => {
  const {
    element = 'p',
    className,
    size = 'm',
    color = 'primary',
    underline,
    weight = 'normal',
    centered,
    ...rest
  } = props;
  const Element = element as unknown as FC<ITextProps>;

  return (
    <Element
      className={classNames(cls.root, cls[size], cls[color], cls[weight], className, {
        [cls.underline]: underline,
        [cls.centered]: centered,
      })}
      {...rest}
    />
  );
});
