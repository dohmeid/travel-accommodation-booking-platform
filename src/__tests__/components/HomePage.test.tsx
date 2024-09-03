import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import HomePage from '../../pages/HomePage/HomePage';
import { HomeContext } from '../../context/homeProvider';
import { SearchProvider } from '../../context/searchProvider';
import { NotificationProvider } from '../../context/notificationProvider';
import { AuthProvider } from '../../context/authProvider';
import { BrowserRouter } from 'react-router-dom';

// custom mock for the home provider
const MockHomeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const mockValue = {
    deals: [
      {
        title: 'Special Offer',
        description: 'Enjoy a luxurious stay with a 20% discount.',
        roomPhotoUrl: 'url-to-photo',
        hotelId: 1,
        hotelName: 'Hotel Sunshine',
        hotelStarRating: 5,
        cityName: 'New York',
        originalRoomPrice: 300,
        discount: 20,
        finalPrice: 240,
      },
    ],
    recentHotels: [
      {
        hotelId: 1,
        hotelName: 'Hotel 2',
        cityName: 'Ramallah',
        thumbnailUrl: 'url-to-thumbnail',
        starRating: 5,
        visitDate: '2024-08-01',
        priceLowerBound: 240,
        priceUpperBound: 300,
      },
    ],
    destinations: [
      {
        cityId: 1,
        cityName: 'Paris',
        countryName: 'France',
        description: 'The City of Light awaits you!',
        thumbnailUrl: 'url-to-paris-thumbnail',
      },
    ],
  };

  return (
    <HomeContext.Provider value={mockValue}>{children}</HomeContext.Provider>
  );
};

const renderHomePage = () => {
  render(
    <NotificationProvider>
      <BrowserRouter>
        <AuthProvider>
          <MockHomeProvider>
            <SearchProvider>
              <HomePage />
            </SearchProvider>
          </MockHomeProvider>
        </AuthProvider>
      </BrowserRouter>
    </NotificationProvider>,
  );
};

describe('HomePage Component', () => {
  describe('Smoke Tests', () => {
    it('should render correct headers and descriptions', () => {
      renderHomePage();

      expect(
        screen.getByText('Escape the Ordinary, Book the Extraordinary'),
      ).toBeInTheDocument();
      expect(screen.getByText('Featured Deals')).toBeInTheDocument();
      expect(
        screen.getByText(
          'Spontaneous savings. Available nowhere else. Bookmark now and never miss out!',
        ),
      ).toBeInTheDocument();
      expect(screen.getByText('Trending Destinations')).toBeInTheDocument();
      expect(
        screen.getByText(
          'Planning you next adventure? Here are the most popular choices for travellers.',
        ),
      ).toBeInTheDocument();
      expect(screen.getByText('Recently Visited Hotels')).toBeInTheDocument();
      expect(
        screen.getByText('Ready for a Repeat? Check Out Your Recent Hotels!'),
      ).toBeInTheDocument();
    });

    it('should render search bar and scroll to top button', () => {
      renderHomePage();

      expect(
        screen.getByPlaceholderText('Search for hotels...'),
      ).toBeInTheDocument();

      const scrollToTopButton = screen.getByRole('scroll');
      expect(scrollToTopButton).toBeInTheDocument();
    });
  });

  describe('Basic Functionality', () => {
    it('should render featured deals data correctly', () => {
      renderHomePage();

      expect(screen.getByText(/Hotel Sunshine, New York/i)).toBeInTheDocument();
      expect(screen.getByText(/Special Offer/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Enjoy a luxurious stay with a 20% discount/i),
      ).toBeInTheDocument();
    });

    it('should render trending destinations data correctly', () => {
      renderHomePage();
      expect(screen.getByText(/Paris/i)).toBeInTheDocument();
      expect(screen.getByText(/France/i)).toBeInTheDocument();
    });

    it('should render recent hotels data correctly', () => {
      renderHomePage();
      expect(screen.getByText(/Hotel 2/i)).toBeInTheDocument();
      expect(screen.getByText(/Ramallah/)).toBeInTheDocument();
    });
  });
});
