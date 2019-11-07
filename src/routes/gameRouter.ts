import { BaseRouter } from './baseRouter';
import { GameController } from '../controllers/gameController';

class GameRouter extends BaseRouter {
    public path: string = '/game';
    protected controller: GameController = new GameController();

    protected route(): void {
        this.router
            .route('')
            .get((req, res) => {
                res.render('index', { title: 'Hey!', message: 'You fookin wot m8?' });
            })
            .post((req, res) => {
                return this.controller.createGame(req, res);
            });

        this.router.route('/:gameKey').get((req, res) => {
            return this.controller.getGame(req, res);
        });
    }
}

export default new GameRouter();
