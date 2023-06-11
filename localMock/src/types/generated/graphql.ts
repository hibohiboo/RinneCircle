import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from '../context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** This is a `DateTime` scalar */
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
  JSONObject: { input: any; output: any; }
  /** Firebase Authのuid.28文字 */
  UID: { input: any; output: any; }
  URL: { input: any; output: any; }
  /** UUIDの文字列 */
  UUID: { input: any; output: any; }
  Void: { input: any; output: any; }
};

export type Mutation = {
  __typename?: 'Mutation';
  insert_RinneScenario_one?: Maybe<RinneScenarioUpsertResponse>;
};


export type MutationInsert_RinneScenario_OneArgs = {
  object: RinneScenarioInput;
  on_conflict: RinneScenario_On_Conflict;
};

/** Something interesting about my `Queries`. */
export type Query = {
  __typename?: 'Query';
  RinneScenario: Array<RinneScenario>;
};


/** Something interesting about my `Queries`. */
export type QueryRinneScenarioArgs = {
  where?: InputMaybe<RinneScenario_Filter>;
};

export type RinneScenario = {
  __typename?: 'RinneScenario';
  /** 作成者ID */
  authorId: Scalars['UID']['output'];
  /** 更新日時(UTC) */
  createdAt: Scalars['DateTime']['output'];
  /** シナリオID */
  id: Scalars['UUID']['output'];
  /** シナリオタイトル画像のURL */
  imageUrl?: Maybe<Scalars['String']['output']>;
  /** シナリオ詳細ファイルのパス */
  path: Scalars['String']['output'];
  /** 公開するかどうか */
  published: Scalars['Boolean']['output'];
  /** シナリオタイトル */
  title: Scalars['String']['output'];
  /** 作成日時(UTC) */
  updatedAt: Scalars['DateTime']['output'];
};

export type RinneScenarioInput = {
  /** 作成者ID */
  authorId: Scalars['UID']['input'];
  /** シナリオID */
  id: Scalars['UUID']['input'];
  /** シナリオタイトル画像のURL */
  imageUrl: Scalars['String']['input'];
  /** シナリオ詳細ファイルのパス */
  path: Scalars['String']['input'];
  /** 公開するかどうか */
  published: Scalars['Boolean']['input'];
  /** シナリオタイトル */
  title: Scalars['String']['input'];
  /** 更新日時(UTC) */
  updatedAt: Scalars['DateTime']['input'];
};

export type RinneScenarioUpsertResponse = {
  __typename?: 'RinneScenarioUpsertResponse';
  id: Scalars['UUID']['output'];
};

export type RinneScenario_Constraint =
  | 'RinneScenario_pkey';

export type RinneScenario_Filter = {
  authorId?: InputMaybe<Scalars['UID']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
};

export type RinneScenario_On_Conflict = {
  constraint: RinneScenario_Constraint;
  update_columns?: InputMaybe<Array<RinneScenario_Update_Column>>;
};

export type RinneScenario_Update_Column =
  /** 公開するかどうか */
  | 'published'
  /** シナリオタイトル */
  | 'title'
  /** 更新日時 */
  | 'updatedAt';

export type SpectaQlOption = {
  key: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type Order_By_Direction =
  | 'asc'
  | 'desc';

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  RinneScenario: ResolverTypeWrapper<RinneScenario>;
  RinneScenarioInput: RinneScenarioInput;
  RinneScenarioUpsertResponse: ResolverTypeWrapper<RinneScenarioUpsertResponse>;
  RinneScenario_constraint: RinneScenario_Constraint;
  RinneScenario_filter: RinneScenario_Filter;
  RinneScenario_on_conflict: RinneScenario_On_Conflict;
  RinneScenario_update_column: RinneScenario_Update_Column;
  SpectaQLOption: SpectaQlOption;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UID: ResolverTypeWrapper<Scalars['UID']['output']>;
  URL: ResolverTypeWrapper<Scalars['URL']['output']>;
  UUID: ResolverTypeWrapper<Scalars['UUID']['output']>;
  Void: ResolverTypeWrapper<Scalars['Void']['output']>;
  order_by_direction: Order_By_Direction;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  DateTime: Scalars['DateTime']['output'];
  JSON: Scalars['JSON']['output'];
  JSONObject: Scalars['JSONObject']['output'];
  Mutation: {};
  Query: {};
  RinneScenario: RinneScenario;
  RinneScenarioInput: RinneScenarioInput;
  RinneScenarioUpsertResponse: RinneScenarioUpsertResponse;
  RinneScenario_filter: RinneScenario_Filter;
  RinneScenario_on_conflict: RinneScenario_On_Conflict;
  SpectaQLOption: SpectaQlOption;
  String: Scalars['String']['output'];
  UID: Scalars['UID']['output'];
  URL: Scalars['URL']['output'];
  UUID: Scalars['UUID']['output'];
  Void: Scalars['Void']['output'];
}>;

export type SpectaqlDirectiveArgs = {
  options?: Maybe<Array<Maybe<SpectaQlOption>>>;
};

export type SpectaqlDirectiveResolver<Result, Parent, ContextType = Context, Args = SpectaqlDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export interface JsonObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject';
}

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  insert_RinneScenario_one?: Resolver<Maybe<ResolversTypes['RinneScenarioUpsertResponse']>, ParentType, ContextType, RequireFields<MutationInsert_RinneScenario_OneArgs, 'object' | 'on_conflict'>>;
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  RinneScenario?: Resolver<Array<ResolversTypes['RinneScenario']>, ParentType, ContextType, Partial<QueryRinneScenarioArgs>>;
}>;

export type RinneScenarioResolvers<ContextType = Context, ParentType extends ResolversParentTypes['RinneScenario'] = ResolversParentTypes['RinneScenario']> = ResolversObject<{
  authorId?: Resolver<ResolversTypes['UID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  published?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RinneScenarioUpsertResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['RinneScenarioUpsertResponse'] = ResolversParentTypes['RinneScenarioUpsertResponse']> = ResolversObject<{
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface UidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UID'], any> {
  name: 'UID';
}

export interface UrlScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['URL'], any> {
  name: 'URL';
}

export interface UuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UUID'], any> {
  name: 'UUID';
}

export interface VoidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Void'], any> {
  name: 'Void';
}

export type Resolvers<ContextType = Context> = ResolversObject<{
  DateTime?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RinneScenario?: RinneScenarioResolvers<ContextType>;
  RinneScenarioUpsertResponse?: RinneScenarioUpsertResponseResolvers<ContextType>;
  UID?: GraphQLScalarType;
  URL?: GraphQLScalarType;
  UUID?: GraphQLScalarType;
  Void?: GraphQLScalarType;
}>;

export type DirectiveResolvers<ContextType = Context> = ResolversObject<{
  spectaql?: SpectaqlDirectiveResolver<any, any, ContextType>;
}>;
