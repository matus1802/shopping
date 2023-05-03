import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type BuyResultKeySpecifier = ('items' | 'user' | BuyResultKeySpecifier)[];
export type BuyResultFieldPolicy = {
	items?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ItemKeySpecifier = ('_id' | 'category' | 'description' | 'inStock' | 'price' | 'title' | ItemKeySpecifier)[];
export type ItemFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	category?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	inStock?: FieldPolicy<any> | FieldReadFunction<any>,
	price?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('addToCart' | 'buy' | 'login' | 'removeFromCart' | 'signup' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	addToCart?: FieldPolicy<any> | FieldReadFunction<any>,
	buy?: FieldPolicy<any> | FieldReadFunction<any>,
	login?: FieldPolicy<any> | FieldReadFunction<any>,
	removeFromCart?: FieldPolicy<any> | FieldReadFunction<any>,
	signup?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('httpToken' | 'items' | 'me' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	httpToken?: FieldPolicy<any> | FieldReadFunction<any>,
	items?: FieldPolicy<any> | FieldReadFunction<any>,
	me?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UpdateCartResultKeySpecifier = ('item' | 'user' | UpdateCartResultKeySpecifier)[];
export type UpdateCartResultFieldPolicy = {
	item?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserKeySpecifier = ('_id' | 'itemsInCart' | 'nickname' | 'password' | 'username' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	itemsInCart?: FieldPolicy<any> | FieldReadFunction<any>,
	nickname?: FieldPolicy<any> | FieldReadFunction<any>,
	password?: FieldPolicy<any> | FieldReadFunction<any>,
	username?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	BuyResult?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | BuyResultKeySpecifier | (() => undefined | BuyResultKeySpecifier),
		fields?: BuyResultFieldPolicy,
	},
	Item?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ItemKeySpecifier | (() => undefined | ItemKeySpecifier),
		fields?: ItemFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	UpdateCartResult?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UpdateCartResultKeySpecifier | (() => undefined | UpdateCartResultKeySpecifier),
		fields?: UpdateCartResultFieldPolicy,
	},
	User?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier),
		fields?: UserFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;