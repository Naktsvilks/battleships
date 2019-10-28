import express from 'express';
import { json } from 'body-parser';
import * as fs from 'fs';
import * as path from 'path';
import { BaseRouter } from './routes/baseRouter';

export default class App {
    public app: express.Application;

    constructor() {
        this.app = express();

        this.config();
    }

    private config(): void {
        this.app.use(json());

        const routeFiles = fs
            .readdirSync(path.resolve(process.cwd(), 'src/routes'))
            .filter(file => file.endsWith('.ts') && !file.startsWith('base'));

        for (const file of routeFiles) {
            const router: { default: BaseRouter } = require(`./routes/${file}`);

            if (router.default)
                this.app.use(router.default.path, router.default.router);
        }
    }
}
