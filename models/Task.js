import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true},
  estado: {
    type: String,
    enum: ['pendiente', 'en progreso', 'finalizada'],
    default: 'pendiente'
  },
  fechaLimite: { type: String, required: true }
}, { collection: 'backlog' });

export default mongoose.model('Task', taskSchema);