import {
  useNotification,
  NotificationType,
} from '../context/notificationProvider';

interface Identifiable {
  id: number;
}

export const useAdminCrud = () => {
  const { notify } = useNotification();

  const createData = async <T extends Identifiable>(
    createFunction: (data: T) => Promise<T>,
    data: T,
    setState: React.Dispatch<React.SetStateAction<T[]>>,
  ) => {
    try {
      const responseData = await createFunction(data);
      setState((prevData) => [...prevData, responseData]);
      notify(NotificationType.SUCCESS, 'created new item successfully');
    } catch (error) {
      notify(NotificationType.ERROR, (error as Error).message);
    }
  };

  const updateData = async <T extends Identifiable>(
    updateFunction: (data: T) => Promise<string>,
    data: T,
    setState: React.Dispatch<React.SetStateAction<T[]>>,
  ) => {
    try {
      await updateFunction(data);
      setState((prevData) =>
        prevData.map((item) =>
          item.id === data.id ? { ...item, ...data } : item,
        ),
      );
      notify(NotificationType.SUCCESS, 'updated successfully');
    } catch (error) {
      notify(NotificationType.ERROR, (error as Error).message);
    }
  };

  const deleteData = async <T extends Identifiable>(
    deleteFunction: (id: number) => Promise<string>,
    id: number,
    setState: React.Dispatch<React.SetStateAction<T[]>>,
  ) => {
    try {
      await deleteFunction(id);
      setState((prevData) => prevData.filter((item) => item.id !== id));
      notify(NotificationType.SUCCESS, 'deleted successfully');
    } catch (error) {
      notify(NotificationType.ERROR, (error as Error).message);
    }
  };

  return {
    createData,
    updateData,
    deleteData,
  };
};
