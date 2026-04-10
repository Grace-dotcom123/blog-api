import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createTransport, Transporter } from "nodemailer";
import fs from "fs/promises";
import handlebars from "handlebars";

export class MailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER, //mail
        pass: process.env.MAIL_PASS, //app password
      },
    });
  }

  sendMail = async ({
    to,
    subject,
    templateName,
    context,
  }: {
    to: string;
    subject: string;
    templateName: string;
    context: any;
  }) => {
    const _filename = fileURLToPath(import.meta.url)
    const _dirname = dirname(_filename);

    const templateDir = path.resolve(_dirname, "templates");
    const templatePath = path.join(templateDir, `${templateName}.hbs`);
    const templateSource = await fs.readFile(templatePath, "utf-8");
    const compiledTemplate = handlebars.compile(templateSource);

    await this.transporter.sendMail({
      to: to,
      subject: subject,
      html: "<h1>Welcome bro</h1>",
    });
  };
}
