import { User } from "../users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Channel } from "../channels/channel.entity";

@Entity('messages')
export class Message {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, (user) => user.messages)
    sender: User

    @ManyToOne(() => Channel, (channel) => channel.messages)
    channel: Channel

    @Column()
    content: string;
}

