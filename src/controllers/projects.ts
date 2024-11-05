import { RequestHandler } from "express";
import createHttpError from "http-errors";
import ProjectModel from "../models/project";
import UserModel from "../models/user";
import TeamModel from "../models/team";

export const createProject: RequestHandler = async (req, res, next) => {
  const { name, description, teamId } = req.body;

  try {
    if (!name || !teamId) {
      throw createHttpError(400, "Missing required fields");
    }

    const team = await TeamModel.findById(teamId).exec();
    if (!team) {
      throw createHttpError(404, "Team not found");
    }

    const project = new ProjectModel({ name, description, teamId });
    const newProject = await project.save();

    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
};

export const getAllProjects: RequestHandler = async (req, res, next) => {
  try {
    const projects = await ProjectModel.find().exec();
    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};

export const getProjectById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const project = await ProjectModel.findById(id).exec();
    if (!project) {
      throw createHttpError(404, "Project not found");
    }
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

export const getProjectsByTeamId: RequestHandler = async (req, res, next) => {
  const { teamId } = req.params;

  try {
    const projects = await ProjectModel.find({ teamId }).exec();
    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};

export const getProjectsByUserId: RequestHandler = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await UserModel.findById(userId).exec();
    if (!user) {
      throw createHttpError(404, "User not found");
    }

    const teams = await TeamModel.find({ members: userId }).exec();
    const teamIds = teams.map((team) => team._id);

    const projects = await ProjectModel.find({
      teamId: { $in: teamIds },
    }).exec();
    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};
