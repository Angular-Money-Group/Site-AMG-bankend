import mongoose from "mongoose";

const emailModel = new mongoose.Schema({
  sender: {type: String},
  to: {type: String},
  subject: {type: String},
  attachments: {type: String},
  body: {type: String},
})

export const emailCollection = mongoose.model("templateEmail", emailModel);

export interface FormModel {
  name: string;
  email: string;
  phone: string;
  message: string;
  curriculum?: Buffer;
}

