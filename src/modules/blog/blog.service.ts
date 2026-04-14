import { PrismaClient } from "@prisma/client/extension";
import { CloudinaryService } from "../cloudinary/cloudinary.service.js";
import { createBlogDTO } from "./dto/create-blog.dto.js";
import { ApiError } from "../../utils/api-error.js";
import { generateSlug } from "../../utils/generate-slug.js";

export class BlogService {
  constructor(
    private prisma: PrismaClient,
    private cloudinaryService: CloudinaryService,
  ) {}
  createBlog = async (
    body: createBlogDTO,
    thumbnail: Express.Multer.File,
    userId: number,
  ) => {
    const blog = await this.prisma.blog.findUnique({
      data: {
        title: body.title,
      },
    });

    if (blog) throw new ApiError("title already use", 404);

    const slug = generateSlug(body.title);

    const { secure_url } = await this.cloudinaryService.upload(thumbnail);

    await this.prisma.blog.create({
      data: {
        ...body,
        slug: slug,
        thumbnail: secure_url,
        userId: userId,
      },
    });
  };
}
