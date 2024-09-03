import React, { FC, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import { GridType } from './types/adminTypes';
import MyErrorBoundary from './components/shared/ErrorBoundary/ErrorBoundary';
import CursorFollower from './components/shared/CursorFollower/CursorFollower';
import Spinner from './components/shared/Spinner/Spinner';

// Lazy load the pages
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const UserPage = lazy(() => import('./pages/UserPage/UserPage'));
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const SearchPage = lazy(() => import('./pages/SearchPage/SearchPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage/CheckoutPage'));
const HotelPage = lazy(() => import('./pages/HotelPage/HotelPage'));
const ConfirmationPage = lazy(
  () => import('./pages/ConfirmationPage/ConfirmationPage'),
);
const AdminPage = lazy(() => import('./pages/AdminPage/AdminPage'));
const Body = lazy(() => import('./components/admin/Body/Body'));

const NotFoundErrorPage = lazy(
  () => import('./pages/NotFoundErrorPage/NotFoundErrorPage'),
);
const UnauthorizedErrorPage = lazy(
  () => import('./pages/UnauthorizedErrorPage/UnauthorizedErrorPage'),
);

const App: FC = () => {
  return (
    <>
      <CursorFollower />

      <MyErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route index element={<LoginPage />} />
            <Route path="login" element={<LoginPage />} />

            <Route
              path="main"
              element={
                <PrivateRoute allowedRoles={['User']}>
                  <UserPage />
                </PrivateRoute>
              }
            >
              <Route index element={<HomePage />} />
              <Route path="home" element={<HomePage />} />
              <Route path="search" element={<SearchPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="confirmation" element={<ConfirmationPage />} />
              <Route path="hotel/:hotelId" element={<HotelPage />} />
            </Route>

            <Route
              path="adminPortal"
              element={
                <PrivateRoute allowedRoles={['Admin']}>
                  <AdminPage />
                </PrivateRoute>
              }
            >
              <Route index element={<Body gridType={GridType.CITY} />} />
              <Route path="city" element={<Body gridType={GridType.CITY} />} />
              <Route
                path="hotel"
                element={<Body gridType={GridType.HOTEL} />}
              />
              <Route path="room" element={<Body gridType={GridType.ROOM} />} />
            </Route>

            <Route
              path="unauthorizedUser"
              element={<UnauthorizedErrorPage />}
            />
            <Route path="*" element={<NotFoundErrorPage />} />
          </Routes>
        </Suspense>
      </MyErrorBoundary>
    </>
  );
};

export default App;
