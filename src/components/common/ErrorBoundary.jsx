import React from 'react';
import Button from '../ui/Button';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null });
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            // Fallback UI
            return (
                <div className="flex flex-col items-center justify-center p-8 text-center bg-transparent border border-red-500/20 rounded-xl m-4">
                    <h2 className="text-xl font-bold text-red-500 mb-2">Something went wrong.</h2>
                    <p className="text-zinc-500 mb-4 text-sm max-w-md">
                        We couldn't load this content. It might be a temporary issue or a problem with your connection.
                    </p>
                    <Button
                        onClick={this.handleRetry}
                        variant="ghost"
                        size="sm"
                        className="border border-zinc-700 hover:bg-zinc-800"
                    >
                        Try again
                    </Button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
