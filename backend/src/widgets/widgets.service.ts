import { Injectable, NotFoundException } from '@nestjs/common';
import { StorageService } from '../storage/storage.service';
import { UpdateWidgetsDto } from './dto/update-widgets.dto';

@Injectable()
export class WidgetsService {
  constructor(private readonly storageService: StorageService) {}

  getWidgets(userEmail: string) {
    const allWidgets = this.storageService.readWidgets();
    
    if (!allWidgets[userEmail]) {
      // Initialize default widgets for new user
      allWidgets[userEmail] = [
        {
          id: `widget-${Date.now()}-1`,
          type: 'text',
          position: 0,
          settings: {
            content: 'Welcome to your Dashboard',
            fontSize: 16,
            color: '#333333'
          }
        },
        {
          id: `widget-${Date.now()}-2`,
          type: 'counter',
          position: 1,
          settings: {
            count: 0,
            step: 1,
            label: 'Counter Widget'
          }
        }
      ];
      this.storageService.writeWidgets(allWidgets);
    }

    return {
      success: true,
      widgets: allWidgets[userEmail]
    };
  }

  updateWidgets(userEmail: string, updateWidgetsDto: UpdateWidgetsDto) {
    const allWidgets = this.storageService.readWidgets();
    
    // Validate and sort widgets by position
    const sortedWidgets = updateWidgetsDto.widgets
      .sort((a, b) => a.position - b.position)
      .map((widget, index) => ({
        ...widget,
        position: index
      }));

    allWidgets[userEmail] = sortedWidgets;
    this.storageService.writeWidgets(allWidgets);

    return {
      success: true,
      widgets: sortedWidgets
    };
  }
}
