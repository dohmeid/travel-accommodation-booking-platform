import { apiRequest, HttpMethod } from '../../api/apiClient';
import {
  getFeaturedDeals,
  getTrendingDestinations,
  getRecentHotels,
} from '../../api/homeService';
import { Deal, Destination, RecentHotel } from '../../types/homeTypes';

jest.mock('../../api/apiClient', () => {
  return {
    apiRequest: jest.fn(),
    HttpMethod: {
      GET: 'get',
      POST: 'post',
      PUT: 'put',
      DELETE: 'delete',
    },
  };
});

describe('Home API Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Api success tests', () => {
    it('should make a GET request for featured deals', async () => {
      const mockDeals: Deal[] = [
        {
          title: 'deal',
          description: 'deal',
          roomPhotoUrl: 'url',
          hotelId: 0,
          hotelName: 'deal',
          hotelStarRating: 4,
          cityName: 'deal',
          originalRoomPrice: 400,
          discount: 80,
          finalPrice: 320,
        },
      ];
      (apiRequest as jest.Mock).mockResolvedValueOnce(mockDeals);

      const result = await getFeaturedDeals();

      expect(apiRequest).toHaveBeenCalledWith(
        HttpMethod.GET,
        '/api/home/featured-deals',
      );
      expect(result).toEqual(mockDeals);
    });

    it('should make a GET request for trending destinations', async () => {
      const mockDestinations: Destination[] = [
        {
          cityId: 1,
          cityName: 'rio',
          countryName: 'brazil',
          description: 'cool city to visit',
          thumbnailUrl: 'https://fakeurl/',
        },
        {
          cityId: 2,
          cityName: 'ramallah',
          countryName: 'palestine',
          description: 'cool city to visit',
          thumbnailUrl: 'https://fakeurl/',
        },
      ];
      (apiRequest as jest.Mock).mockResolvedValueOnce(mockDestinations);
      const result = await getTrendingDestinations();
      expect(apiRequest).toHaveBeenCalledWith(
        HttpMethod.GET,
        '/api/home/destinations/trending',
      );
      expect(result).toEqual(mockDestinations);
    });

    it('should make a GET request for recent hotels', async () => {
      const userId = 1;
      const mockRecentHotels: RecentHotel[] = [
        {
          hotelId: 0,
          hotelName: 'stars hotel',
          cityName: 'ramallah',
          thumbnailUrl: 'https//fakeurl/7896/',
          starRating: 5,
          visitDate: '01/9/2022',
          priceLowerBound: 100,
          priceUpperBound: 500,
        },
      ];

      (apiRequest as jest.Mock).mockResolvedValueOnce(mockRecentHotels);
      const result = await getRecentHotels(userId);
      expect(apiRequest).toHaveBeenCalledWith(
        HttpMethod.GET,
        `/api/home/users/${userId}/recent-hotels`,
      );
      expect(result).toEqual(mockRecentHotels);
    });
  });

  describe('Api failure tests', () => {
    it('should handle errors on getFeaturedDeals call', async () => {
      (apiRequest as jest.Mock).mockRejectedValueOnce(
        new Error('API call failed'),
      );
      await expect(getFeaturedDeals()).rejects.toThrow('API call failed');
    });

    it('should handle errors on getRecentHotels call', async () => {
      const userId = 123;
      (apiRequest as jest.Mock).mockRejectedValueOnce(
        new Error('API call failed'),
      );
      await expect(getRecentHotels(userId)).rejects.toThrow('API call failed');
    });
  });
});
