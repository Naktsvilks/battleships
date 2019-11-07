import { Ship } from '../entities/ship';
import { ICoordinate } from './coordinate';

export interface IShip {
    model: Ship;
    coordinate: ICoordinate;
    heading: 'horizontal' | 'vertical';
    state: 'floating' | 'sunken';
}
