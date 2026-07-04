import { Schema, models, model } from "mongoose";

export interface ISkill {
  _id?: string;
  name: string;
  category: "Frontend" | "Backend" | "Database" | "Tools" | "Other";
  level: number; // 0 - 100
  order?: number;
}

const SkillSchema = new Schema<ISkill>(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ["Frontend", "Backend", "Database", "Tools", "Other"],
      required: true,
    },
    level: { type: Number, required: true, min: 0, max: 100 },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.Skill || model<ISkill>("Skill", SkillSchema);
