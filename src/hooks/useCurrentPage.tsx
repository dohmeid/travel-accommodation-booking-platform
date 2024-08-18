import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const ROUTES = {
  MAIN: '/main',
  HOME: '/main/home',
  SEARCH: '/main/search',
  CHECKOUT: '/main/checkout',
  ADMIN_PORTAL: '/adminPortal',
  CITY_MANAGEMENT: '/adminPortal/city',
  HOTEL_MANAGEMENT: '/adminPortal/hotel',
  ROOM_MANAGEMENT: '/adminPortal/room',
};

const useCurrentPage = () => {
  const { pathname } = useLocation();

  return useMemo(
    () => ({
      isInHomePage: [ROUTES.MAIN, ROUTES.HOME].includes(pathname),
      isInSearchPage: pathname === ROUTES.SEARCH,
      isInCheckoutPage: pathname === ROUTES.CHECKOUT,
      isInCityManagementPage: [
        ROUTES.ADMIN_PORTAL,
        ROUTES.CITY_MANAGEMENT,
      ].includes(pathname),
      isInHotelManagementPage: pathname === ROUTES.HOTEL_MANAGEMENT,
      isInRoomManagementPage: pathname === ROUTES.ROOM_MANAGEMENT,
    }),
    [pathname],
  );
};

export default useCurrentPage;
