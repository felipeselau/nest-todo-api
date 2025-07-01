import {
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
  IsUrl,
} from 'class-validator';

export class CreateTaskDto {
  @IsString() @MaxLength(120) title: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsBoolean() completed?: boolean;
  @IsOptional() @IsUrl() imageUrl?: string; // preenchido no controller
}
