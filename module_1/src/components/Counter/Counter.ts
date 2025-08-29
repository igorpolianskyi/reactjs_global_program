import React from 'react';

interface CounterProps {
  initialValue?: number;
}

interface CounterState {
  value: number;
}

class Counter extends React.Component<CounterProps, CounterState> {
  constructor(props: CounterProps) {
    super(props);
    this.state = {
      value: props.initialValue ?? 0
    };
  }

  increment = (): void => {
    this.setState((prevState) => ({
      value: prevState.value + 1
    }));
  };

  decrement = (): void => {
    this.setState((prevState) => ({
      value: prevState.value - 1
    }));
  };

  render(): React.ReactNode {
  return React.createElement(
    'div',
    { style: { textAlign: 'center' } },
    React.createElement(
      'div',
      { style: { color: '#ff0000' }, 'data-testid': 'counter-value' },
      this.state.value
    ),
    React.createElement(
      'button',
      { onClick: this.decrement, style: { margin: '10px' }, 'data-testid': 'decrement-btn' },
      '-'
    ),
    React.createElement(
      'button',
      { onClick: this.increment, 'data-testid': 'increment-btn' },
      '+'
    )
  );
}
}

export default Counter;