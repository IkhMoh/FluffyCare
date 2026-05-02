import {
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateAnimalDto {
  @IsString()
  @MinLength(2)
  name!: string;

  @IsString()
  @IsIn(['Dog', 'Cat', 'Bird', 'Rabbit', 'Other'])
  species!: string;

  @IsOptional()
  @IsString()
  breed?: string;

  @IsInt()
  @Min(0)
  @Max(300)
  age!: number;

  @IsString()
  @IsIn(['Male', 'Female'])
  gender!: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(200)
  weight?: number;

  @IsString()
  @IsIn(['Available', 'Pending', 'Adopted'])
  status!: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsOptional()
  @IsString()
  healthNotes?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
