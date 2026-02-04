import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { WidgetsController } from './widgets/widgets.controller';
import { WidgetsService } from './widgets/widgets.service';
import { StorageService } from './storage/storage.service';

@Module({
  imports: [],
  controllers: [AuthController, WidgetsController],
  providers: [AuthService, WidgetsService, StorageService],
})
export class AppModule {}
