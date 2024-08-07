export interface Destination {
  cityId: number;
  cityName: string;
  countryName: string;
  description: string;
  thumbnailUrl: string;
}

export interface Deal {
  hotelId: number;
  originalRoomPrice: number;
  discount: number;
  finalPrice: number;
  cityName: string;
  hotelName: string;
  hotelStarRating: number;
  title: string;
  description: string;
  roomPhotoUrl: string;
}

export interface RecentHotel {
  hotelId: number;
  thumbnailUrl: string;
  hotelName: string;
  starRating: number;
  cityName: string;
  visitDate: string;
  priceLowerBound: number;
  priceUpperBound: number;
}

export interface HomeContextType {
  deals: Deal[];
  destinations: Destination[];
  recentHotels: RecentHotel[];
}
