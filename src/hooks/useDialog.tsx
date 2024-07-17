import { useCallback, useState } from "react";
import { City } from "../interfaces/interfaces";

export interface DialogState {
  isOpen: boolean;
  type: "Add" | "Update" | "Delete" | "";
  data: City;
}

export interface UseDialog {
  dialogState: DialogState;
  openDialog: (type: DialogState["type"], data?: any) => void;
  closeDialog: () => void;
}

export const useDialog = (): UseDialog => {
  const [dialogState, setDialogState] = useState<DialogState>({
    isOpen: false,
    type: "",
    data: { id: -1, name: "", description: "" },
  });

  const openDialog = useCallback(
    (type: DialogState["type"], data: DialogState["data"]) => {
      setDialogState({ isOpen: true, type, data });
    },
    []
  );

  const closeDialog = useCallback(() => {
    setDialogState({
      isOpen: false,
      type: "",
      data: { id: -1, name: "", description: "" },
    });
  }, []);

  return { dialogState, openDialog, closeDialog };
};

export default useDialog;
