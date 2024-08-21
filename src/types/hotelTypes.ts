export interface Amenity {
  id?: number;
  name: string;
  description: string;
}

export interface GalleryImage {
  id: number;
  url: string;
}

export interface HotelInformation {
  hotelName: string;
  location: string;
  description: string;
  latitude: number;
  longitude: number;
  amenities: Amenity[];
  starRating: number;
  availableRooms: number;
  imageUrl: string;
  cityId: number;
}

export interface Review {
  reviewId: number;
  customerName: string;
  rating: number;
  description: string;
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

export interface HotelContextProps {
  gallery: GalleryImage[];
  info: HotelInformation | null;
  reviews: Review[];
  rooms: Room[];
  isLoading: boolean;
  fetchHotelData: (
    id: number,
    checkInDate: string,
    checkOutDate: string,
  ) => Promise<void>;
}
