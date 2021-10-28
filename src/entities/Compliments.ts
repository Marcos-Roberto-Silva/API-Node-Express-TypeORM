import {Entity, PrimaryColumn, Column, CreateDateColumn, JoinColumn, ManyToOne} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Tags } from './Tags';

@Entity("compliments")
class Compliment {

    @PrimaryColumn()
    readonly id : string;

    @Column()
    user_sender : string;

    @Column()
    user_receiver : string;

    @Column()
    tag_id : string;

    @Column()
    message: string;

    @JoinColumn({ name: "tag_id"})
    @ManyToOne(() => Tags)
    tag: Tags

    @CreateDateColumn()
    created_at : string;

    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }
}


export {
    Compliment
}
