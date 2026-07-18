import React from 'react';
import { AlertCircle } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Admin UI Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-full min-h-[400px] flex-col items-center justify-center p-6 text-center">
          <div className="rounded-full bg-destructive/20 p-4 mb-4">
            <AlertCircle className="h-10 w-10 text-destructive" />
          </div>
          <h2 className="text-2xl font-bold text-brand-text mb-2">Something went wrong</h2>
          <p className="text-brand-gray mb-6 max-w-md">
            An unexpected error occurred in this module. The engineering team has been notified.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-md bg-brand-gold px-4 py-2 text-sm font-semibold text-brand-dark hover:bg-brand-teal transition-colors"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
