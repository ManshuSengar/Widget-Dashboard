import React from 'react';
import { Widget } from '@/types';
import { useDashboard } from '@/context/DashboardContext';
import styles from './CounterWidget.module.css';

interface CounterWidgetProps {
  widget: Widget;
  onSettingsClick: () => void;
}

export const CounterWidget: React.FC<CounterWidgetProps> = ({ widget, onSettingsClick }) => {
  const { updateWidgetSettings } = useDashboard();
  
  const count = typeof widget.settings.count === 'number' && !isNaN(widget.settings.count) 
    ? widget.settings.count 
    : 0;
  
  const step = typeof widget.settings.step === 'number' && !isNaN(widget.settings.step) && widget.settings.step > 0
    ? widget.settings.step 
    : 1;
  
  const label = widget.settings.label || 'Counter';

  const handleIncrement = () => {
    const newCount = count + step;
    updateWidgetSettings(widget.id, { count: newCount });
  };

  const handleDecrement = () => {
    const newCount = count - step;
    updateWidgetSettings(widget.id, { count: newCount });
  };

  const handleReset = () => {
    updateWidgetSettings(widget.id, { count: 0 });
  };

  return (
    <div className={styles.counterWidget}>
      <div className={styles.header}>
        <h3 className={styles.title}>{label}</h3>
        <button className={styles.settingsBtn} onClick={onSettingsClick}>
          ⚙️
        </button>
      </div>
      <div className={styles.content}>
        <div className={styles.display}>
          <span className={styles.count}>{count}</span>
        </div>
        <div className={styles.controls}>
          <button className={styles.controlBtn} onClick={handleDecrement}>
            -
          </button>
          <button className={styles.resetBtn} onClick={handleReset}>
            Reset
          </button>
          <button className={styles.controlBtn} onClick={handleIncrement}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};