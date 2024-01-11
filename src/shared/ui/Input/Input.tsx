import { FC, memo, HTMLProps } from 'react';
import classNames from 'classnames';

import { Text } from '@/shared/ui/Text';
import cls from './Input.module.scss';

export interface IInputProps extends HTMLProps<HTMLInputElement> {
  name: string;
  label?: string;
  error?: string;
}

export const Input: FC<IInputProps> = memo((props) => {
  const { className, name, label, error, ...rest } = props;

  return (
    <div className={cls.root}>
      <label className={cls.label}>
        <Text>{label}</Text>
        <input className={classNames(cls.input, { [cls.error]: error })} id={name} {...rest}></input>
      </label>
      {error && (
        <Text size='m' color='orange-dark'>
          {error}
        </Text>
      )}
    </div>
  );
});
