import { useCallback, useState } from "react";
import { City } from "../interfaces/interfaces";

export interface DialogState {
  isOpen: boolean;
  type: "add" | "update" | "delete" | null;
  data: City | null;
}

export interface UseDialog {
  dialogState: DialogState;
  openDialog: (type: DialogState["type"], data?: any) => void;
  closeDialog: () => void;
}

export const useDialog = (): UseDialog => {
  const [dialogState, setDialogState] = useState<DialogState>({
    isOpen: false,
    type: null,
    data: null,
  });

  const openDialog = useCallback(
    (type: DialogState["type"], data: DialogState["data"]) => {
      setDialogState({ isOpen: true, type, data });
    },
    []
  );

  const closeDialog = useCallback(() => {
    setDialogState({ isOpen: false, type: null, data: null });
  }, []);

  return { dialogState, openDialog, closeDialog };
};

export default useDialog;
