import mongoose from "mongoose";

const sprintSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    fechaInicio: { type: String, required: true },
    fechaCierre: { type: String, required: true },
    tareas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  },
  { collection: "sprintList" }
);

export default mongoose.model("Sprint", sprintSchema);
