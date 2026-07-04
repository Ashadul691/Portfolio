import { Schema, models, model } from "mongoose";

export interface IProject {
  _id?: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  image: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  challenges?: string;
  improvements?: string;
  featured?: boolean;
  order?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    summary: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    techStack: { type: [String], default: [] },
    liveUrl: { type: String },
    githubUrl: { type: String },
    challenges: { type: String },
    improvements: { type: String },
    featured: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.Project || model<IProject>("Project", ProjectSchema);
