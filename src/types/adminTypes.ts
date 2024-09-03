import { Amenity } from './hotelTypes';

export enum GridType {
  CITY = 'city',
  HOTEL = 'hotel',
  ROOM = 'room',
}

export enum SearchOptions {
  NAME = 'name',
  DESCRIPTION = 'description',
  ROOM_NUMBER = 'Number',
  ROOM_TYPE = 'Type',
}

export interface Pagination {
  CurrentPage: number;
  TotalPageCount: number;
  TotalItemCount: number;
  PageSize: number;
}

export interface City {
  id: number;
  name: string;
  description: string;
}

export interface Hotel {
  id: number;
  name: string;
  description: string;
  hotelType: number;
  starRating: number;
  latitude: number;
  longitude: number;
}

export interface NewRoom {
  id?: number;
  roomNumber: string;
  cost: number;
}

export interface HotelRooms extends Hotel {
  rooms: NewRoom[];
}

export interface Room {
  roomId: number;
  roomNumber: number;
  roomPhotoUrl: string;
  roomType: string;
  capacityOfAdults: number;
  capacityOfChildren: number;
  roomAmenities: Amenity[];
  price: number;
  availability: boolean;
}

export interface AdminContextType {
  cities: City[];
  setCities: React.Dispatch<React.SetStateAction<City[]>>;

  hotelsResponse: { data: Hotel[]; pagination: Pagination };
  setHotelsResponse: React.Dispatch<
    React.SetStateAction<{ data: Hotel[]; pagination: Pagination }>
  >;

  rooms: Room[];
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;

  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  searchOption: SearchOptions;
  setSearchOption: React.Dispatch<React.SetStateAction<SearchOptions>>;
}
