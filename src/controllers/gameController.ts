import { Request, Response } from 'express';
import { Game } from '../entities/game';
import { GameService } from '../services/gameService';

export class GameController {
    protected service: GameService = new GameService();

    public async getGame(request: Request, response: Response) {
        const gameKey = request.params.gameKey;

        const game = await Game.findOne({ key: gameKey });

        if (!game) {
            return response.render('game', { message: 'Game not found!' });
        }

        return response.render('game', { message: `Game found! ${game.id}`, board: this.service.renderGame(game) });
    }

    public async createGame(request: Request, response: Response) {
        const game = await this.service.generateGame();

        return response.json(game);
    }
}
