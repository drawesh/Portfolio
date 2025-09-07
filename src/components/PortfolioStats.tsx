import { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { LocalAnalytics } from './LocalAnalytics';

export function PortfolioStats() {
  const [showStats, setShowStats] = useState(false);

  // Only show in development mode or if user explicitly enables it
  const isDev = process.env.NODE_ENV === 'development';
  if (!isDev && !showStats) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed bottom-4 left-4 z-40"
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowStats(true)}
          className="text-xs opacity-50 hover:opacity-100"
        >
          <Eye className="w-3 h-3 mr-1" />
          Stats
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed bottom-4 left-4 z-40 max-w-xs"
    >
      <Card className="p-3 bg-background/95 backdrop-blur-sm border shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <h5 className="text-sm font-medium">Portfolio Analytics</h5>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowStats(false)}
            className="h-6 w-6 p-0"
          >
            <EyeOff className="w-3 h-3" />
          </Button>
        </div>
        
        <LocalAnalytics />
        
        <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
          <p>Local analytics • Privacy-focused</p>
        </div>
      </Card>
    </motion.div>
  );
}