import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type BuyResult = {
  __typename?: 'BuyResult';
  items: Array<Item>;
  user: User;
};

export type Item = {
  __typename?: 'Item';
  _id: Scalars['String'];
  category: Scalars['String'];
  description: Scalars['String'];
  inStock: Scalars['Float'];
  price: Scalars['Float'];
  title: Scalars['String'];
};

export type LoginInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addToCart: UpdateCartResult;
  buy: BuyResult;
  login: Scalars['Boolean'];
  removeFromCart: UpdateCartResult;
  signup: Scalars['Boolean'];
};


export type MutationAddToCartArgs = {
  input: UpdateCartInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRemoveFromCartArgs = {
  input: UpdateCartInput;
};


export type MutationSignupArgs = {
  input: SignupInput;
};

export type Query = {
  __typename?: 'Query';
  httpToken?: Maybe<Scalars['String']>;
  items: Array<Item>;
  me: User;
};


export type QueryItemsArgs = {
  category?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
};

export type SignupInput = {
  nickname: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UpdateCartInput = {
  itemId: Scalars['String'];
};

export type UpdateCartResult = {
  __typename?: 'UpdateCartResult';
  item: Item;
  user: User;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  itemsInCart: Array<Item>;
  nickname: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type ItemFragmentFragment = { __typename?: 'Item', _id: string, title: string, description: string, price: number, category: string, inStock: number };

export type UserFragmentFragment = { __typename?: 'User', _id: string, username: string, nickname: string };

export type AddToCartMutationVariables = Exact<{
  input: UpdateCartInput;
}>;


export type AddToCartMutation = { __typename?: 'Mutation', addToCart: { __typename?: 'UpdateCartResult', user: { __typename?: 'User', _id: string, itemsInCart: Array<{ __typename?: 'Item', _id: string, title: string, description: string, price: number, category: string, inStock: number }> }, item: { __typename?: 'Item', _id: string, inStock: number } } };

export type BuyMutationVariables = Exact<{ [key: string]: never; }>;


export type BuyMutation = { __typename?: 'Mutation', buy: { __typename?: 'BuyResult', user: { __typename?: 'User', _id: string, itemsInCart: Array<{ __typename?: 'Item', _id: string, title: string, description: string, price: number, category: string, inStock: number }> }, items: Array<{ __typename?: 'Item', _id: string, inStock: number }> } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: boolean };

export type RemoveFromCartMutationVariables = Exact<{
  input: UpdateCartInput;
}>;


export type RemoveFromCartMutation = { __typename?: 'Mutation', removeFromCart: { __typename?: 'UpdateCartResult', user: { __typename?: 'User', _id: string, itemsInCart: Array<{ __typename?: 'Item', _id: string, title: string, description: string, price: number, category: string, inStock: number }> }, item: { __typename?: 'Item', _id: string, inStock: number } } };

export type SignupMutationVariables = Exact<{
  input: SignupInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: boolean };

export type HttpTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type HttpTokenQuery = { __typename?: 'Query', httpToken?: string | null };

export type ItemsQueryVariables = Exact<{
  category?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Float']>;
  limit?: InputMaybe<Scalars['Float']>;
}>;


export type ItemsQuery = { __typename?: 'Query', items: Array<{ __typename?: 'Item', _id: string, title: string, description: string, price: number, category: string, inStock: number }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', _id: string, username: string, nickname: string, itemsInCart: Array<{ __typename?: 'Item', _id: string, title: string, description: string, price: number, category: string, inStock: number }> } };

export const ItemFragmentFragmentDoc = gql`
    fragment ItemFragment on Item {
  _id
  title
  description
  price
  category
  inStock
}
    `;
export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  _id
  username
  nickname
}
    `;
export const AddToCartDocument = gql`
    mutation addToCart($input: UpdateCartInput!) {
  addToCart(input: $input) {
    user {
      _id
      itemsInCart {
        ...ItemFragment
      }
    }
    item {
      _id
      inStock
    }
  }
}
    ${ItemFragmentFragmentDoc}`;
export type AddToCartMutationFn = Apollo.MutationFunction<AddToCartMutation, AddToCartMutationVariables>;

/**
 * __useAddToCartMutation__
 *
 * To run a mutation, you first call `useAddToCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddToCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addToCartMutation, { data, loading, error }] = useAddToCartMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddToCartMutation(baseOptions?: Apollo.MutationHookOptions<AddToCartMutation, AddToCartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddToCartMutation, AddToCartMutationVariables>(AddToCartDocument, options);
      }
export type AddToCartMutationHookResult = ReturnType<typeof useAddToCartMutation>;
export type AddToCartMutationResult = Apollo.MutationResult<AddToCartMutation>;
export type AddToCartMutationOptions = Apollo.BaseMutationOptions<AddToCartMutation, AddToCartMutationVariables>;
export const BuyDocument = gql`
    mutation buy {
  buy {
    user {
      _id
      itemsInCart {
        ...ItemFragment
      }
    }
    items {
      _id
      inStock
    }
  }
}
    ${ItemFragmentFragmentDoc}`;
export type BuyMutationFn = Apollo.MutationFunction<BuyMutation, BuyMutationVariables>;

/**
 * __useBuyMutation__
 *
 * To run a mutation, you first call `useBuyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBuyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [buyMutation, { data, loading, error }] = useBuyMutation({
 *   variables: {
 *   },
 * });
 */
export function useBuyMutation(baseOptions?: Apollo.MutationHookOptions<BuyMutation, BuyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BuyMutation, BuyMutationVariables>(BuyDocument, options);
      }
export type BuyMutationHookResult = ReturnType<typeof useBuyMutation>;
export type BuyMutationResult = Apollo.MutationResult<BuyMutation>;
export type BuyMutationOptions = Apollo.BaseMutationOptions<BuyMutation, BuyMutationVariables>;
export const LoginDocument = gql`
    mutation login($input: LoginInput!) {
  login(input: $input)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RemoveFromCartDocument = gql`
    mutation removeFromCart($input: UpdateCartInput!) {
  removeFromCart(input: $input) {
    user {
      _id
      itemsInCart {
        ...ItemFragment
      }
    }
    item {
      _id
      inStock
    }
  }
}
    ${ItemFragmentFragmentDoc}`;
export type RemoveFromCartMutationFn = Apollo.MutationFunction<RemoveFromCartMutation, RemoveFromCartMutationVariables>;

/**
 * __useRemoveFromCartMutation__
 *
 * To run a mutation, you first call `useRemoveFromCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFromCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFromCartMutation, { data, loading, error }] = useRemoveFromCartMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveFromCartMutation(baseOptions?: Apollo.MutationHookOptions<RemoveFromCartMutation, RemoveFromCartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveFromCartMutation, RemoveFromCartMutationVariables>(RemoveFromCartDocument, options);
      }
export type RemoveFromCartMutationHookResult = ReturnType<typeof useRemoveFromCartMutation>;
export type RemoveFromCartMutationResult = Apollo.MutationResult<RemoveFromCartMutation>;
export type RemoveFromCartMutationOptions = Apollo.BaseMutationOptions<RemoveFromCartMutation, RemoveFromCartMutationVariables>;
export const SignupDocument = gql`
    mutation signup($input: SignupInput!) {
  signup(input: $input)
}
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const HttpTokenDocument = gql`
    query httpToken {
  httpToken
}
    `;

/**
 * __useHttpTokenQuery__
 *
 * To run a query within a React component, call `useHttpTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useHttpTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHttpTokenQuery({
 *   variables: {
 *   },
 * });
 */
export function useHttpTokenQuery(baseOptions?: Apollo.QueryHookOptions<HttpTokenQuery, HttpTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HttpTokenQuery, HttpTokenQueryVariables>(HttpTokenDocument, options);
      }
export function useHttpTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HttpTokenQuery, HttpTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HttpTokenQuery, HttpTokenQueryVariables>(HttpTokenDocument, options);
        }
