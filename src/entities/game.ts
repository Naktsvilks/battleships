import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { Board } from './board';
import { IHistory } from '../interfaces/history';

@Entity()
export class Game extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ nullable: true })
    public key!: string;

    @OneToOne((type) => Board, { cascade: true, eager: true })
    @JoinColumn()
    public board!: Board;

    @Column({ type: 'json' })
    public history!: IHistory[];

    @CreateDateColumn()
    public createdAt!: Date;

    @UpdateDateColumn()
    public updatedAt!: Date;
}
