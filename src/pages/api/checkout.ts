// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createCheckout } from "@/lib/server";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
	webUrl?: string;
	message: string;
};
type Body = {
	variants: string[];
};
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const bodyData = req.body as Body;

	if (bodyData.variants.length < 1) {
		res.status(400).send({ message: "Bad request, supply variants" });
		return;
	}

	const webUrl = await createCheckout(bodyData.variants);

	if (webUrl == undefined) {
		res.status(500).send({ message: "Shopify Error, checkout returned null" });
		return;
	}
	res.status(200).send({ webUrl, message: "Checkout successful" });
}
