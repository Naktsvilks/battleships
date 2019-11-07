import { IShip } from './ship';
import { IShot } from './shot';

export interface IBoard {
    size: number;
    ships: IShip[];
    shots: IShot[];
}
