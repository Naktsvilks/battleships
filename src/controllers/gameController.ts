import { Request, Response } from 'express';
import { Game } from '../entities/game';
import { GameService } from '../services/gameService';

export class GameController {
    protected service: GameService = new GameService();

    public async renderDummy(request: Request, response: Response) {
        const game = await this.service.generateGame();

        return response.render('game', { message: `Dummy game! ${game.id}`, board: this.service.renderGame(game) });
    }

    public async getGame(request: Request, response: Response) {
        const gameKey = request.params.gameKey;

        const game = await this.service.getGame(gameKey);

        if (!game) {
            return response.render('game', { message: 'Game not found!' });
        }

        return response.render('game', { message: `Game found! ${game.id}`, board: this.service.renderGame(game) });
    }

    public async createGame(request: Request, response: Response) {
        const game = await this.service.generateGame();

        return response.json(game);
    }

    public async takeShot({ params, body }: Request, response: Response) {
        const gameKey = params.gameKey;

        const game = await this.service.getGame(gameKey);

        if (!game) {
            return response.status(404).json({ message: 'Game not found!' });
        }

        return response.json({ status: await this.service.takeShot(game, body) });
    }
}
