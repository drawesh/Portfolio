import { Component, ReactNode } from 'react';
import { motion } from 'motion/react';
import { RefreshCw, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="min-h-screen flex items-center justify-center p-4"
        >
          <Card className="p-8 max-w-md w-full text-center">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex justify-center mb-4"
            >
              <AlertTriangle className="w-12 h-12 text-yellow-500" />
            </motion.div>
            
            <h2 className="text-xl font-semibold mb-4">Oops! Something went wrong</h2>
            
            <p className="text-muted-foreground mb-6">
              We encountered an unexpected error. Don't worry, this is likely temporary.
            </p>
            
            <div className="space-y-3">
              <Button 
                onClick={() => window.location.reload()} 
                className="w-full"
                variant="default"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reload Page
              </Button>
              
              <Button 
                onClick={() => this.setState({ hasError: false })} 
                className="w-full"
                variant="outline"
              >
                Try Again
              </Button>
            </div>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-muted-foreground">
                  Error Details (Development Only)
                </summary>
                <pre className="mt-2 p-3 bg-muted rounded text-xs overflow-auto max-h-32">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </Card>
        </motion.div>
      );
    }

    return this.props.children;
  }
}