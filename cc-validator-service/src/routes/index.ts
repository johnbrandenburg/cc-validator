import { Router } from "express";
import Paths from "../common/Paths";
import CreditCardRoutes from "./CreditCardRoutes";

const apiRouter = Router();

const creditCardRouter = Router();

creditCardRouter.post(Paths.CreditCards.Create, CreditCardRoutes.create);

apiRouter.use(Paths.CreditCards.Base, creditCardRouter);

export default apiRouter;
