import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Dialog } from './Dialog';

jest.mock('focus-trap-react', () => ({
  FocusTrap: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('Dialog component', () => {
  const title = 'Dialog Title';
  const bodyText = 'This is the body content';
  const onCloseMock = jest.fn();

  beforeEach(() => {
    const portalRoot = document.createElement('div');
    portalRoot.setAttribute('id', 'portal-root');
    document.body.appendChild(portalRoot);
  });

  afterEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  it('renders title', () => {
    render(<Dialog title={title} onClose={onCloseMock}>{bodyText}</Dialog>);
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(<Dialog title={title} onClose={onCloseMock}>{bodyText}</Dialog>);
    expect(screen.getByText(bodyText)).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<Dialog title={title} onClose={onCloseMock}>{bodyText}</Dialog>);
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
