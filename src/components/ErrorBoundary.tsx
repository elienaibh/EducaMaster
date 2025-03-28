import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-4 space-y-4 rounded-lg bg-red-50 dark:bg-red-900/10">
          <h2 className="text-xl font-semibold text-red-700 dark:text-red-400">
            Ops! Algo deu errado
          </h2>
          <p className="text-red-600 dark:text-red-300">
            Não se preocupe, estamos trabalhando nisso.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Tentar novamente
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}