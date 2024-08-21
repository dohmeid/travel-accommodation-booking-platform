export interface Deal {
  title: string;
  description: string;
  roomPhotoUrl: string;
  hotelId: number;
  hotelName: string;
  hotelStarRating: number;
  cityName: string;
  originalRoomPrice: number;
  discount: number;
  finalPrice: number;
}

export interface RecentHotel {
  hotelId: number;
  hotelName: string;
  cityName: string;
  thumbnailUrl: string;
  starRating: number;
  visitDate: string;
  priceLowerBound: number;
  priceUpperBound: number;
}

export interface Destination {
  cityId: number;
  cityName: string;
  countryName: string;
  description: string;
  thumbnailUrl: string;
}

export interface HomeContextType {
  deals: Deal[];
  destinations: Destination[];
  recentHotels: RecentHotel[];
}
