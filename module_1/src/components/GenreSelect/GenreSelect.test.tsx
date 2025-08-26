import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GenreSelect from './GenreSelect';

describe('GenreSelect component', () => {
  const genres = ['ALL', 'DOCUMENTARY', 'COMEDY', 'HORROR', 'CRIME'];

  it('renders all genres passed in props', () => {
    render(<GenreSelect genres={genres} selectedGenre="" onSelect={jest.fn()} />);
    
    genres.forEach((genre) => {
      expect(screen.getByText(genre)).toBeInTheDocument();
    });
  });

  it('highlights the selected genre passed in props', () => {
    const selectedGenre = 'COMEDY';
    render(<GenreSelect genres={genres} selectedGenre={selectedGenre} onSelect={jest.fn()} />);
    
    const selectedButton = screen.getByText(selectedGenre);
    expect(selectedButton.className).toContain('active');
  });

  it('calls onSelect callback with correct genre when a genre button is clicked', () => {
    const onSelectMock = jest.fn();
    render(<GenreSelect genres={genres} selectedGenre="" onSelect={onSelectMock} />);
    
    const genreButton = screen.getByText('DOCUMENTARY');
    fireEvent.click(genreButton);
    
    expect(onSelectMock).toHaveBeenCalledWith('DOCUMENTARY');
  });
});