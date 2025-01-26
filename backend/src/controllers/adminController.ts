import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import prisma from "../db/prisma";
import { Validator } from "../middlewares/validator";

const JWT_SECRET = process.env.JWT_SECRET || null;
export const AdminLogin = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Invalid Request");
    }
    const user = await prisma.admin.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send("Invalid Credentials");
    }
    if (JWT_SECRET === null) {
      return res.status(500).send("Internal Server Error");
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

export const AdminSignup = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Invalid Request");
    }
    const data = {
      email,
      password,
      // name,
    };
    const validateData = Validator.validateAdmin(data);
    if (!validateData) {
      return res.status(400).send("Invalid Request");
    }
    const newUser = await prisma.admin.create({
      data: {
        email: email,
        password: await bcrypt.hash(password, 10),
        // name: name,
      },
    });
    if (!newUser) {
      return res.status(500).send("Internal Server Error");
    }
    res.status(201).send("User Created");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};
