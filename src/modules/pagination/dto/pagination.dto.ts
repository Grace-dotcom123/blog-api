import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class PaginationQueryParams {
    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseInt(value))
    take: number = 3;
  
    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseInt(value))
    page: number = 1;
  
    @IsOptional()
    @IsString()
    sortBy: string = "createAt";
  
    @IsOptional()
    @IsString()
    sortOrder: string = "desc";
}