import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MovieTile from './MovieTile';
import { getFormatGenres } from '../../utils/get-format-genres';
import type { MovieInfo } from '../../types/movie';

describe('MovieTile component', () => {
  const movie: MovieInfo = {
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

    expect(screen.getByText('Inception')).toBeInTheDocument();
    expect(screen.getByText('2010')).toBeInTheDocument();
    expect(screen.getByText(getFormatGenres(movie.genres))).toBeInTheDocument();
    expect(screen.getByAltText('Inception')).toHaveAttribute('src', 'inception.jpg');
  });

  it('calls onClick when tile is clicked', () => {
    const onClickMock = jest.fn();
    render(<MovieTile movie={movie} onClick={onClickMock} />);

    fireEvent.click(screen.getByText('Inception'));
    expect(onClickMock).toHaveBeenCalledWith('Inception');
  });

  it('opens and closes the menu when menu button is clicked', () => {
    render(<MovieTile movie={movie} />);

    fireEvent.click(screen.getByText('⋮'));
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();

    fireEvent.click(screen.getByText('✕'));
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });

  it('calls onEdit when Edit button is clicked', () => {
    const onEditMock = jest.fn();
    render(<MovieTile movie={movie} onEdit={onEditMock} />);

    fireEvent.click(screen.getByText('⋮'));
    fireEvent.click(screen.getByText('Edit'));

    expect(onEditMock).toHaveBeenCalledWith('Inception');
  });

  it('calls onDelete when Delete button is clicked', () => {
    const onDeleteMock = jest.fn();
    render(<MovieTile movie={movie} onDelete={onDeleteMock} />);

    fireEvent.click(screen.getByText('⋮'));
    fireEvent.click(screen.getByText('Delete'));

    expect(onDeleteMock).toHaveBeenCalledWith('Inception');
  });
});