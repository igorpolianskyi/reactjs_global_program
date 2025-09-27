import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MovieListPage from './components/MovieListPage/MovieListPage.tsx';
import SearchFormWrapper from './components/SearchForm/SearchFormWrapper.tsx';
import MovieDetailsWrapper from './components/MovieDetails/MovieDetailsWrapper.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MovieListPage />,
    children: [
      { path: "/", element: <SearchFormWrapper/> },
      { path: "movie/:movieId", element: <MovieDetailsWrapper /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
