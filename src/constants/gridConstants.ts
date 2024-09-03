import { GridType } from '../types/adminTypes';

export const GRID_TITLES: Record<string, string> = {
  [GridType.CITY]: 'Cities List',
  [GridType.HOTEL]: 'Hotels List',
  [GridType.ROOM]: 'Rooms List',
};

export const CITY_HEADER = ['ID', 'Name', 'Description', 'Action'];

export const HOTEL_HEADER = [
  'ID',
  'Name',
  'Description',
  'Hotel Type',
  'Star Rating',
  'Latitude',
  'Longitude',
  'Action',
];

export const ROOM_HEADER = [
  'ID',
  'Number',
  'Room Type',
  'Adults Capacity',
  'Children Capacity',
  'Amenities',
  'Price',
  'Availability',
  'Action',
];
