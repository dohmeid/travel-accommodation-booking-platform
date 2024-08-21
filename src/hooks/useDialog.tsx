import { useCallback, useState } from 'react';
import { City, GridType, Hotel } from '../types/adminTypes';

export interface DialogState {
  management: GridType;
  type: 'Add' | 'Update' | 'Delete';
  isOpen: boolean;
  cityData?: City;
  hotelData?: Hotel;
}

export interface UseDialog {
  dialogState: DialogState;
  openDialog: (
    management: GridType,
    type: DialogState['type'],
    data?: City | Hotel,
  ) => void;
  closeDialog: () => void;
}

const useDialog = (): UseDialog => {
  const [dialogState, setDialogState] = useState<DialogState>({
    management: GridType.CITY,
    type: 'Add',
    isOpen: false,
  });

  const openDialog = useCallback(
    (management: GridType, type: DialogState['type'], data?: City | Hotel) => {
      setDialogState({
        management,
        type,
        isOpen: true,
        cityData: management === GridType.CITY ? (data as City) : undefined,
        hotelData: management === GridType.HOTEL ? (data as Hotel) : undefined,
      });
    },
    [],
  );

  const closeDialog = useCallback(() => {
    setDialogState({
      management: GridType.CITY,
      type: 'Add',
      isOpen: false,
      cityData: undefined,
      hotelData: undefined,
    });
  }, []);

  return { dialogState, openDialog, closeDialog };
};

export default useDialog;
