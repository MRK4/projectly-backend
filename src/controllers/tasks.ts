import { RequestHandler } from "express";
import createHttpError from "http-errors";
import TaskModel from "../models/task";
import ProjectModel from "../models/project";
import UserModel from "../models/user";

export const createTask: RequestHandler = async (req, res, next) => {
  const {
    title,
    description,
    status,
    priority,
    assignedTo,
    projectId,
    dueDate,
  } = req.body;

  try {
    if (!title || !projectId) {
      throw createHttpError(400, "Missing required fields");
    }

    const project = await ProjectModel.findById(projectId).exec();
    if (!project) {
      throw createHttpError(404, "Project not found");
    }

    const task = new TaskModel({
      title,
      description,
      status,
      priority,
      assignedTo,
      projectId,
      dueDate,
    });
    const newTask = await task.save();

    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

export const getTaskById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const task = await TaskModel.findById(id).exec();
    if (!task) {
      throw createHttpError(404, "Task not found");
    }
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

export const getTasksByProjectId: RequestHandler = async (req, res, next) => {
  const { projectId } = req.params;

  try {
    const tasks = await TaskModel.find({ projectId }).exec();
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

export const updateTask: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const updateFields = req.body;

  try {
    const task = await TaskModel.findByIdAndUpdate(id, updateFields, {
      new: true,
    }).exec();
    if (!task) {
      throw createHttpError(404, "Task not found");
    }
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

export const deleteTask: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const task = await TaskModel.findByIdAndDelete(id).exec();
    if (!task) {
      throw createHttpError(404, "Task not found");
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
