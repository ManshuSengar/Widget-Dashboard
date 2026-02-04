import { IsArray, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class WidgetSettingsDto {
  @IsOptional()
  content?: string;

  @IsOptional()
  @IsNumber()
  fontSize?: number;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsNumber()
  count?: number;

  @IsOptional()
  @IsNumber()
  step?: number;

  @IsOptional()
  @IsString()
  label?: string;
}

export class WidgetDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNumber()
  position: number;

  @IsObject()
  settings: WidgetSettingsDto;
}

export class UpdateWidgetsDto {
  @IsArray()
  @IsNotEmpty()
  widgets: WidgetDto[];
}
