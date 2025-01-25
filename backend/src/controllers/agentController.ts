import { Request, Response } from "express";
import prisma from "../db/prisma";
import { Validator } from "../middlewares/validator";
export const CreateAgent = async (req: Request, res: Response) => {
  try {
    const { name, email, password, address, phone, type_of_employment, profile } = req.body;
    if (!name || !email || !password || !address || !phone || !type_of_employment) {
      return res.status(400).send("Invalid Request");
    }
    const agentExists = await prisma.agent.findUnique({ where: { email } });
    if (agentExists) {
      return res.status(400).send("Agent already exists");
    }
    const data = {
      name,
      email,
      password,
      address,
      profile,
      phone,
      type_of_employment,
    };
    const validateData = Validator.validateAgent(data);
    if (!validateData) {
      return res.status(400).send("Invalid Request");
    }
    const agent = await prisma.agent.create({
      data: {
        name,
        email,
        password,
        address,
        phone,
        profile,
        type_of_employment,
      },
    });
    res.status(201).json(agent);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

export const DeleteAgent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send("Invalid Request");
    }
    
    const agent = await prisma.agent.delete({
      where: {
        id: id,
      },
    });
    if (!agent) {
      return res.status(404).send("Agent not found");
    }
    res.status(200).json(agent);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};


export const UpdateAgent = async (req: Request, res: Response) =>{
  try {
    const {id} = req.params;
    const { name, email, password, address, phone, type_of_employment, profile } = req.body;
    if (!name || !email || !password || !address || !phone || !type_of_employment) {
      return res.status(400).send("Invalid Request");
    }
    console.log(name)
    if(!id){
      return res.status(400).send("Invalid Request")
    }
    const data = {
      name,
      email,
      password,
      address,
      profile,
      phone,
      type_of_employment,
    };
    const validateData = Validator.validateAgent(data);
    if (!validateData) {
      return res.status(400).send("Invalid Request");
    }
    const updateAgent = await prisma.agent.update({
      where: {
        id: id
      },
      data: {
        name,
        email,
        password,
        address,
        phone,
        profile,
        type_of_employment,
      },
    })
    res.status(200).json({msg: "Updated Successfully", ...updateAgent})
  } catch (error) {
   console.log(error)
   res.status(500).send("Internal Server Error") 
  }
}



export const ShowAgents = async (req: Request, res: Response) => {
  try {
    const agents = await prisma.agent.findMany();
    if (!agents) {
      return res.status(404).send("Agents not found");
    }
    res.status(200).json(agents);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
