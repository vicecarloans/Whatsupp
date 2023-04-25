
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum Response {
    OK = "OK"
}

export interface IMutation {
    __typename?: 'IMutation';
    sendMessage(senderId: string, channelId: string, content: string): Response | Promise<Response>;
}

export interface IQuery {
    __typename?: 'IQuery';
    messages(channelId: string, offset?: Nullable<number>, limit?: Nullable<number>): Nullable<Nullable<Message>[]> | Promise<Nullable<Nullable<Message>[]>>;
}

export interface ISubscription {
    __typename?: 'ISubscription';
    messageAdded(channelId: string): Nullable<Message> | Promise<Nullable<Message>>;
}

export interface Channel {
    __typename?: 'Channel';
    id: string;
    name: string;
}

export interface Message {
    __typename?: 'Message';
    id: string;
    channel: Channel;
    sender: User;
    content: string;
}

export interface User {
    __typename?: 'User';
    id: string;
    username: string;
    picture?: Nullable<string>;
}

type Nullable<T> = T | null;
