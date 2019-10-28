import { Request, Response } from 'express';

export class ShipController {
    public getShips(request: Request, response: Response) {
        console.log('Get ships');
        response.json({ ships: [] });
    }

    public generate(request: Request, response: Response) {
        console.log('generating ships');
        response.send('derp');
    }
}
