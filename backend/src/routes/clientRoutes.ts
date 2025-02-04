import { RequestHandler, Router } from 'express'
import { CreateClient, DeleteClient, GetClients, SubPlans, UpdateClient } from '../controllers/clientController';
import { upload } from '../utils/multer'
import Caching from '../utils/caching';
const clientRoutes = Router();

clientRoutes.get('/clients', GetClients as RequestHandler)
clientRoutes.get('/clients/subscription-plans', SubPlans as RequestHandler)
clientRoutes.post('/clients', upload.single('logo'), CreateClient as RequestHandler)
clientRoutes.put('/clients/:id', upload.single('logo'), UpdateClient as RequestHandler)
clientRoutes.delete('/clients/:id', DeleteClient as RequestHandler)
clientRoutes.get('/forms/:id', DeleteClient as RequestHandler)
export default clientRoutes;