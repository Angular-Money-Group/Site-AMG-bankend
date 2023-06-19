import { Request, Response } from "express";
import EmailService from "../services/emailService";
import {
  successResponse,
} from "../utils/responses.utils";
import { FormModel } from "../models/email";

const emailService = new EmailService();

export class EmailController {
  constructor() {}

  public async sendEmail(req: Request, res: Response) {
    try {
      const { name, email, phone, message }: FormModel = req.body;
      const curriculum: Buffer = req.file!.buffer;

      await emailService.sendEmail({ name, email, phone, message }, curriculum)

      return successResponse(res, {})
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
