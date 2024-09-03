import { useCallback, useState } from 'react';
import { City, GridType, Hotel, Room } from '../types/adminTypes';

export interface DialogState<T = unknown> {
  type: GridType;
  mode: 'Add' | 'Update' | 'Delete';
  isOpen: boolean;
  data?: T;
}

export interface UseDialog {
  dialogState: DialogState<City | Hotel | Room>;
  openDialog: (
    type: GridType,
    mode: DialogState['mode'],
    data?: City | Hotel | Room,
  ) => void;
  closeDialog: () => void;
}

const useDialog = () => {
  const initialState: DialogState = {
    type: GridType.CITY,
    mode: 'Add',
    isOpen: false,
  };

  const [dialogState, setDialogState] = useState<DialogState>(initialState);

  const openDialog = useCallback(
    (type: GridType, mode: DialogState['mode'], data?: City | Hotel | Room) => {
      setDialogState({
        type,
        mode,
        isOpen: true,
        data,
      });
    },
    [],
  );

  const closeDialog = useCallback(() => {
    setDialogState(initialState);
  }, []);

  return { dialogState, openDialog, closeDialog };
};

export default useDialog;
