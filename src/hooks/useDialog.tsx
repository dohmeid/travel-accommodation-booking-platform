import { useCallback, useState } from 'react';
import { City, Hotel } from '../types/adminTypes';

export interface DialogState {
  management: 'City' | 'Hotel' | 'Room' | '';
  type: 'Add' | 'Update' | 'Delete' | '';
  isOpen: boolean;
  cityData?: City;
  hotelData?: Hotel;
}

export interface UseDialog {
  dialogState: DialogState;
  openDialog: (
    management: DialogState['management'],
    type: DialogState['type'],
    data?: City | Hotel,
  ) => void;
  closeDialog: () => void;
}

const useDialog = (): UseDialog => {
  const [dialogState, setDialogState] = useState<DialogState>({
    management: '',
    type: '',
    isOpen: false,
  });

  const openDialog = useCallback(
    (
      management: DialogState['management'],
      type: DialogState['type'],
      data?: City | Hotel,
    ) => {
      setDialogState({
        management,
        type,
        isOpen: true,
        cityData: management === 'City' ? (data as City) : undefined,
        hotelData: management === 'Hotel' ? (data as Hotel) : undefined,
      });
    },
    [],
  );

  const closeDialog = useCallback(() => {
    setDialogState({
      management: '',
      type: '',
      isOpen: false,
      cityData: undefined,
      hotelData: undefined,
    });
  }, []);

  return { dialogState, openDialog, closeDialog };
};

export default useDialog;
