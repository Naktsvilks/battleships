import { BaseRouter } from './baseRouter';
import { GameController } from '../controllers/gameController';

class GameRouter extends BaseRouter {
    public path: string = '/game';
    protected controller: GameController = new GameController();

    protected route(): void {
        this.router
            .route('')
            .get((req, res) => this.controller.renderDummy(req, res))
            .post((req, res) => this.controller.createGame(req, res));

        this.router
            .route('/:gameKey')
            .get((req, res) => this.controller.getGame(req, res))
            .post((req, res) => this.controller.takeShot(req, res));
    }
}

export default new GameRouter();
