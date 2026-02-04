import React, { useState, useEffect } from 'react';
import { Widget } from '@/types';
import { useDashboard } from '@/context/DashboardContext';
import styles from './SettingsPanel.module.css';

interface SettingsPanelProps {
  widget: Widget | null;
  onClose: () => void;
}

interface LocalSettings {
  content?: string;
  fontSize?: number | '';
  color?: string;
  count?: number | '';
  step?: number | '';
  label?: string;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ widget, onClose }) => {
  const { updateWidgetSettings } = useDashboard();
  const [localSettings, setLocalSettings] = useState<LocalSettings>(widget?.settings || {});

  useEffect(() => {
    if (widget) {
      setLocalSettings(widget.settings);
    }
  }, [widget]);

  if (!widget) return null;

  const handleChange = (key: string, value: any) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleNumberChange = (key: string, value: string) => {
    if (value === '') {
      setLocalSettings(prev => ({ ...prev, [key]: '' }));
      return;
    }
    
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue)) {
      setLocalSettings(prev => ({ ...prev, [key]: numValue }));
    }
  };

  const handleSave = () => {
    const sanitizedSettings: any = { ...localSettings };
    
    if (widget.type === 'counter') {
      const count = localSettings.count;
      sanitizedSettings.count = count === '' || count === undefined
        ? 0
        : typeof count === 'number' && !isNaN(count) 
          ? count 
          : 0;
      
      const step = localSettings.step;
      sanitizedSettings.step = step === '' || step === undefined
        ? 1
        : typeof step === 'number' && !isNaN(step) && step > 0
          ? step 
          : 1;
    }
    
    if (widget.type === 'text') {
      const fontSize = localSettings.fontSize;
      sanitizedSettings.fontSize = fontSize === '' || fontSize === undefined
        ? 16
        : typeof fontSize === 'number' && !isNaN(fontSize)
          ? fontSize
          : 16;
    }
    
    updateWidgetSettings(widget.id, sanitizedSettings);
    onClose();
  };

  const renderSettings = () => {
    if (widget.type === 'text') {
      return (
        <>
          <div className={styles.field}>
            <label className={styles.label}>Content</label>
            <textarea
              className={styles.textarea}
              value={localSettings.content || ''}
              onChange={(e) => handleChange('content', e.target.value)}
              rows={4}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Font Size</label>
            <input
              type="number"
              className={styles.input}
              value={localSettings.fontSize === '' ? '' : (localSettings.fontSize || 16)}
              onChange={(e) => handleNumberChange('fontSize', e.target.value)}
              min="10"
              max="48"
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Text Color</label>
            <input
              type="color"
              className={styles.colorInput}
              value={localSettings.color || '#333333'}
              onChange={(e) => handleChange('color', e.target.value)}
            />
          </div>
        </>
      );
    }

    if (widget.type === 'counter') {
      return (
        <>
          <div className={styles.field}>
            <label className={styles.label}>Label</label>
            <input
              type="text"
              className={styles.input}
              value={localSettings.label || ''}
              onChange={(e) => handleChange('label', e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Step (increment/decrement by)</label>
            <input
              type="number"
              className={styles.input}
              value={localSettings.step === '' ? '' : (localSettings.step || 1)}
              onChange={(e) => handleNumberChange('step', e.target.value)}
              min="1"
              max="100"
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Current Count</label>
            <input
              type="number"
              className={styles.input}
              value={localSettings.count === '' ? '' : (localSettings.count || 0)}
              onChange={(e) => handleNumberChange('count', e.target.value)}
            />
          </div>
        </>
      );
    }

    return null;
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.panel}>
        <div className={styles.header}>
          <h2 className={styles.title}>Widget Settings</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            ×
          </button>
        </div>
        <div className={styles.body}>
          {renderSettings()}
        </div>
        <div className={styles.footer}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.saveBtn} onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
};