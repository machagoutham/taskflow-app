import express from 'express';
import { protect } from '../middleware/auth';
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  getAnalytics,
} from '../controllers/task.controller';

const router = express.Router();

router.use(protect);

router.route('/').post(createTask).get(getTasks);
router.route('/analytics').get(getAnalytics);
router.route('/:id').get(getTask).put(updateTask).delete(deleteTask);

export default router;