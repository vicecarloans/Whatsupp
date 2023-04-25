
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

export interface IQuery {
    __typename?: 'IQuery';
    hello(): Nullable<Greeting> | Promise<Nullable<Greeting>>;
}

export interface Greeting {
    __typename?: 'Greeting';
    message: string;
}

type Nullable<T> = T | null;
