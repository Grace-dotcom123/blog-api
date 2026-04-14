import { Router } from "express";
import { ValidationMiddleware } from "../../middleware/validation.middleware.js";
import { createBlogDTO } from "./dto/create-blog.dto.js";
import { BlogController } from "./blog.controller.js";
import { AuthMiddleware } from "../../middleware/auth.middleware.js";
import { UploadMiddleware } from "../../middleware/upload.middleware.js";

export class BlogRouter {
  router: Router;

  constructor(
    private blogController: BlogController,
    private authMiddleware: AuthMiddleware,
    private uploadMiddleware: UploadMiddleware,
    private validationMiddleware: ValidationMiddleware,
  ) {
    this.router = Router();
    this.initRoutes();
  }

  private initRoutes = () => {
    this.router.post(
      "/",
      this.authMiddleware.verifyToken(process.env.JWT_SECRET!),
      this.authMiddleware.verifyRole(["USER"]),
      this.uploadMiddleware
        .upload()
        .fields([{ name: "thumbnail", maxCount: 1 }]),
      this.validationMiddleware.validateBody(createBlogDTO),
      this.blogController.createBlog,
    );
  };

  getRouter = () => {
    return this.router;
  };
}
