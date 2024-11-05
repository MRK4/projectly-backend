import { RequestHandler } from "express";
import createHttpError from "http-errors";
import TeamModel from "../models/team";
import UserModel from "../models/user";

export const getTeams: RequestHandler = async (req, res, next) => {
  try {
    const teams = await TeamModel.find().exec();

    res.status(200).json(teams);
  } catch (error) {
    next(error);
  }
};

export const createTeam: RequestHandler = async (req, res, next) => {
  const name = req.body.name;
  const userId = req.body.userId; // Assuming userId is passed in the request body

  try {
    if (!name) {
      throw createHttpError(400, "Missing required fields");
    }

    const members = [];
    if (userId) {
      const user = await UserModel.findById(userId).exec();
      if (!user) {
        throw createHttpError(404, "User not found");
      }
      members.push(userId);
    }

    const team = new TeamModel({ name, members });
    const newTeam = await team.save();

    console.log(newTeam);

    res.status(201).json(newTeam);
  } catch (error) {
    next(error);
  }
};

export const getTeam: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  const id = req.params.id;

  try {
    const team = await TeamModel.findById(id).populate("members").exec();

    if (!team) {
      throw createHttpError(404, "Team not found");
    }

    res.status(200).json(team);
  } catch (error) {
    next(error);
  }
};

export const updateTeam: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  const id = req.params.id;
  const updateFields = req.body;

  try {
    if (Object.keys(updateFields).length === 0) {
      throw createHttpError(400, "No fields to update provided");
    }

    if (Array.isArray(updateFields.members)) {
      updateFields.members = [...new Set(updateFields.members)];
    }

    const team = await TeamModel.findByIdAndUpdate(id, updateFields, {
      new: true,
    }).exec();

    if (!team) {
      throw createHttpError(404, "Team not found");
    }

    res.status(200).json(team);
  } catch (error) {
    next(error);
  }
};

export const deleteTeam: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  const id = req.params.id;

  try {
    const team = await TeamModel.findByIdAndDelete(id).exec();

    if (!team) {
      throw createHttpError(404, "Team not found");
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export const getTeamsByUserId: RequestHandler<{ userId: string }> = async (
  req,
  res,
  next
) => {
  const userId = req.params.userId;

  try {
    const teams = await TeamModel.find({ members: userId }).exec();

    if (!teams) {
      throw createHttpError(404, "No teams found for this user");
    }

    res.status(200).json(teams);
  } catch (error) {
    next(error);
  }
};
