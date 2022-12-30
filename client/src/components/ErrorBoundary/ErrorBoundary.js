import React from 'react';

class ErrorBoundary extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null,
    };
  }

  componentDidCatch(error) {
    this.setState({
      ...this.state,
      error,
    });
  }

  render() {
    if (this.state.error) {
      return <div>Sorry, something went wrong!</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
