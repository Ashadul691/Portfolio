import { Schema, models, model } from "mongoose";

export interface IMessage {
  _id?: string;
  name: string;
  email: string;
  message: string;
  read?: boolean;
  createdAt?: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default models.Message || model<IMessage>("Message", MessageSchema);
