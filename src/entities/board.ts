import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Game } from './game';
import { IBoard } from 'interfaces/board';

@Entity()
export class Board extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    public id!: string;

    @OneToOne((type) => Game)
    public game!: Game;

    @Column({ type: 'json' })
    public state!: IBoard;

    @Column({ type: 'json' })
    public origin!: IBoard;

    @CreateDateColumn()
    public createdAt!: Date;

    @UpdateDateColumn()
    public updatedAt!: Date;
}
