import { Board } from '../entities/board';
import { Game } from '../entities/game';
import Hashids from 'hashids/cjs';

export class GameService {
    public async generateGame() {
        const board = Board.create();
        const game = Game.create();
        const hash = new Hashids('Battleships', 5);

        board.origin = board.state = {
            size: 10,
            ships: [],
            shots: [],
        };

        game.board = board;
        game.history = [];
        await game.save();

        game.key = hash.encode(game.id);

        console.log(game);

        return game.save();
    }
}
