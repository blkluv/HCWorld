import Button from "@/components/Button";
import ProductCard from "@/components/ProductCard";
import ProductRow from "@/components/ProductRow";
import { getCollectionsAndProducts } from "@/lib/server";
import { Collection } from "@/lib/types";
import { GetStaticProps } from "next";
import Image from "next/image";
import React from "react";

export const getStaticProps: GetStaticProps = async () => {
	const collections = await getCollectionsAndProducts();

	return {
		props: {
			collections,
		},
	};
};

interface HoodiesProps {
	collections: Collection[];
}
export default function Hoodies({ collections }: HoodiesProps) {
	return (
		<section id="hoodies" className="h-full w-full py-4">
			<div className="flex w-full justify-between bg-black px-14 text-brand-white">
				<div className="my-auto flex h-full flex-col justify-center gap-7">
					<h1 className="text-6xl font-bold">
						Blend <span className="text-orange-600">In</span>
					</h1>
					<p className="text-2xl font-medium">
						Look up our new selection of <br /> monochrome hoodies
					</p>

					<Button className="bg-orange-600 text-xl">View All</Button>
				</div>
				<Image
					width={737}
					height={455}
					src="/images/monochrome-promo.webp"
					alt="monochrome promo image"
					className="object-cover"
				/>
			</div>

			<div className="mt-10 flex h-fit w-full flex-col gap-10">
				{collections.map((collection) => (
					<ProductRow title={collection.title} key={collection.handle}>
						{collection.products.map((product) => (
							<ProductCard key={product.handle} {...product} />
						))}
					</ProductRow>
				))}
			</div>
		</section>
	);
}
