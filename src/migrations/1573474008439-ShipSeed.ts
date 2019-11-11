import { MigrationInterface, QueryRunner } from 'typeorm';
import { Ship } from '../entities/ship';

export class ShipSeed1573474008439 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await Ship.insert([
            {
                name: 'Submarine',
                length: 1,
                max: 2,
                description: 'A simple submarine unit',
            },
            {
                name: 'Destroyer',
                length: 2,
                max: 2,
                description: 'A small but efficient vessel',
            },
            {
                name: 'Cruiser',
                length: 3,
                max: 1,
                description: 'Battle cruiser operational!',
            },
            {
                name: 'Battleship',
                length: 4,
                max: 1,
                description: 'Roll credits!',
            },
            {
                name: 'Aircraft Carrier',
                length: 5,
                max: 1,
                description: 'You must construct additional pylons',
            },
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {}
}
