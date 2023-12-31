export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export enum Department {
  Engineering = "ENGINEERING",
  Hr = "HR",
  Product = "PRODUCT",
}

export type Query = {
  __typename?: "Query";
  usersCount: Scalars["Int"];
};

export type QueryUsersCountArgs = {
  departmentFilter?: InputMaybe<Department>;
};

export type GetUsersCountQueryVariables = Exact<{
  departmentFilter?: InputMaybe<Department>;
}>;

export type GetUsersCountQuery = { __typename?: "Query"; usersCount: number };
