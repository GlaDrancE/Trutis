import { RequestHandler, Router } from 'express'
import { GetClients, SubPlans } from '../controllers/clientController';
import multer from 'multer';
const clientRoutes = Router();

const upload = multer()
clientRoutes.get('/clients', GetClients as RequestHandler)
clientRoutes.get('/clients/subscription-plans', upload.single('logo'), SubPlans as RequestHandler)
export default clientRoutes;