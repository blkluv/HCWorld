import { gql } from "@apollo/client";

export const createCheckoutMutation = gql`
	mutation checkout($items: [CheckoutLineItemInput!]) {
		checkoutCreate(input: { lineItems: $items }) {
			checkout {
				webUrl
			}
		}
	}
`;
