import { gql } from "@apollo/client";

export const gqlProducts = gql`
	query getProducts($limit: Int!) {
		products(first: $limit) {
			edges {
				node {
					title
					handle
					description
					tags
					createdAt
					priceRange {
						maxVariantPrice {
							amount
						}
					}
					collections(first: 1) {
						edges {
							node {
								title
							}
						}
					}
					featuredImage {
						url
					}
				}
			}
		}
	}
`;

export const gqlHandles = gql`
	query getProducts {
		products(first: 100) {
			edges {
				node {
					handle
				}
			}
		}
	}
`;

export const gqlSingleProduct = gql`
	query getSingleProduct($handle: String!) {
		product(handle: $handle) {
			id
			title
			description
			tags
			handle
			vendor
			priceRange {
				maxVariantPrice {
					amount
				}
			}
			variants(first: 5) {
				edges {
					node {
						availableForSale
						title
						id
					}
				}
			}
			createdAt
			collections(first: 1) {
				edges {
					node {
						title
					}
				}
			}
			featuredImage {
				url
				altText
			}
		}
	}
`;

export const gqlGetCollectionsAndProducts = gql`
	query getCollectionsAndProducts {
		collections(first: 5) {
			edges {
				node {
					handle
					id
					title
					products(first: 4) {
						nodes {
							title
							handle
							description
							tags
							createdAt
							priceRange {
								maxVariantPrice {
									amount
								}
							}
							collections(first: 1) {
								edges {
									node {
										title
									}
								}
							}
							featuredImage {
								url
							}
						}
					}
				}
			}
		}
	}
`;

export const gqlGetProductRecommendations = gql`
	query getProductRecommendations($id: ID!) {
		productRecommendations(productId: $id) {
			title
			handle
			tags
			priceRange {
				maxVariantPrice {
					amount
				}
			}
			featuredImage {
				url
			}
		}
	}
`;
