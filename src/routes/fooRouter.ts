import { BaseRouter } from './baseRouter';
import { Router } from 'express';

class FooRouter extends BaseRouter {
    public path = '/';

    public route(): void {
        this.router.route('').get((req, res) => {
            res.send('bar');
        });
    }
}

export default new FooRouter();
