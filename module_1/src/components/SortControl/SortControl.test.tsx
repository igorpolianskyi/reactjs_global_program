import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SortControl from './SortControl';

describe('SortControl component', () => {
  const onSortChangeMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders label and select', () => {
    render(<SortControl value="RELEASE DATE" onSortChange={onSortChangeMock} />);
    
    expect(screen.getByText(/SORT BY/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders correct options', () => {
    render(<SortControl value="RELEASE DATE" onSortChange={onSortChangeMock} />);
    
    expect(screen.getByRole('option', { name: 'RELEASE DATE' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'TITLE' })).toBeInTheDocument();
  });

  it('shows the correct selected value', () => {
    render(<SortControl value="TITLE" onSortChange={onSortChangeMock} />);
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('TITLE');
  });

  it('calls onSortChange when selection changes', () => {
    render(<SortControl value="RELEASE DATE" onSortChange={onSortChangeMock} />);
    const select = screen.getByRole('combobox');
    
    fireEvent.change(select, { target: { value: 'TITLE' } });
    expect(onSortChangeMock).toHaveBeenCalledWith('TITLE');
  });
});