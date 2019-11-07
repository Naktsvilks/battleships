import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Ship extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    public id!: string;

    @Column()
    public name!: string;

    @Column()
    public length!: number;

    @Column()
    public max!: number;

    @Column()
    public description!: string;

    @CreateDateColumn()
    public createdAt!: Date;

    @UpdateDateColumn()
    public updatedAt!: Date;
}
