import { PrimaryGeneratedColumn } from 'typeorm';

class Derp {
    @PrimaryGeneratedColumn('uuid')
    public id!: string;
}
