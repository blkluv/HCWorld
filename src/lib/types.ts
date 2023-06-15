export type ProductPreview = {
	image: string;
	title: string;
	tags: string[];
	price: number;
	handle: string;
};
export type Product = {
	id: string;
	title: string;
	description: string;
	tags: string[];
	handle: string;
	price: number;
	collection: string;
	vendor: string;
	relatedProducts?: ProductPreview[];
	variants: {
		id: string;
		text: string;
		available: boolean;
	}[];
	image: string;
};
export type Purchase = {
	image: string;
	handle: string;
	title: string;
	variant: {
		id: string;
		text: string;
	};
	price: number;
	id: string;
};
export interface Variants {
	edges: VariantsEdge[];
}
export interface VariantsEdge {
	node: {
		availableForSale: boolean;
		title: string;
		id: string;
	};
}

export type ShopifyResponseMany<V extends string, Node = any> = {
	[key in V]: {
		edges: { node: Node }[];
	};
};

export type ShopifyResponseOne<V extends string, Node = any> = {
	[key in V]: Node;
};
export interface ProductNode {
	id: string;
	title: string;
	handle: string;
	description: string;
	tags: string[];
	createdAt: Date;
	vendor: string;
	variants: Variants;
	collections: Collections;
	featuredImage: FeaturedImage;
	priceRange: PriceRange;
}

export interface PriceRange {
	maxVariantPrice: {
		amount: number;
	};
}
export interface Collections {
	edges: CollectionsEdge[];
}

export interface CollectionsEdge {
	node: { title: string };
}

export interface FeaturedImage {
	url: string;
}
export interface ShopifyCheckoutResponse {
	checkoutCreate: Checkout;
}
export interface Checkout {
	checkout: {
		webUrl: string;
	};
}

export interface ShopifyRecommendations {
	productRecommendations?: ProductNode[];
}

export interface CollectionNode {
	title: string;
	id: string;
	handle: string;
	products: {
		nodes: ProductNode[];
	};
}

export interface Collection {
	title: string;
	id: string;
	handle: string;
	products: ProductPreview[];
}
