import Sprint from '../models/Sprint.js';
import Task from '../models/Task.js';

// Obtener todos los sprints
export const getSprints = async (req, res) => {
  try {
    const sprints = await Sprint.find().populate('tareas');
    res.json(sprints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener sprint por ID
export const getSprintById = async (req, res) => {
  try {
    const sprint = await Sprint.findById(req.params.id).populate('tareas');
    if (!sprint) return res.status(404).json({ message: 'Sprint no encontrado' });
    res.json(sprint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear sprint
export const createSprint = async (req, res) => {
  const { nombre, fechaInicio, fechaCierre, tareas } = req.body;

  const newSprint = new Sprint({
    nombre,
    fechaInicio,
    fechaCierre,
    tareas
  });

  try {
    const sprint = await newSprint.save();
    res.status(201).json(sprint);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Asignar tareas a un sprint
export const addTasksToSprint = async (req, res) => {
  const { tareas } = req.body;

  try {
    const sprint = await Sprint.findById(req.params.id);
    if (!sprint) return res.status(404).json({ message: 'Sprint no encontrado' });

    const existingTasks = await Task.find({ _id: { $in: tareas } }).select('_id');
    const validTaskIds = existingTasks.map(t => t._id.toString());

    // Filtrar tareas que ya están en el sprint
    const newTasks = validTaskIds.filter(id => !sprint.tareas.includes(id));

    if (newTasks.length === 0) {
      return res.status(400).json({ message: 'Todas las tareas ya están asignadas o son inválidas' });
    }

    sprint.tareas.push(...newTasks);
    await sprint.save();

    res.json(sprint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Quitar tarea de sprint
export const removeTaskFromSprint = async (req, res) => {
  const { tareaId } = req.body;

  try {
    const sprint = await Sprint.findById(req.params.id);
    if (!sprint) return res.status(404).json({ message: 'Sprint no encontrado' });

    const index = sprint.tareas.findIndex(id => id.toString() === tareaId);
    if (index === -1) {
      return res.status(404).json({ message: 'Tarea no encontrada en el sprint' });
    }

    sprint.tareas.splice(index, 1); // quitar tarea
    await sprint.save();

    res.json({ message: 'Tarea removida', sprint });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar sprint
export const deleteSprint = async (req, res) => {
  try {
    const sprint = await Sprint.findByIdAndDelete(req.params.id);
    if (!sprint) return res.status(404).json({ message: 'Sprint no encontrado' });
    res.json({ message: 'Sprint eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
