import { gql } from "@apollo/client";
import {
	Collection,
	CollectionNode,
	Product,
	ProductNode,
	ProductPreview,
	ShopifyCheckoutResponse,
	ShopifyRecommendations,
	ShopifyResponseMany,
	ShopifyResponseOne,
} from "./types";
import client from "./apolloClient";
import {
	gqlGetCollectionsAndProducts,
	gqlGetProductRecommendations,
	gqlHandles,
	gqlProducts,
	gqlSingleProduct,
} from "./queries";
import { createCheckoutMutation } from "./mutations";

function unpackProductNode(node: ProductNode): Product {
	return {
		id: node.id,
		title: node.title,
		collection: node.collections.edges[0].node.title,
		description: node.description,
		handle: node.handle,
		image: node.featuredImage.url,
		price: node.priceRange.maxVariantPrice.amount,
		tags: node.tags,
		vendor: node.vendor,
		variants: node.variants.edges.map(({ node }) => ({
			id: node.id,
			text: node.title,
			available: node.availableForSale,
		})),
	};
}
function unpackProductPreviewNode(node: ProductNode): ProductPreview {
	return {
		handle: node.handle,
		image: node.featuredImage.url,
		price: node.priceRange.maxVariantPrice.amount,
		tags: node.tags,
		title: node.title,
	};
}

export async function getProductsPreview(limit = 4): Promise<ProductPreview[]> {
	const data = await client.query<ShopifyResponseMany<"products", ProductNode>>(
		{
			query: gqlProducts,
			variables: {
				limit,
			},
		}
	);
	if (data === undefined) {
		return [];
	}

	const productsPreview: ProductPreview[] = data.data.products.edges.map(
		({ node }) => unpackProductPreviewNode(node)
	);

	return productsPreview;
}

export async function getCollectionsAndProducts(): Promise<Collection[]> {
	const data = await client.query<
		ShopifyResponseMany<"collections", CollectionNode>
	>({ query: gqlGetCollectionsAndProducts });

	if (data == null) {
		return [];
	}

	const collections: Collection[] = data.data.collections.edges.map(
		({ node }) => {
			return {
				handle: node.handle,
				id: node.id,
				products: node.products.nodes.map(unpackProductPreviewNode),
				title: node.title,
			};
		}
	);

	return collections;
}

export async function getProductByHandle(
	handle: string
): Promise<Product | undefined> {
	const data = await client.query<ShopifyResponseOne<"product", ProductNode>>({
		query: gqlSingleProduct,
		variables: {
			handle,
		},
	});

	if (data === undefined) {
		return undefined;
	}
	const resProduct = data.data.product;

	if (resProduct == null) {
		return undefined;
	}
	const relatedData = await client.query<ShopifyRecommendations>({
		query: gqlGetProductRecommendations,
		variables: { id: resProduct.id },
	});

	const product: Product = unpackProductNode(resProduct);
	product.relatedProducts = relatedData.data.productRecommendations?.map(
		unpackProductPreviewNode
	);

	return product;
}

export async function getProductHandles(): Promise<string[]> {
	const data = await client.query<
		ShopifyResponseMany<"products", { handle: string }>
	>({ query: gqlHandles });

	if (data == null) {
		return [];
	}

	return data.data.products.edges.map((node) => node.node.handle);
}

export async function createCheckout(
	variants: string[]
): Promise<string | null> {
	const items = variants.map((variant) => ({
		variantId: variant,
		quantity: 1,
	}));

	const { data } = await client.mutate<ShopifyCheckoutResponse>({
		mutation: createCheckoutMutation,
		variables: {
			items,
		},
	});

	if (data == null) {
		return null;
	}
	return data.checkoutCreate.checkout.webUrl;
}
