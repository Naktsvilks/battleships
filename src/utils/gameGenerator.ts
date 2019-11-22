import { Ship } from '../entities/ship';
import { IBoard } from '../interfaces/board';
import { IShip } from '../interfaces/ship';

export class GameGenerator {
    protected boardArr: number[][];
    protected size: number;

    constructor(size: number) {
        this.size = size;
        this.boardArr = [];

        for (var x = 0; x < size; x++) {
            const toPush: number[] = [];
            for (var y = 0; y < size; y++) {
                toPush[y] = 0;
            }
            this.boardArr.push(toPush);
        }
    }

    public async seedGame(): Promise<IBoard> {
        const ships = await this.getShips();
        const placedShips: IShip[] = [];
        const max = ships.length;

        for (var i = 0; i < max; i++) {
            const shipIndex = Math.floor(Math.random() * ships.length);
            placedShips.push(this.placeShip(ships[shipIndex]));
            ships.splice(shipIndex, 1);
        }

        return {
            size: 10,
            ships: placedShips,
            shots: [],
        };
    }

    protected async getShips(): Promise<Ship[]> {
        const dbShips = await Ship.find();

        const ships: Ship[] = [];

        dbShips.forEach((dbShip) => {
            for (var s = 0; s < dbShip.max; s++) {
                ships.push(dbShip);
            }
        });

        return ships;
    }

    protected placeShip(ship: Ship): IShip {
        var x, y, heading;
        var collides = false;
        do {
            x = Math.round(Math.floor(Math.random() * this.size));
            y = Math.round(Math.floor(Math.random() * this.size));

            if (Math.random() * 2 > 1) {
                if (x + ship.length > this.size - 1) {
                    x -= x + ship.length - this.size + 1;
                }
                collides = this.checkCollision(ship.length, x, y, 'horizontal');
                heading = 'horizontal';
            } else {
                if (y + ship.length > this.size - 1) {
                    y -= y + ship.length - this.size + 1;
                }
                collides = this.checkCollision(ship.length, x, y, 'vertical');
                heading = 'vertical';
            }
        } while (collides);

        return {
            model: ship,
            coordinate: { x, y },
            heading: heading == 'horizontal' ? 'horizontal' : 'vertical',
            state: 'floating',
        };
    }

    protected checkCollision(shipSize: number, x: number, y: number, heading: 'horizontal' | 'vertical'): boolean {
        const check: number[][] = JSON.parse(JSON.stringify(this.boardArr));

        for (var s = 0; s < shipSize; s++) {
            try {
                if (this.checkBoard(x, y)) {
                    return true;
                }

                const rows = check.length;
                if (rows > 0) {
                    const columns = check[0].length;
                    for (var i = Math.max(0, x - 1); i < Math.min(x + 2, columns); i++) {
                        for (var j = Math.max(0, y - 1); j < Math.min(y + 2, rows); j++) {
                            if (this.boardArr[i][j] === 2)
                                throw `Ships collided. checkBoard is borked and returned ${this.checkBoard(x, y)}`;

                            if (i === x && j === y) check[i][j] = 2;
                            else if (check[i][j] === 0) check[i][j] = 1;
                        }
                    }
                }

                if (heading === 'horizontal') x++;
                else y++;
            } catch (exception) {
                console.error(`X: ${x}, Y: ${y}, s: ${s}, shipSize: ${shipSize}`, exception);
                return true;
            }
        }
        this.commitShip(check);
        return false;
    }

    protected checkBoard(x: number, y: number): boolean {
        return this.boardArr[x][y] > 0;
    }

    protected commitShip(check: number[][]): void {
        const diff: { x: number; y: number; value: number }[] = [];

        this.boardArr.forEach((origRow, x) => {
            origRow.forEach((origCol, y) => {
                if (check[x][y] != origCol) {
                    this.boardArr[x][y] = check[x][y];
                    diff.push({ x, y, value: check[x][y] });
                }
            });
        });
    }
}
