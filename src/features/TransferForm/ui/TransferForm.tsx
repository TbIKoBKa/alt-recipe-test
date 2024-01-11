import { FC, FormEventHandler, useCallback, useState } from 'react';
import { parseUnits, Address } from 'viem';
import { useAccount, useBalance, useSendTransaction } from 'wagmi';
import { toast } from 'react-toastify';

import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Loader } from '@/shared/ui/Loader';
import { validateTransferData } from '../model/services/validateTransferData';
import { ITransferFormErrorsState } from '../model/type/errors';
import { TransferFormField } from '../model/const/form';
import cls from './TransferForm.module.scss';

export const TransferForm: FC = () => {
  const { address } = useAccount();
  const { sendTransaction, isPending } = useSendTransaction();
  const { data } = useBalance({ address });
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');
  const [errorsState, setErrorsState] = useState<ITransferFormErrorsState | null>(null);

  const onSubmitHandler = useCallback(async () => {
    if (data) {
      const { decimals, value } = data;
      const errors = validateTransferData({ receiver, amount }, { address, balance: value, decimals });

      setErrorsState(errors);

      if (!errors) {
        const amountEther = parseUnits(amount, decimals);
        sendTransaction(
          {
            to: receiver as Address,
            value: amountEther,
          },
          {
            onSuccess: () => {
              setReceiver('');
              setAmount('');
            },
            onError: ({ message }) => {
              toast(message, {
                type: 'error',
              });
            },
          }
        );
      }
    }
  }, [address, receiver, amount, data, sendTransaction]);

  const resetError = useCallback((field: TransferFormField) => {
    setErrorsState((prev) => {
      const newErrors = Object.assign({}, prev);
      delete newErrors[field];

      const isError = Object.values(newErrors).some(Boolean);
      if (isError) return newErrors;
      return null;
    });
  }, []);

  const onReceiverChangeHandler = useCallback<FormEventHandler<HTMLInputElement>>(
    (e) => {
      if (errorsState?.RECEIVER) {
        resetError(TransferFormField.RECEIVER);
      }
      setReceiver(e.currentTarget.value);
    },
    [resetError, errorsState?.RECEIVER]
  );

  const onAmountChangeHandler = useCallback<FormEventHandler<HTMLInputElement>>(
    (e) => {
      if (errorsState?.AMOUNT) {
        resetError(TransferFormField.AMOUNT);
      }
      setAmount(e.currentTarget.value);
    },
    [resetError, errorsState?.AMOUNT]
  );

  const disabled = !!errorsState || !data || isPending;
  const loading = !data || isPending;

  return (
    <div className={cls.form}>
      <div className={cls.inputs}>
        <Input
          label='Receiver'
          name='receiver'
          placeholder='Enter address'
          value={receiver}
          onChange={onReceiverChangeHandler}
          error={errorsState?.RECEIVER}
        />
        <Input
          label='Amount'
          name='amount'
          placeholder='Enter amount'
          value={amount}
          onChange={onAmountChangeHandler}
          error={errorsState?.AMOUNT}
        />
      </div>
      <Button onClick={onSubmitHandler} disabled={disabled} centered fluid>
        {loading ? <Loader color='secondary' /> : 'Submit'}
      </Button>
    </div>
  );
};
