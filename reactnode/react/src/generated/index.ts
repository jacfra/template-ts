import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables extends { [key: string]: any }>(client: GraphQLClient, query: string, variables?: TVariables, requestHeaders?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request({
    document: query,
    variables,
    requestHeaders
  });
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type DemoEntity = {
  __typename?: 'DemoEntity';
  id: Scalars['ID'];
  value: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  demo: Array<DemoEntity>;
};

export type GetDemoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDemoQuery = { __typename?: 'Query', demo: Array<{ __typename?: 'DemoEntity', id: string, value: string }> };


export const GetDemoDocument = `
    query getDemo {
  demo {
    id
    value
  }
}
    `;
export const useGetDemoQuery = <
      TData = GetDemoQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetDemoQueryVariables,
      options?: UseQueryOptions<GetDemoQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetDemoQuery, TError, TData>(
      variables === undefined ? ['getDemo'] : ['getDemo', variables],
      fetcher<GetDemoQuery, GetDemoQueryVariables>(client, GetDemoDocument, variables, headers),
      options
    );