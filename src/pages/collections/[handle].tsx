import BreadCrumbs from "@/components/BreadCrumbs";
import BreadCrumbsStep from "@/components/BreadCrumbs/BreadCrumbsStep";
import FilterToggle from "@/components/FilterToggle";
import ProductCard from "@/components/ProductCard";
import { Filter } from "@/lib/enums";
import { getCollectionByHandle, getCollectionHandles } from "@/lib/server";
import { FullCollection, Product } from "@/lib/types";
import { GetStaticPaths, GetStaticProps } from "next";
import React, { useEffect, useState } from "react";

export const getStaticPaths: GetStaticPaths = async (cxt) => {
	const handles = await getCollectionHandles();
	const params = handles.map((handle) => ({ params: { handle } }));

	return {
		paths: params,
		fallback: "blocking",
	};
};

export const getStaticProps: GetStaticProps = async (ctx) => {
	const handle = ctx.params?.handle || "";

	if (!handle) {
		return {
			notFound: true,
		};
	}
	const collection = await getCollectionByHandle(handle as string);

	if (collection === undefined) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			collection,
		},
	};
};

interface CollectionProps {
	collection: FullCollection;
}

export default function Collection({ collection }: CollectionProps) {
	const [priceFilter, setPriceFilter] = useState<Filter>(Filter.ASC);
	function sortProducts(products: Product[]): Product[] {
		if (priceFilter == Filter.ASC) {
			return [...products].sort((a, b) => a.price - b.price);
		}
		return [...products].sort((a, b) => b.price - a.price);
	}

	return (
		<section id="collection" className="px-14 py-4">
			<BreadCrumbs className="">
				<BreadCrumbsStep key={"home"} href="/">
					Home
				</BreadCrumbsStep>
				<BreadCrumbsStep key={"hoodies"} href="/hoodies">
					Hoodies
				</BreadCrumbsStep>
				<BreadCrumbsStep key={"collection"}>{collection.title}</BreadCrumbsStep>
			</BreadCrumbs>
			<h1 className="my-3 text-3xl font-bold">{collection.title}</h1>
			<div className="mb-4 overflow-hidden border-l-2 border-gray-600 pl-1 text-base">
				<p className="">{collection.description}</p>
			</div>
			<span className="h-px w-full bg-gray-500"></span>

			<div className="mb-4 flex w-full">
				<FilterToggle
					tag="Order by price"
					value={priceFilter}
					setValue={setPriceFilter}
				/>
			</div>
			<div className="grid grid-flow-row grid-cols-4">
				{sortProducts(collection.products).map((product) => (
					<ProductCard key={product.handle} {...product} />
				))}
			</div>
		</section>
	);
}
