
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

export enum ReportStatus {
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE"
}

export enum ProposedStatus {
    ALLOW = "ALLOW",
    BLOCK = "BLOCK"
}

export interface ProposalInput {
    proposedStatus: ProposedStatus;
    content: string;
}

export interface ReportInput {
    name: string;
    description: string;
    status: ReportStatus;
    reportedBy: UserInput;
    proposals: ProposalInput[];
}

export interface UserInput {
    full_name: string;
    email: string;
    avatar?: Nullable<string>;
}

export interface IMutation {
    __typename?: 'IMutation';
    createReport(report?: Nullable<ReportInput>): Nullable<Report> | Promise<Nullable<Report>>;
}

export interface IQuery {
    __typename?: 'IQuery';
    hello(): Nullable<Greeting> | Promise<Nullable<Greeting>>;
    reports(offset: number, limit: number): Nullable<Nullable<Report>[]> | Promise<Nullable<Nullable<Report>[]>>;
    report(id: string): Nullable<Report> | Promise<Nullable<Report>>;
}

export interface Greeting {
    __typename?: 'Greeting';
    message: string;
}

export interface Proposal {
    __typename?: 'Proposal';
    id: number;
    proposedStatus: ProposedStatus;
    content: string;
}

export interface Report {
    __typename?: 'Report';
    id: number;
    name: string;
    description: string;
    status: ReportStatus;
    updatedAt?: Nullable<string>;
    reportedBy: User;
    proposals: Proposal[];
}

export interface User {
    __typename?: 'User';
    id: number;
    full_name: string;
    email: string;
    avatar?: Nullable<string>;
}

type Nullable<T> = T | null;
