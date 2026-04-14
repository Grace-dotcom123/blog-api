import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class createBlogDTO {
    @IsNotEmpty()
    @IsString()
    title!: string;

    @IsNotEmpty()
    @IsString()
    description!: string;

    @IsNotEmpty()
    @IsString()
    content!: string;

    @IsNotEmpty()
    @IsString()
    category!: string;
}

