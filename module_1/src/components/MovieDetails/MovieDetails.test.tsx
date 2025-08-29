import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieDetails from './MovieDetails';
import type { MovieInfo } from '../../types/movie';
import { getFormatGenres } from '../../utils/get-format-genres';

describe('MovieDetails component', () => {
  const movie: MovieInfo = {
    name: 'Inception',
    year: 2010,
    genres: ['Action', 'Sci-Fi'],
    imageUrl: 'inception.jpg',
    rating: 8.8,
    duration: '2h 28min',
    description: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.',
  };

  it('renders the movie poster image correctly', () => {
    render(<MovieDetails movie={movie} />);
    const image = screen.getByAltText(movie.name) as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toContain('inception.jpg');
  });

  it('renders movie name and rating', () => {
    render(<MovieDetails movie={movie} />);
    expect(screen.getByText(movie.name)).toBeInTheDocument();
    expect(screen.getByText(movie.rating.toString())).toBeInTheDocument();
  });

  it('renders movie genres using getFormatGenres', () => {
    render(<MovieDetails movie={movie} />);
    expect(screen.getByText(getFormatGenres(movie.genres))).toBeInTheDocument();
  });

  it('renders movie year and duration', () => {
    render(<MovieDetails movie={movie} />);
    expect(screen.getByText(movie.year.toString())).toBeInTheDocument();
    expect(screen.getByText(movie.duration)).toBeInTheDocument();
  });

  it('renders movie description', () => {
    render(<MovieDetails movie={movie} />);
    expect(screen.getByText(movie.description)).toBeInTheDocument();
  });
});