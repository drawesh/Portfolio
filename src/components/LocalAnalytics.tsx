import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Eye, Calendar } from 'lucide-react';

interface LocalVisitData {
  date: string;
  visits: number;
}

export function LocalAnalytics() {
  const [visitData, setVisitData] = useState<LocalVisitData[]>([]);
  const [totalVisits, setTotalVisits] = useState(0);

  useEffect(() => {
    const loadLocalAnalytics = () => {
      try {
        const data: LocalVisitData[] = [];
        let total = 0;

        // Get last 7 days of data
        for (let i = 6; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const dateStr = date.toISOString().split('T')[0];
          const visitKey = `portfolio_visits_${dateStr}`;
          const visits = parseInt(localStorage.getItem(visitKey) || '0');
          
          data.push({ date: dateStr, visits });
          total += visits;
        }

        setVisitData(data);
        setTotalVisits(total);
      } catch (error) {
        // Silently fail if localStorage is not available
      }
    };

    loadLocalAnalytics();

    // Update every minute to reflect new visits
    const interval = setInterval(loadLocalAnalytics, 60000);
    return () => clearInterval(interval);
  }, []);

  const maxVisits = Math.max(...visitData.map(d => d.visits), 1);

  return (
    <div className="space-y-4">
      {/* Summary */}
      <Card className="p-4">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Eye className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-lg font-medium">{totalVisits}</p>
            <p className="text-sm text-muted-foreground">Visits (Last 7 days)</p>
          </div>
        </div>
      </Card>

      {/* Chart */}
      <Card className="p-4">
        <h4 className="mb-4 flex items-center space-x-2">
          <Calendar className="w-4 h-4" />
          <span>Daily Visits</span>
        </h4>
        <div className="h-32 flex items-end space-x-1">
          {visitData.map((day, index) => (
            <motion.div
              key={day.date}
              initial={{ height: 0 }}
              animate={{ height: `${Math.max(4, (day.visits / maxVisits) * 112)}px` }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-1 bg-primary/20 rounded-t-sm min-h-[4px] relative group"
            >
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {day.visits} visit{day.visits !== 1 ? 's' : ''}<br />
                {new Date(day.date).toLocaleDateString()}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>{visitData[0]?.date ? new Date(visitData[0].date).toLocaleDateString() : ''}</span>
          <span>Today</span>
        </div>
      </Card>
    </div>
  );
}