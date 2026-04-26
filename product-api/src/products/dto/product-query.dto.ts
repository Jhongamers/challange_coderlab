import { IsOptional, IsString, Min } from "class-validator";

export class PorductQueryDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString() 
  @IsOptional()
  page?: string;

  @IsString()
  @IsOptional()
  limit?: string;
}