import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log("Catched error by ErrorBoundary", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="rounded-lg border border-red-600 bg-red-100 p-5 text-red-800">
          <h2 className="text-red-700">Something went wrong.</h2>
          <p>We're sorry for the inconvenience. Please try again later.</p>
          {this.state.error && (
            <details className="text-2xs mt-2.5 whitespace-pre-wrap">
              <summary>Error Details</summary>
              {this.state.error?.message}
              <br />
              {this.state.error?.stack}
            </details>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
