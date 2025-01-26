import { Request, Response } from "express";
import prisma from "../db/prisma";
import bcrypt from "bcryptjs";
import { Validator } from "../middlewares/validator";
import { CloudinaryUpload } from "../utils/cloudinary";

// Fetch all clients
export const GetClients = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const clients = await prisma.clients.findMany();
        const clientPlan = await prisma.clientPlans.findMany()
        const enrichedClients = clients.map((client:any) => {
            const activePlan = clientPlan.filter((cp: any) => client.id === cp.client_id && cp.isActive)
            return {
                ...client,
                activePlan: activePlan
            }
        })
        res.status(200).json(enrichedClients);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch clients' });
    }
};

// Create a new client
export const CreateClient = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const {
            email, password, shop_name, owner_name,
            address, phone, googleAPI, plan_id
        } = req.body;
        const imgPath = req.file?.originalname;



        let logo = await CloudinaryUpload(imgPath as string)
        if (!logo) {
            console.log("Failed to upload image")
            logo = "Error string"
        }


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
            address,
            phone
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
                shop_name: shop_name,
                owner_name: owner_name,
                address: address,
                phone: phone,
                email: email,
                logo: logo,
                googleAPI: googleAPI,
                password: await bcrypt.hash(password, 10),
            },
        });
        if (!newClient) {
            return res.status(500).send("Internal Server error, Failed to create client");
        }
        await prisma.clientPlans.create({
            data: {
                client_id: newClient.id,
                plan_id: plan_id,
                isActive: true
            }
        })
        res.status(201).send("Client Created");
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error");
    }
};

// Update a client
export const UpdateClient = async (req: Request, res: Response): Promise<Response | void> => {
    try {

        const {
            email, password, shop_name, owner_name,
            address, phone, googleAPI, plan_id
        } = req.body;
        const { id } = req.params;

        const imgPath = req.file?.originalname;
        let logo = await CloudinaryUpload(imgPath as string);

        if (logo) {
            console.log("Error in updating logo")
            logo = 'Error'
        }

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
        const plan = await prisma.plans.findUnique({
            where: {
                id: plan_id
            }
        })
        if (!plan) {
            return res.status(500).send("Error while selecting plans")
        }

        const updatedClient = await prisma.clients.update({
            where: { id: id },
            data: {
                shop_name: shop_name,
                owner_name: owner_name,
                email: email,
                phone: phone,
                address: address,
                logo: logo,
                password: password,
                googleAPI: googleAPI
            },
        });
        console.log(id, plan_id)
        const clientPlan = await prisma.clientPlans.findFirst(
            {
                where: {
                    client_id: id,
                    plan_id: plan_id
                }
            }
        )
        console.log(clientPlan)
        if (!clientPlan) {
            await prisma.clientPlans.create({
                data: {
                    client_id: id,
                    plan_id: plan_id,
                    isActive: true
                }
            })
        } else {

            await prisma.clientPlans.updateMany({
                where: {
                    client_id: id,
                }, data: {
                    isActive: false
                }
            })
            await prisma.clientPlans.updateMany({
                where: {
                    id: clientPlan.id,
                    client_id: id,
                    plan_id: plan_id,
                    isActive: false
                },
                data: {
                    isActive: true,
                }
            })
        }
        res.status(200).send("Client Updated");
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error");
    }
};

// Delete a client
export const DeleteClient = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send("Invalid Request");
        }
        await prisma.clientPlans.deleteMany({
            where: { client_id: id }
        });
        await prisma.clients.delete({
            where: { id: id },
        });
        res.status(200).send("Client Deleted");
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");

    }
};





export const SubPlans = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const plans = await prisma.plans.findMany();
        res.status(200).json(plans);
    } catch (error) {

        console.log(error)
        res.status(500).send("Internal Server Error");
    }
}