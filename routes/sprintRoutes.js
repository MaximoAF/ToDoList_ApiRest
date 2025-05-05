import express from 'express';
import {
  getSprints,
  getSprintById,
  createSprint,
  addTasksToSprint,
  deleteSprint,
  removeTaskFromSprint
} from '../controllers/sprintController.js';

const router = express.Router();

router.get('/', getSprints);
router.get('/:id', getSprintById);
router.post('/', createSprint);
router.put('/:id/add-tasks', addTasksToSprint);
router.put('/:id/remove-tasks', removeTaskFromSprint);
router.delete('/:id', deleteSprint);

export default router;
