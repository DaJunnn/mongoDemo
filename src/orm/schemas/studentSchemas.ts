import { Schema, model } from "mongoose";
import { Student } from "../../interfaces/Student";

const studentSchema = new Schema<Student>({
  _id: { type: Schema.Types.ObjectId, auto: true }, // 確保 _id 正確
  userName: { type: String, required: true },
  sid: { type: String },
  name: { type: String },
  department: { type: String },
  grade: { type: String },
  class: { type: String },
  Email: { type: String },
  absences: { type: Number, default: 0 },
});

export const studentsModel = model<Student>("students", studentSchema);
