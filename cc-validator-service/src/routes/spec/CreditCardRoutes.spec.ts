import {describe, expect, test, vi} from 'vitest';
import supertest from 'supertest';
import express from 'express';
import Paths from '../../common/Paths';

import CreditCardRoutes from "../CreditCardRoutes";



const app = express();
app.use(express.json())
app.use(Paths.CreditCards.Base, CreditCardRoutes.create)

describe('Credit Card Routes', () => {
    test('returns 201 when valid', async () => {
        const input = {cardNumber: '0'};
        const res = await supertest(app)
        .post('/credit_cards')
        .send(input)
        .type('json')
        
        expect(res.status).toEqual(201);
    });

    test('returns 422 when invalid', async () => {
        const input = {cardNumber: '1'};
        const res = await supertest(app)
        .post('/credit_cards')
        .send(input)
        .set('Accept', 'application/json')
        
        expect(res.status).toEqual(422)
    });
})