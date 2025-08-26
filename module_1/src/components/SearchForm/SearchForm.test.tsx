import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchForm from './SearchForm';

describe('SearchForm component', () => {
  it('renders an input with initial value from props', () => {
    render(<SearchForm initialQuery="hello" onSearch={jest.fn()} />);
    const input = screen.getByRole('searchbox') as HTMLInputElement;
    expect(input.value).toBe('hello');
  });

  it('calls onSearch with proper value after typing and clicking submit', () => {
    const onSearchMock = jest.fn();
    render(<SearchForm initialQuery="" onSearch={onSearchMock} />);

    const input = screen.getByRole('searchbox') as HTMLInputElement;
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'test query' } });
    fireEvent.click(button);

    expect(onSearchMock).toHaveBeenCalledWith('test query');
  });

  it('calls onSearch with proper value after typing and pressing Enter', () => {
    const onSearchMock = jest.fn();
    render(<SearchForm initialQuery="" onSearch={onSearchMock} />);
    const input = screen.getByRole('searchbox') as HTMLInputElement;
  
    fireEvent.change(input, { target: { value: 'another test' } });
  
    // Імітуємо submit форми через Enter
    fireEvent.submit(input.closest('form')!);
  
    expect(onSearchMock).toHaveBeenCalledWith('another test');
  });
});