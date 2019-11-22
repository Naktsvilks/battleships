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

    public async getGame(gameKey: string) {
        return Game.findOne({ key: gameKey });
    }

    public renderGame(game: Game): number[][] {
        const boardArr: number[][] = [];

        for (var x = 0; x < game.board.state.size; x++) {
            const toPush: number[] = [];
            for (var y = 0; y < game.board.state.size; y++) {
                toPush.push(0);
            }
            boardArr.push(toPush);
        }

        game.board.state.ships.forEach((ship) => {
            var { x, y } = ship.coordinate;

            for (var lngth = 0; lngth < ship.model.length; lngth++) {
                const rows = boardArr.length;
                if (rows > 0) {
                    const columns = boardArr[0].length;

                    for (var i = Math.max(0, x - 1); i < Math.min(rows, x + 2); i++) {
                        for (var j = Math.max(0, y - 1); j < Math.min(columns, y + 2); j++) {
                            if (i === x && j === y) boardArr[i][j] = 2;
                            else if (boardArr[i][j] === 0) boardArr[i][j] = 1;
                        }
                    }
                }

                if (ship.heading === 'horizontal') {
                    x++;
                } else {
                    y++;
                }
            }
        });

        return boardArr;
    }

    public async takeShot(game: Game, { x, y }: { x: number; y: number }) {
        const board = this.renderGame(game);

        if (board[x][y] === 2) {
            return 'hit';
        } else {
            return 'miss';
        }
    }

    // Render board out as an array
    // Place ship with rotation in array
    // Check that no cells overlap with taken cells
    // If not, place ship
}
