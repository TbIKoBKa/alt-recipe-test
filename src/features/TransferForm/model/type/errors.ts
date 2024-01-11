import { TransferFormError } from '../const/errors';
import { TransferFormField } from '../const/form';

export interface ITransferFormErrorsState extends Partial<Record<TransferFormField, TransferFormError>> {}
