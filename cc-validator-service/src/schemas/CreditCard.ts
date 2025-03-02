import {z} from 'zod';
import { luhn } from '../validators';

const CreditCard = z.object({
    cardNumber: z.string().nonempty().refine((cn) => {
        return !isNaN(Number(cn))
    }, {message: "not a number"}).refine(luhn, {message: "invalid card number"}),
})

export default CreditCard;