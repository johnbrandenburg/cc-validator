import CreditCard from '../schemas/CreditCard';
import HttpStatusCodes from '../common/HttpStatusCodes';
import { Response, Request } from 'express';

async function create(req: Request, res: Response) {
    const card = CreditCard.safeParse(req.body);
    const statusCode = card.success ? HttpStatusCodes.CREATED : HttpStatusCodes.UNPROCESSABLE_ENTITY;
    res.status(statusCode).json(card.error);
  }

export default {
    create
} as const;