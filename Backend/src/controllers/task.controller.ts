import { Request, Response, NextFunction } from 'express';
import Task from '../models/Task';
import { z } from 'zod';
import { AppError } from '../utils/errorHandler';

const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  status: z.enum(['Todo', 'In Progress', 'Done']).default('Todo'),
  priority: z.enum(['Low', 'Medium', 'High']).default('Medium'),
  dueDate: z.string().datetime().optional().nullable(),
});

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validated = taskSchema.parse(req.body);
    const task = await Task.create({ ...validated, user: req.user.id });
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status, priority, search, page = 1, limit = 10, sort = '-createdAt' } = req.query;

    const query: any = { user: req.user.id };

    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (search) query.title = { $regex: search, $options: 'i' };

    const tasks = await Task.find(query)
      .sort(sort as string)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await Task.countDocuments(query);

    res.json({
      success: true,
      data: tasks,
      pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / Number(limit)) },
    });
  } catch (error) {
    next(error);
  }
};

export const getTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task) throw new AppError('Task not found', 404);
    res.json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validated = taskSchema.partial().parse(req.body);
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      validated,
      { new: true }
    );
    if (!task) throw new AppError('Task not found', 404);
    res.json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!task) throw new AppError('Task not found', 404);
    res.json({ success: true, message: 'Task deleted' });
  } catch (error) {
    next(error);
  }
};

// Analytics
export const getAnalytics = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const total = await Task.countDocuments({ user: req.user.id });
    const completed = await Task.countDocuments({ user: req.user.id, status: 'Done' });
    const pending = total - completed;
    const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    // For charts: count by status
    const statusCounts = await Task.aggregate([
      { $match: { user: req.user.id } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    // Count by priority
    const priorityCounts = await Task.aggregate([
      { $match: { user: req.user.id } },
      { $group: { _id: '$priority', count: { $sum: 1 } } }
    ]);

    res.json({
      success: true,
      data: {
        total,
        completed,
        pending,
        completionPercentage,
        statusCounts,
        priorityCounts,
      },
    });
  } catch (error) {
    next(error);
  }
};