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
