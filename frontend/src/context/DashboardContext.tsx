import React, { createContext, useContext, useState, useEffect } from 'react';
import { Widget } from '@/types';
import { apiService } from '@/services/api';

interface DashboardContextType {
  widgets: Widget[];
  setWidgets: (widgets: Widget[]) => void;
  updateWidgetSettings: (id: string, settings: any) => void;
  reorderWidgets: (fromIndex: number, toIndex: number) => void;
  saveWidgets: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadWidgets();
  }, []);

  const loadWidgets = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getWidgets();
      setWidgets(response.widgets);
    } catch (err) {
      setError('Failed to load widgets');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateWidgetSettings = (id: string, settings: any) => {
    setWidgets(prevWidgets => 
      prevWidgets.map(widget => 
        widget.id === id ? { ...widget, settings: { ...widget.settings, ...settings } } : widget
      )
    );
  };

  const reorderWidgets = (fromIndex: number, toIndex: number) => {
    setWidgets(prevWidgets => {
      const newWidgets = [...prevWidgets];
      const [removed] = newWidgets.splice(fromIndex, 1);
      newWidgets.splice(toIndex, 0, removed);
      
      return newWidgets.map((widget, index) => ({
        ...widget,
        position: index
      }));
    });
  };

  const saveWidgets = async () => {
    try {
      setError(null);
      await apiService.updateWidgets(widgets);
    } catch (err) {
      setError('Failed to save widgets');
      console.error(err);
      throw err;
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        widgets,
        setWidgets,
        updateWidgetSettings,
        reorderWidgets,
        saveWidgets,
        loading,
        error,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return context;
};
