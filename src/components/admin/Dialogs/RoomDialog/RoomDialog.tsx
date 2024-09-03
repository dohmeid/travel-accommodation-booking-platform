import React, { FC } from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import { roomDialogSchema } from '../../../../schemas/validationSchemas';
import { UseDialog, DialogState } from '../../../../hooks/useDialog';
import { Room } from '../../../../types/adminTypes';
import useRoomsManagement from '../../../../hooks/useRoomsManagement';
import classes from './RoomDialog.module.css';

interface DialogFormValues {
  roomNumber: string;
  cost: number;
}

interface Props {
  dialogState: DialogState<Room>;
  closeDialog: UseDialog['closeDialog'];
}

const RoomDialog: FC<Props> = ({ dialogState, closeDialog }) => {
  const { createRoom, updateRoom } = useRoomsManagement();
  const { mode, isOpen, data } = dialogState;

  const initialRoomValues = {
    roomNumber: data ? String(data?.roomNumber) : '',
    cost: data?.price || 0,
  };

  const handleSubmitForm = async (
    values: DialogFormValues,
    { setSubmitting }: FormikHelpers<DialogFormValues>,
  ) => {
    const newRoom = {
      id: data?.roomId,
      ...values,
    };

    try {
      if (mode === 'Add') {
        await createRoom(newRoom);
      } else if (mode === 'Update') {
        if (data) await updateRoom(data, newRoom);
      }
    } finally {
      closeDialog();
      setSubmitting(false);
    }
  };

  if (!isOpen || !['Add', 'Update'].includes(mode)) return null;

  return (
    <div className={classes.dialogContainer}>
      <Formik
        initialValues={initialRoomValues}
        validationSchema={roomDialogSchema}
        onSubmit={handleSubmitForm}
      >
        {(formik) => (
          <Form
            aria-labelledby="add-update-room-form"
            className={classes.dialogForm}
          >
            <h2>{mode === 'Add' ? 'Add New Room' : 'Update Room'}</h2>

            <div className={classes.inputContainer}>
              <Field
                type="text"
                name="roomNumber"
                id="roomNumber"
                placeholder="Room number"
                aria-describedby="room-number"
                autoComplete="true"
                className={classes.nameField}
              />
              <ErrorMessage
                name="roomNumber"
                component="div"
                className={classes.errorAlert}
              />
            </div>

            <div className={classes.inputContainer}>
              <Field
                type="number"
                name="cost"
                id="cost"
                placeholder="Cost"
                aria-describedby="cost"
                autoComplete="true"
                className={classes.nameField}
              />
              <ErrorMessage
                name="cost"
                component="div"
                className={classes.errorAlert}
              />
            </div>

            <div className={classes.buttonsContainer}>
              <button
                type="button"
                className={classes.cancelButton}
                onClick={closeDialog}
              >
                Cancel
              </button>

              <button
                type="submit"
                className={classes.addUpdateButton}
                disabled={
                  formik.isSubmitting ||
                  !formik.isValid ||
                  !formik.values.roomNumber ||
                  !formik.values.cost
                }
              >
                {formik.isSubmitting
                  ? mode === 'Add'
                    ? 'Adding...'
                    : 'Updating...'
                  : mode === 'Add'
                    ? 'Add'
                    : 'Update'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RoomDialog;
