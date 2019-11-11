import { Board } from '../entities/board';
import { Game } from '../entities/game';
import Hashids from 'hashids/cjs';
import { GameGenerator } from '../utils/gameGenerator';

export class GameService {
    public async generateGame() {
        const board = Board.create();
        const game = Game.create();
        const hash = new Hashids('Battleships', 5);
        const generator = new GameGenerator(10);

        board.origin = board.state = await generator.seedGame();

        game.board = board;
        game.history = [];
        await game.save();

        game.key = hash.encode(game.id);

        console.log(game);

        return game.save();
    }

    public renderGame(game: Game): boolean[][] {
        const boardArr: boolean[][] = [];

        for (var x = 0; x < game.board.state.size; x++) {
            const toPush: boolean[] = [];
            for (var y = 0; y < game.board.state.size; y++) {
                toPush[y] = false;
            }
            boardArr.push(toPush);
        }

        game.board.state.ships.forEach((ship) => {
            var { x, y } = ship.coordinate;

            for (var i = 0; i < ship.model.length; i++) {
                boardArr[x][y] = true;

                if (ship.heading === 'horizontal') {
                    x++;
                } else {
                    y++;
                }
            }
        });

        return boardArr;
    }

    // Render board out as an array
    // Place ship with rotation in array
    // Check that no cells overlap with taken cells
    // If not, place ship
}
