import {
  Body,
  Controller,
  Get,
  Headers,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import { WidgetsService } from './widgets.service';
import { AuthService } from '../auth/auth.service';
import { UpdateWidgetsDto } from './dto/update-widgets.dto';

@Controller('widgets')
export class WidgetsController {
  constructor(
    private readonly widgetsService: WidgetsService,
    private readonly authService: AuthService,
  ) {}

  private getUserFromToken(authorization: string): string {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid token');
    }
    
    const token = authorization.substring(7);
    return this.authService.validateToken(token);
  }

  @Get()
  getWidgets(@Headers('authorization') authorization: string) {
    const userEmail = this.getUserFromToken(authorization);
    return this.widgetsService.getWidgets(userEmail);
  }

  @Put()
  updateWidgets(
    @Headers('authorization') authorization: string,
    @Body() updateWidgetsDto: UpdateWidgetsDto,
  ) {
    const userEmail = this.getUserFromToken(authorization);
    return this.widgetsService.updateWidgets(userEmail, updateWidgetsDto);
  }
}