export type HttpTokenQueryHookResult = ReturnType<typeof useHttpTokenQuery>;
export type HttpTokenLazyQueryHookResult = ReturnType<typeof useHttpTokenLazyQuery>;
export type HttpTokenQueryResult = Apollo.QueryResult<HttpTokenQuery, HttpTokenQueryVariables>;
export const ItemsDocument = gql`
    query items($category: String, $offset: Float, $limit: Float) {
  items(category: $category, offset: $offset, limit: $limit) {
    ...ItemFragment
  }
}
    ${ItemFragmentFragmentDoc}`;

/**
 * __useItemsQuery__
 *
 * To run a query within a React component, call `useItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useItemsQuery({
 *   variables: {
 *      category: // value for 'category'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useItemsQuery(baseOptions?: Apollo.QueryHookOptions<ItemsQuery, ItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ItemsQuery, ItemsQueryVariables>(ItemsDocument, options);
      }
export function useItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ItemsQuery, ItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ItemsQuery, ItemsQueryVariables>(ItemsDocument, options);
        }
export type ItemsQueryHookResult = ReturnType<typeof useItemsQuery>;
export type ItemsLazyQueryHookResult = ReturnType<typeof useItemsLazyQuery>;
export type ItemsQueryResult = Apollo.QueryResult<ItemsQuery, ItemsQueryVariables>;
export const MeDocument = gql`
    query me {
  me {
    ...UserFragment
    itemsInCart {
      ...ItemFragment
    }
  }
}
    ${UserFragmentFragmentDoc}
${ItemFragmentFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;