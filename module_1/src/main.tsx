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
import AddMovieForm from './components/AddMovieForm/AddMovieForm.tsx';
import EditMovieForm from './components/EditMovieForm/EditMovieForm.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MovieListPage />,
    children: [
      {
        path: "/", 
        element: <SearchFormWrapper />, 
        children: [
          { path: "new", element: <AddMovieForm /> },
        ],
      },
      { path: "movie/:movieId", element: <MovieDetailsWrapper />,
        children: [
          { path: "edit", element: <EditMovieForm /> },
        ]
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
