import upload from '../utils/upload';
import { EmailController } from '../controller/emailController';
import { Router } from "express";

export class EmailRouter {

    public emailRouter: Router = Router()

    constructor(private emailController: EmailController){
        this.emailRouter.post('/', upload.single('curriculum'),this.emailController.sendEmail)

    }

}