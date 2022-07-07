
import { Message } from "../messages/message.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    username: string;

    @Column({nullable: true})
    picture: string;

    @OneToMany(() => Message, (message) => message.sender)
    messages: Array<Message>
}