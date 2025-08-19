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
      React.createElement('h1', null, this.state.value),
      React.createElement(
        'button',
        { onClick: this.decrement, style: { margin: '10px' } },
        '-'
      ),
      React.createElement(
        'button',
        { onClick: this.increment },
        '+'
      )
    );
  }
}

export default Counter;