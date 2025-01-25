import { Request, Response } from "express";
import prisma from "../db/prisma";
import bcrypt from "bcryptjs";
import { Validator } from "../middlewares/validator";

// Fetch all clients
export const GetClients = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const clients = await prisma.clients.findMany();
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch clients' });
    }
};

// Create a new client
export const CreateClient = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const {
            email, password, shop_name, owner_name,
            address, phone, logo, googleAPI, plan_id
        } = req.body;

        if (!email || !password || !shop_name || !owner_name || !address || !phone || !plan_id) {
            return res.status(400).json({
                error: "Missing required fields",
                missingFields: [
                    !email && "email",
                    !password && "password",
                    !shop_name && "shop_name",
                    !owner_name && "owner_name",
                    !address && "address",
                    !phone && "phone",
                    !plan_id && "plan_id"
                ].filter(Boolean)
            });
        }
        const data = {
            email,
            password,
            shop_name,
            owner_name,
            address
        };
        const validateData = Validator.validateClient(data);
        if (!validateData) {
            return res.status(400).send("Invalid Request");
        }
        const plan = await prisma.plans.findUnique({
            where: {
                id: plan_id
            }
        })
        if (!plan) {
            return res.status(404).send("Subscription Plan not found")
        }
        const newClient = await prisma.clients.create({
            data: {
                email: email,
                password: await bcrypt.hash(password, 10),
                shop_name: shop_name,
                owner_name: owner_name,
                address: address,
                phone: phone,
                logo: logo,
                googleAPI: googleAPI,
                ClientPlan: {
                    create: {
                        plan_id: plan_id
                    }
                }
            },
        });
        res.status(201).send("Client Created");
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};

// Update a client
export const UpdateClient = async (req: Request, res: Response): Promise<Response | void> => {
    try {

        const {
            email, password, shop_name, owner_name,
            address, phone, logo, googleAPI, plan_id
        } = req.body;
        const { id } = req.params;

        if (!email || !password || !shop_name || !owner_name || !address || !phone || !plan_id) {
            return res.status(400).json({
                error: "Missing required fields",
                missingFields: [
                    !email && "email",
                    !password && "password",
                    !shop_name && "shop_name",
                    !owner_name && "owner_name",
                    !address && "address",
                    !phone && "phone",
                    !plan_id && "plan_id"
                ].filter(Boolean)
            });
        }
        const updatedClient = await prisma.clients.update({
            where: { id: id },
            data: {
                shop_name: shop_name,
                owner_name: owner_name
            },
        });
        res.status(200).send("Client Updated");
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};

// Delete a client
export const DeleteClient = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).send("Invalid Request");
        }
        await prisma.clients.delete({
            where: { id: id },
        });
        res.status(200).send("Client Deleted");
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};





export const SubPlans = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const plans = await prisma.plans.findMany();
        console.log(plans)
        res.status(200).json(plans);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}