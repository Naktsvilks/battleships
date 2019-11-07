import { BaseRouter } from './baseRouter';
import { ShipController } from '../controllers/ShipController';

class ShipRouter extends BaseRouter {
    public path: string = '/';
    protected controller: ShipController = new ShipController();

    constructor() {
        super();
    }

    public route(): void {
        this.router.route('').get((req, res) => {
            this.controller.getShips(req, res);
        });

        this.router.route('/generate').post((req, res) => {
            this.controller.generate(req, res);
        });
    }
}

export default new ShipRouter();
