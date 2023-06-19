import dotenv from "dotenv";
import nodemailer, { SendMailOptions, Transporter } from "nodemailer";
import { FormModel } from "../models/email";
import { Logger } from "./logger.service";

dotenv.config();

export class EmailService {
  private transporter?: Transporter;
  public userInformation: string = "";

  constructor() {}

  async sendEmail(emailPayload: FormModel, curriculum: Buffer) {
    try {
      this.transporter = nodemailer.createTransport({
        host: process.env.HOST_EMAIL,
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_EMAIL,
          pass: process.env.PASSWORD_EMAIL,
        },
      });

      const options: SendMailOptions = {
        from: process.env.EMAIL_EMAIL,
        to: process.env.EMAIL_PABLO,
        subject: "Curriculo Recebido",
        attachments: [
          {
            filename: "curriculum.pdf",
            content: curriculum,
          },
        ],
        html: `<p>Curriculo recebido de <b>${emailPayload.name}</b></p>

        <ul>
        <li>Email: <b>${emailPayload.email}</b></li>
        <li>Telefone: <b>${emailPayload.phone}</b></li>
        </ul>
        <p>Mensagem:</p>
        <blockquote cite=''><p>${emailPayload.message}</p></blockquote>    
        
        <p>Curriculo em anexo.</p>
        `,
      };

      Logger.infoLog("Enviando email");
      return this.transporter
        .sendMail(options)
        .then(() => {
          Logger.infoLog("Email enviado");
        })
        .catch((err) => {
          Logger.errorLog("Email não enviado: " + err);
          throw err;
        });
    } catch (error) {
      Logger.fatalLog("Email não enviado: " + error);
    }
  }
}

export default EmailService;
