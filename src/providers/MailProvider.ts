import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

interface IAddress {
  email: string;
  name: string;
}

export interface IMessage {
  to: IAddress;
  from: IAddress;
  subject: string;
  body: string;
}

export interface IMailProvider {
  sendMail(message: IMessage): Promise<void>;
}

export class MailProvider implements IMailProvider {
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

  async sendMail(message: IMessage): Promise<void> {
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
