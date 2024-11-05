import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import bcrypt from "bcrypt";

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;

  try {
    if (!authenticatedUserId) {
      throw createHttpError(401, "User not authenticated");
    }

    const user = await UserModel.findById(authenticatedUserId)
      .select("+email")
      .exec();

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// GET ALL USERS
export const getAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await UserModel.find().exec();

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// SIGNUP
interface SignUpBody {
  username?: string; // Le ? signifie que la propriété est facultative
  email?: string; // Etant donné que l'utilisateur peut ne pas fournir ces informations
  password?: string;
}

export const signUp: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const passwordRaw = req.body.password;

  try {
    if (!username || !email || !passwordRaw) {
      throw createHttpError(400, "Missing required fields");
    }

    const existingUser = await UserModel.findOne({ username: username }).exec();
    const existingEmail = await UserModel.findOne({ email: email }).exec();

    if (existingUser || existingEmail) {
      throw createHttpError(409, "Username or email already exists.");
    }

    const passwordHashed = await bcrypt.hash(passwordRaw, 16);

    const newUser = await UserModel.create({
      username: username,
      email: email,
      password: passwordHashed,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log(`New user created: ${newUser}`);

    req.session.userId = newUser._id;

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

// LOGIN
interface LoginBody {
  username?: string;
  password?: string;
}

export const login: RequestHandler<
  unknown,
  unknown,
  LoginBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    if (!username || !password) {
      throw createHttpError(400, "Missing required fields");
    }

    const user = await UserModel.findOne({ username: username })
      .select("+password +email")
      .exec();

    if (!user) {
      throw createHttpError(401, "Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw createHttpError(401, "Invalid credentials");
    }

    req.session.userId = user._id;

    console.log(`User logged in: ${user}`);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// LOGOUT
export const logout: RequestHandler = (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      next(error);
    }

    res.status(204).send();
  });
};

// GET USER BY ID
export const getUserById: RequestHandler<
  { id: string },
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await UserModel.findById(userId).exec();

    if (!user) {
      throw createHttpError(404, "User not found");
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
