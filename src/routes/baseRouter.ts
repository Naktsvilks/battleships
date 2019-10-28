import { Router } from 'express';

export abstract class BaseRouter {
    public abstract path: string;
    protected _router: Router;
    get router() {
        return this._router;
    }

    constructor() {
        this._router = Router();
        this.route();
    }

    protected abstract route(): void;
}
