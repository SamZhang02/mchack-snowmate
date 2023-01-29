import ReactDOM from 'react-dom/client';
import App from './pages/MapPage';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import OnboardingPage from './pages/OnboardingPage';
import MapPage from './pages/MapPage';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const router = createBrowserRouter([
  {
    path: '/',
    element: <OnboardingPage />,
  },
  {
    path: '/map',
    element: <MapPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ChakraProvider>
    <RouterProvider router={router} />
  </ChakraProvider>
);
