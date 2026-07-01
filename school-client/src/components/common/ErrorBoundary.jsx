import React from "react";
import errorImg from "../../assets/Error.png"

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorCard />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

const ErrorCard = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md text-center border border-red-400">
        <img src={errorImg} alt="" />
        <h1 className="text-xl font-semibold text-red-500">Something went wrong</h1>
        <p className="text-gray-600 mt-2">Please refresh the page or try again later.</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
};

