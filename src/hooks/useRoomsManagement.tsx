import { useState } from 'react';
import {
  addRoom,
  editRoom,
  getRooms,
  removeRoom,
} from '../api/manageRoomsService';
import { Room, NewRoom, SearchOptions } from '../types/adminTypes';
import {
  NotificationType,
  useNotification,
} from '../context/notificationProvider';
import { useAdminContext } from '../context/adminProvider';
import { getToday } from '../utils/dates';

const useRoomsManagement = () => {
  const { rooms, setRooms, searchOption, searchQuery } = useAdminContext();
  const [isLoading, setIsLoading] = useState(true);
  const { notify } = useNotification();

  const fetchRooms = async () => {
    try {
      setIsLoading(true);
      const date = getToday();
      const response = await getRooms(0, date, date);
      setRooms(response);
    } catch (error: unknown) {
      notify(NotificationType.ERROR, (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const createRoom = async (roomData: NewRoom) => {
    try {
      const responseData = await addRoom(0, roomData);
      const room = responseData.rooms[0];

      const newRoom: Room = {
        roomId: room.id ?? -1,
        roomNumber: Number(room.roomNumber),
        roomPhotoUrl: '',
        roomType: '',
        capacityOfAdults: 0,
        capacityOfChildren: 0,
        roomAmenities: [],
        price: room.cost,
        availability: true,
      };
      setRooms((prevData) => [...prevData, newRoom]);
      notify(NotificationType.SUCCESS, 'created new room successfully');
    } catch (error) {
      notify(NotificationType.ERROR, (error as Error).message);
    }
  };

  const updateRoom = async (room: Room, roomData: NewRoom) => {
    try {
      await editRoom(roomData);
      const updatedRoom: Room = {
        ...room,
        roomNumber: Number(roomData.roomNumber),
        price: roomData.cost,
      };

      setRooms((prevData) =>
        prevData.map((item) =>
          item.roomId === roomData.id ? { ...updatedRoom } : item,
        ),
      );
      notify(NotificationType.SUCCESS, 'updated successfully');
    } catch (error) {
      notify(NotificationType.ERROR, (error as Error).message);
    }
  };

  const deleteRoom = async (roomId: number) => {
    try {
      await removeRoom(0, roomId);
      setRooms((prevData) => prevData.filter((item) => item.roomId !== roomId));
      notify(NotificationType.SUCCESS, 'deleted successfully');
    } catch (error) {
      notify(NotificationType.ERROR, (error as Error).message);
    }
  };

  const getFilteredRooms = (): Room[] => {
    const query = searchQuery;
    return rooms.filter((room) =>
      searchOption === SearchOptions.ROOM_NUMBER
        ? String(room.roomNumber).includes(query)
        : room.roomType.toLowerCase().includes(query.toLowerCase()),
    );
  };

  return {
    isLoading,
    rooms,
    fetchRooms,
    getFilteredRooms,
    createRoom,
    updateRoom,
    deleteRoom,
  };
};

export default useRoomsManagement;
