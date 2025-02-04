import { Request, RequestHandler, Response, Router } from 'express'
import { GenerateQRCode } from '../controllers/adminController';
import Authenticator from '../middlewares/Authenticator';
const adminRoutes = Router();

adminRoutes.post("/qr-codes", Authenticator as RequestHandler, GenerateQRCode as RequestHandler)

export default adminRoutes