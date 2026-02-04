import React, { useState, useEffect } from 'react';
import { Widget } from '@/types';
import { useDashboard } from '@/context/DashboardContext';
import { TextWidget } from '../widgets/TextWidget';
import { CounterWidget } from '../widgets/CounterWidget';
import { SettingsPanel } from '../SettingsPanel/SettingsPanel';
import styles from './Dashboard.module.css';

export const Dashboard: React.FC = () => {
  const { widgets, reorderWidgets, saveWidgets, loading, error } = useDashboard();
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [selectedWidget, setSelectedWidget] = useState<Widget | null>(null);
  const [saving, setSaving] = useState(false);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === index) return;

    reorderWidgets(draggedIndex, index);
    setDraggedIndex(index);
  };

  const handleDragEnd = async () => {
    setDraggedIndex(null);
    
    try {
      setSaving(true);
      await saveWidgets();
    } catch (err) {
      console.error('Failed to save widget order');
    } finally {
      setSaving(false);
    }
  };

  const handleSettingsClick = (widget: Widget) => {
    setSelectedWidget(widget);
  };

  const handleCloseSettings = async () => {
    setSelectedWidget(null);
    
    try {
      setSaving(true);
      await saveWidgets();
    } catch (err) {
      console.error('Failed to save widget settings');
    } finally {
      setSaving(false);
    }
  };

  const renderWidget = (widget: Widget, index: number) => {
    const isDragging = draggedIndex === index;

    const widgetElement = widget.type === 'text' ? (
      <TextWidget widget={widget} onSettingsClick={() => handleSettingsClick(widget)} />
    ) : widget.type === 'counter' ? (
      <CounterWidget widget={widget} onSettingsClick={() => handleSettingsClick(widget)} />
    ) : null;

    return (
      <div
        key={widget.id}
        className={`${styles.widgetWrapper} ${isDragging ? styles.dragging : ''}`}
        draggable
        onDragStart={() => handleDragStart(index)}
        onDragOver={(e) => handleDragOver(e, index)}
        onDragEnd={handleDragEnd}
      >
        <div className={styles.dragHandle}>⋮⋮</div>
        {widgetElement}
      </div>
    );
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading widgets...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Widget Dashboard</h1>
        {saving && <span className={styles.savingIndicator}>Saving...</span>}
      </div>

      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}

      <div className={styles.widgets}>
        {widgets.map((widget, index) => renderWidget(widget, index))}
      </div>

      <div className={styles.info}>
        <p>Drag widgets to reorder • Click ⚙️ to configure settings</p>
      </div>

      {selectedWidget && (
        <SettingsPanel widget={selectedWidget} onClose={handleCloseSettings} />
      )}
    </div>
  );
};
