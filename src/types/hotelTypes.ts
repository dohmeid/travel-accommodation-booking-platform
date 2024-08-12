export interface GalleryImage {
  id: number;
  url: string;
}

interface Amenity {
  name: string;
  description: string;
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
