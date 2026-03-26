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

// FINAL FIXED getAnalytics - ObjectId Fix
export const getAnalytics = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.id;   // this is string
    const mongoose = require('mongoose');

    console.log("📌 User ID from JWT:", userId);

    // Convert to ObjectId for proper matching
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const total = await Task.countDocuments({ user: userObjectId });
    const completed = await Task.countDocuments({ user: userObjectId, status: 'Done' });
    const pending = total - completed;
    const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Debug: Check actual tasks
    const allUserTasks = await Task.find({ user: userObjectId }).select('title status priority').limit(5);
    console.log("📌 Total tasks found for user:", allUserTasks.length);
    if (allUserTasks.length > 0) {
      console.log("📌 Sample task user field:", allUserTasks[0].user);
    }

    // Aggregation with proper ObjectId
    const statusCountsRaw = await Task.aggregate([
      { $match: { user: userObjectId } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const priorityCountsRaw = await Task.aggregate([
      { $match: { user: userObjectId } },
      { $group: { _id: '$priority', count: { $sum: 1 } } }
    ]);

    console.log("🔍 Raw Status Counts:", statusCountsRaw);
    console.log("🔍 Raw Priority Counts:", priorityCountsRaw);

    // Force all categories
    const allStatuses = ['Todo', 'In Progress', 'Done'];
    const statusCounts = allStatuses.map(status => {
      const found = statusCountsRaw.find((s: any) => s._id === status);
      return { _id: status, count: found ? Number(found.count) : 0 };
    });

    const allPriorities = ['Low', 'Medium', 'High'];
    const priorityCounts = allPriorities.map(priority => {
      const found = priorityCountsRaw.find((p: any) => p._id === priority);
      return { _id: priority, count: found ? Number(found.count) : 0 };
    });

    console.log("✅ Final Status Counts sent to frontend:", statusCounts);
    console.log("✅ Final Priority Counts sent to frontend:", priorityCounts);

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
    console.error("Analytics Error:", error);
    next(error);
  }
};