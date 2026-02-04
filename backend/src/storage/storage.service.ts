import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class StorageService {
  private readonly dataPath = path.join(process.cwd(), 'data');
  private readonly usersFile = path.join(this.dataPath, 'users.json');
  private readonly widgetsFile = path.join(this.dataPath, 'widgets.json');

  constructor() {
    this.initStorage();
  }

  private initStorage() {
    if (!fs.existsSync(this.dataPath)) {
      fs.mkdirSync(this.dataPath, { recursive: true });
    }

    if (!fs.existsSync(this.usersFile)) {
      fs.writeFileSync(this.usersFile, JSON.stringify({}));
    }

    if (!fs.existsSync(this.widgetsFile)) {
      const defaultWidgets = {
        'demo@user.com': [
          {
            id: 'widget-1',
            type: 'text',
            position: 0,
            settings: {
              content: 'Welcome to Widget Dashboard',
              fontSize: 16,
              color: '#333333'
            }
          },
          {
            id: 'widget-2',
            type: 'counter',
            position: 1,
            settings: {
              count: 0,
              step: 1,
              label: 'Click Counter'
            }
          }
        ]
      };
      fs.writeFileSync(this.widgetsFile, JSON.stringify(defaultWidgets, null, 2));
    }
  }

  readUsers(): any {
    const data = fs.readFileSync(this.usersFile, 'utf-8');
    return JSON.parse(data);
  }

  writeUsers(data: any): void {
    fs.writeFileSync(this.usersFile, JSON.stringify(data, null, 2));
  }

  readWidgets(): any {
    const data = fs.readFileSync(this.widgetsFile, 'utf-8');
    return JSON.parse(data);
  }

  writeWidgets(data: any): void {
    fs.writeFileSync(this.widgetsFile, JSON.stringify(data, null, 2));
  }
}
