import { AuthResponse, Widget, WidgetsResponse } from '@/types';

const API_BASE_URL = 'http://localhost:4000';

class ApiService {
  private getHeaders(includeAuth = false): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (includeAuth) {
      const token = localStorage.getItem('token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }

    return data;
  }

  async getWidgets(): Promise<WidgetsResponse> {
    const response = await fetch(`${API_BASE_URL}/widgets`, {
      method: 'GET',
      headers: this.getHeaders(true),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch widgets');
    }

    return response.json();
  }

  async updateWidgets(widgets: Widget[]): Promise<WidgetsResponse> {
    const response = await fetch(`${API_BASE_URL}/widgets`, {
      method: 'PUT',
      headers: this.getHeaders(true),
      body: JSON.stringify({ widgets }),
    });

    if (!response.ok) {
      throw new Error('Failed to update widgets');
    }

    return response.json();
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getUser(): any {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
}

export const apiService = new ApiService();
