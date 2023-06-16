import { useCart } from "@/context/CartProvider";
import Button from "@/components/Button";
import CheckGroup from "@/components/CheckGroup";
import ProductCard from "@/components/ProductCard";
import ProductRow from "@/components/ProductRow";
import { _price } from "@/lib/client";
import { getProductHandles, getProductByHandle } from "@/lib/server";
import { Product, Purchase } from "@/lib/types";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import React, { useState } from "react";
import BreadCrumbs from "@/components/BreadCrumbs";
import BreadCrumbsStep from "@/components/BreadCrumbs/BreadCrumbsStep";

export const getStaticPaths: GetStaticPaths = async (ctx) => {
	const handles = await getProductHandles();

	const params = handles.map((handle) => ({ params: { handle } }));
	return {
		paths: params,
		fallback: "blocking",
	};
};

export const getStaticProps: GetStaticProps = async (ctx) => {
	const handle = ctx.params?.handle || "";

	const product = await getProductByHandle(handle as string);

	if (product === undefined) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			product,
		},
	};
};

interface ProductDetailProps {
	product: Product;
}
export default function ProductDetail({ product }: ProductDetailProps) {
	const [variant, setVariant] = useState(" ");
	const [error, setError] = useState("");
	const cartContext = useCart();

	const isInCart = cartContext?.purchases.find(
		(purchase) => product.handle == purchase.id
	);
	function addProduct() {
		if (cartContext) {
			const selectedVariant = product.variants.find(
				(iVariant) => iVariant.id == variant
			);
			if (!selectedVariant) {
				setError("Please select one size");
				return;
			}
			setError("");
			const purchase: Purchase = {
				id: product.handle,
				title: product.title,
				handle: product.handle,
				image: product.image,
				price: product.price,
				variant: {
					id: selectedVariant.id,
					text: selectedVariant.text,
				},
			};
			cartContext.addPurchase(purchase);
		}
	}

	function removeProduct() {
		if (cartContext) {
			cartContext.removePurchase(product.handle);
		}
	}
	return (
		<section className="flex flex-col gap-7">
			<BreadCrumbs className="px-14">
				<BreadCrumbsStep key={"home"} href="/">
					Home
				</BreadCrumbsStep>
				<BreadCrumbsStep key={"hoodies"} href="/hoodies">
					Hoodies
				</BreadCrumbsStep>
				<BreadCrumbsStep
					key={"collection"}
					href={`/collections/${product.collection.handle}`}
				>
					{product.collection.title}
				</BreadCrumbsStep>
				<BreadCrumbsStep key={product.title}>{product.title}</BreadCrumbsStep>
			</BreadCrumbs>
			<div className="flex h-full w-full gap-6 px-14">
				<Image
					width={679}
					height={905}
					className="h-screen flex-[0_0_50%] bg-gray-600 object-cover object-top"
					src={product.image}
					alt={product.title}
				/>
				<div className="flex w-full flex-[0_0_50%] flex-col gap-5 pt-5">
					<div className="flex w-full flex-col gap-4">
						<div>
							<h1 className="text-2xl font-semibold">{product.title}</h1>
							<p className="text-gray-600 underline">{product.vendor}</p>
							<p className="h-2 text-green-600">
								{isInCart && "You have one of these in the cart"}
							</p>
						</div>
						<p className="text-xl font-semibold text-orange-600">
							{_price(product.price)}
						</p>
						<p className="w-3/4 text-lg">{product.description}</p>
					</div>
					<div className="">
						<p className="text-lg font-semibold">Size:</p>
						<p className="h-7 text-red-600">{error}</p>
						<CheckGroup
							onChange={(val) => setVariant(val)}
							value={variant}
							items={product.variants.map((variant) => ({
								text: variant.text,
								value: variant.id,
							}))}
						/>
					</div>
					<div>
						<p className="mb-2 text-lg font-semibold">Tags</p>
						<ul>
							{product.tags.map((tag) => {
								return (
									<li key={tag} className="flex text-base">
										<span className="font-bold text-orange-600">-</span> &nbsp;
										<p>{tag[0].toUpperCase() + tag.slice(1)}</p>
									</li>
								);
							})}
						</ul>
					</div>
					{!isInCart && (
						<Button
							className="rounded-lg bg-orange-600 text-xl"
							variant="long"
							onClick={addProduct}
						>
							Add to bag
						</Button>
					)}
					{isInCart && (
						<Button
							className="rounded-lg bg-gray-600 text-xl"
							variant="long"
							onClick={removeProduct}
						>
							Remove from bag
						</Button>
					)}
				</div>
			</div>

			<ProductRow title="You may also like">
				{product.relatedProducts && product.relatedProducts.length > 0 ? (
					product.relatedProducts.map((productPreview) => {
						return (
							<ProductCard key={productPreview.handle} {...productPreview} />
						);
					})
				) : (
					<p>No related products</p>
				)}
			</ProductRow>
		</section>
	);
}
