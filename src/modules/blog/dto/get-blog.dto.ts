import { IsOptional, IsString } from "class-validator";
import { PaginationQueryParams } from "../../pagination/dto/pagination.dto.js";

export class GetBlogDTO extends PaginationQueryParams {
    @IsOptional()
    @IsString()
    search?: string;
}

