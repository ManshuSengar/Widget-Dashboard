import React from 'react';
import { Widget } from '@/types';
import styles from './TextWidget.module.css';

interface TextWidgetProps {
  widget: Widget;
  onSettingsClick: () => void;
}

export const TextWidget: React.FC<TextWidgetProps> = ({ widget, onSettingsClick }) => {
  const content = widget.settings.content || 'Text Widget';
  const fontSize = typeof widget.settings.fontSize === 'number' && !isNaN(widget.settings.fontSize)
    ? widget.settings.fontSize
    : 16;
  const color = widget.settings.color || '#333333';

  return (
    <div className={styles.textWidget}>
      <div className={styles.header}>
        <h3 className={styles.title}>Text Widget</h3>
        <button className={styles.settingsBtn} onClick={onSettingsClick}>
          ⚙️
        </button>
      </div>
      <div className={styles.content}>
        <p style={{ fontSize: `${fontSize}px`, color: color }}>
          {content}
        </p>
      </div>
    </div>
  );
};