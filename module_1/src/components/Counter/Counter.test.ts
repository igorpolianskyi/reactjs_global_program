import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Counter from './Counter';

describe('Counter component', () => {
  it('renders initial value', () => {
    render(React.createElement(Counter, { initialValue: 5 }));
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('decrements on "-" click', () => {
    render(React.createElement(Counter, { initialValue: 5 }));
    fireEvent.click(screen.getByText('-'));
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('increments on "+" click', () => {
    render(React.createElement(Counter, { initialValue: 5 }));
    fireEvent.click(screen.getByText('+'));
    expect(screen.getByText('6')).toBeInTheDocument();
  });
});