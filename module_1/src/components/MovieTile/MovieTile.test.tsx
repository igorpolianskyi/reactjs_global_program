import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MovieTile from './MovieTile';
import { getFormatGenres } from '../../utils/get-format-genres';
import type { MovieInfo } from '../../types/movie';

describe('MovieTile component', () => {
  const movie: MovieInfo = {
    id: 1,
    name: 'Inception',
    year: 2010,
    genres: ['Action', 'Sci-Fi'],
    imageUrl: 'inception.jpg',
    rating: 8.8,
    duration: '2h 28min',
    description: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.',
  };

  it('renders movie details correctly', () => {
    render(<MovieTile movie={movie} />);

    expect(screen.getByText(movie.name)).toBeInTheDocument();
    expect(screen.getByText(movie.year.toString())).toBeInTheDocument();
    expect(screen.getByText(getFormatGenres(movie.genres))).toBeInTheDocument();
    expect(screen.getByAltText(movie.name)).toHaveAttribute('src', movie.imageUrl);
  });

  it('calls onClick when tile is clicked', async () => {
    const onClickMock = jest.fn();
    render(<MovieTile movie={movie} onClick={onClickMock} />);
    
    await userEvent.click(screen.getByTestId('movie-tile'));
    expect(onClickMock).toHaveBeenCalledWith(movie.id);
  });

  it('opens and closes the menu when menu button is clicked', async () => {
    render(<MovieTile movie={movie} />);

    // Відкрити меню
    await userEvent.click(screen.getByText('⋮'));
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();

    // Закрити меню
    await userEvent.click(screen.getByText('✕'));
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });

  it('calls onEdit when Edit button is clicked', async () => {
  const onEditMock = jest.fn();
  render(<MovieTile movie={movie} onEdit={onEditMock} />);

  await userEvent.click(screen.getByText('⋮'));
  await userEvent.click(screen.getByText('Edit'));

  expect(onEditMock).toHaveBeenCalledWith(movie.id);  // очікуємо id
});

it('calls onDelete when Delete button is clicked', async () => {
  const onDeleteMock = jest.fn();
  render(<MovieTile movie={movie} onDelete={onDeleteMock} />);

  await userEvent.click(screen.getByText('⋮'));
  await userEvent.click(screen.getByText('Delete'));

  expect(onDeleteMock).toHaveBeenCalledWith(movie.name);
});
});