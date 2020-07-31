import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { MailProvider, Message } from "./MailProvider";
import env from "../config/env";

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = env;

export class NodemailerMailProvider implements MailProvider {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });
  }

  async sendMail(message: Message): Promise<void> {
    await this.transporter.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email,
      },
      from: {
        name: message.from.name,
        address: message.from.email,
      },
      subject: message.subject,
      html: message.body,
    });
  }
}
