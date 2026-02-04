export interface WidgetSettings {
  content?: string;
  fontSize?: number;
  color?: string;
  count?: number;
  step?: number;
  label?: string;
}

export interface Widget {
  id: string;
  type: 'text' | 'counter';
  position: number;
  settings: WidgetSettings;
}

export interface User {
  email: string;
  name: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

export interface WidgetsResponse {
  success: boolean;
  widgets: Widget[];
}
