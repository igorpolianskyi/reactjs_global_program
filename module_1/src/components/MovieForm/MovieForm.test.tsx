import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MovieForm from './MovieForm';
import type { MovieInfo } from '../../types/movie';

describe('MovieForm', () => {
  const initialMovie: MovieInfo = {
    name: 'Inception',
    year: 2010,
    genres: ['Action', 'Sci-Fi'],
    imageUrl: 'https://example.com/inception.jpg',
    rating: 8.8,
    duration: '148',
    description: 'A thief who steals corporate secrets through dream-sharing technology.',
  };

  it('renders empty form when no initialMovie', () => {
    const onSubmitMock = jest.fn();
    render(<MovieForm onSubmit={onSubmitMock} />);

    expect(screen.getByPlaceholderText('Movie title')).toHaveValue('');
    expect(screen.getByPlaceholderText('https://')).toHaveValue('');
    expect(screen.getByPlaceholderText('Movie description')).toHaveValue('');
  });

  it('renders prefilled form when initialMovie is provided', () => {
    const onSubmitMock = jest.fn();
    render(<MovieForm initialMovie={initialMovie} onSubmit={onSubmitMock} />);

    expect(screen.getByDisplayValue(initialMovie.name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(initialMovie.imageUrl)).toBeInTheDocument();
    expect(screen.getByDisplayValue(initialMovie.rating.toString())).toBeInTheDocument();
    expect(screen.getByDisplayValue(initialMovie.duration)).toBeInTheDocument();
    expect(screen.getByDisplayValue(initialMovie.description)).toBeInTheDocument();
  });

  it('updates input fields when user types', () => {
    const onSubmitMock = jest.fn();
    render(<MovieForm onSubmit={onSubmitMock} />);

    const titleInput = screen.getByPlaceholderText('Movie title') as HTMLInputElement;
    fireEvent.change(titleInput, { target: { value: 'Interstellar' } });
    expect(titleInput.value).toBe('Interstellar');

    const descriptionInput = screen.getByPlaceholderText('Movie description') as HTMLTextAreaElement;
    fireEvent.change(descriptionInput, { target: { value: 'Space exploration movie' } });
    expect(descriptionInput.value).toBe('Space exploration movie');
  });

  it('calls onSubmit with correct data', () => {
    const onSubmitMock = jest.fn();
    render(<MovieForm initialMovie={initialMovie} onSubmit={onSubmitMock} />);

    const titleInput = screen.getByPlaceholderText('Movie title');
    fireEvent.change(titleInput, { target: { value: 'Interstellar' } });

    const submitButton = screen.getByText('SUBMIT');
    fireEvent.click(submitButton);

    expect(onSubmitMock).toHaveBeenCalledTimes(1);
    expect(onSubmitMock).toHaveBeenCalledWith({
      name: 'Interstellar',
      year: initialMovie.year,
      genres: initialMovie.genres,
      imageUrl: initialMovie.imageUrl,
      rating: initialMovie.rating,
      duration: initialMovie.duration,
      description: initialMovie.description,
    });
  });
  it('resets selectedGenres and releaseYear when RESET button is clicked', () => {
    const onSubmitMock = jest.fn();
    render(<MovieForm initialMovie={initialMovie} onSubmit={onSubmitMock} />);

    const resetButton = screen.getByText('RESET');
    fireEvent.click(resetButton);


    expect(screen.queryByText('Action')).not.toBeInTheDocument();
    expect(screen.queryByText('Sci-Fi')).not.toBeInTheDocument();

    const yearInput = screen.getByPlaceholderText('Select year') as HTMLInputElement;
    expect(yearInput.value).toBe('');
  });

  it('does not submit when required fields are empty', () => {
    const onSubmitMock = jest.fn();
    render(<MovieForm onSubmit={onSubmitMock} />);

    const submitButton = screen.getByText('SUBMIT');
    fireEvent.click(submitButton);

    expect(onSubmitMock).not.toHaveBeenCalled();
  });
});