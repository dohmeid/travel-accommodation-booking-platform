import { useCallback, useState } from "react";
import { City, Hotel } from "../interfaces/interfaces";

export interface DialogState {
  management: "City" | "Hotel" | "";
  isOpen: boolean;
  type: "Add" | "Update" | "Delete" | "";
  cityData: City;
  hotelData: Hotel;
}

export interface UseDialog {
  dialogState: DialogState;
  openDialog: (
    management: DialogState["management"],
    type: DialogState["type"],
    cityData?: any,
    hotelData?: any
  ) => void;
  closeDialog: () => void;
}

const emptyCity = { id: -1, name: "", description: "" };
const emptyHotel = {
  id: -1,
  name: "",
  description: "",
  hotelType: 0,
  starRating: 0,
  latitude: 0,
  longitude: 0,
};

export const useDialog = (): UseDialog => {
  const [dialogState, setDialogState] = useState<DialogState>({
    management: "",
    isOpen: false,
    type: "",
    cityData: emptyCity,
    hotelData: emptyHotel,
  });

  const openDialog = useCallback(
    (
      management: DialogState["management"],
      type: DialogState["type"],
      cityData: DialogState["cityData"],
      hotelData: DialogState["hotelData"]
    ) => {
      if (type === "Add") {
        setDialogState({
          management,
          isOpen: true,
          type,
          cityData: emptyCity,
          hotelData: emptyHotel,
        });
      } else {
        if (management === "City") {
          setDialogState({
            management,
            isOpen: true,
            type,
            cityData,
            hotelData: emptyHotel,
          });
        } else {
          setDialogState({
            management,
            isOpen: true,
            type,
            cityData: emptyCity,
            hotelData,
          });
        }
      }
    },
    []
  );

  const closeDialog = useCallback(() => {
    setDialogState({
      management: "",
      isOpen: false,
      type: "",
      cityData: emptyCity,
      hotelData: emptyHotel,
    });
  }, []);

  return { dialogState, openDialog, closeDialog };
};

export default useDialog;
