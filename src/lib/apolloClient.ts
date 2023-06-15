import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
	uri: process.env.SHOPIFY_API_URL || "",
	cache: new InMemoryCache(),
	headers: {
		"X-SHOPIFY-Storefront-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN || "",
	},
});

export default client;
