import { Address, isAddress, isAddressEqual, parseUnits } from 'viem';
import { TransferFormError } from '../../const/errors';
import { ITransferFormErrorsState } from '../../type/errors';
import { TransferForm } from '../../type/transfer';

interface IValidateTransferDataParams {
  address?: Address;
  balance: bigint;
  decimals: number;
}

export const validateTransferData = (
  form: TransferForm,
  params: IValidateTransferDataParams
): ITransferFormErrorsState | null => {
  const { amount, receiver } = form;
  const { address, balance, decimals } = params;

  const errors: ITransferFormErrorsState = {};

  if (!receiver) {
    errors.RECEIVER = TransferFormError.MISSING_ADDRESS;
  } else if (!isAddress(receiver)) {
    errors.RECEIVER = TransferFormError.INVALID_ADDRESS;
  } else if (address && isAddressEqual(address, receiver)) {
    errors.RECEIVER = TransferFormError.RECEIVER_IS_SENDER;
  }

  const amountEther = parseUnits(amount, decimals);

  if (!amount) {
    errors.AMOUNT = TransferFormError.MISSING_AMOUNT;
  } else if (Number.isNaN(Number(amount))) {
    errors.AMOUNT = TransferFormError.INVALID_AMOUNT;
  } else if (balance < amountEther) {
    errors.AMOUNT = TransferFormError.NOT_ENOUGH_BALANCE;
  }

  const isError = Object.values(errors).some(Boolean);
  if (isError) return errors;
  return null;
};
