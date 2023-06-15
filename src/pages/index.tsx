import Button from "@/components/Button";
import ProductCard from "@/components/ProductCard";
import ProductRow from "@/components/ProductRow";
import Image from "next/image";
import { generateProduct } from "@/lib/client";
import { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import { ProductPreview } from "@/lib/types";
import { getProductsPreview } from "@/lib/server";
import { useRouter } from "next/router";

export const getStaticProps: GetStaticProps = async (ctx) => {
	const productsPreview = await getProductsPreview();

	return {
		props: {
			productsPreview,
		},
	};
};

interface HomeProps {
	productsPreview: ProductPreview[];
}
export default function Home({ productsPreview }: HomeProps) {
	const router = useRouter();
	return (
		<div className=" h-fit w-full overflow-hidden">
			<section
				id="hero"
				className="relative mb-32 flex h-fit w-full items-center justify-between pl-14"
			>
				<div className="flex w-fit flex-col gap-4">
					<h1 className="text-6xl font-semibold">
						Casual&nbsp;
						<span className="text-orange-600">Coolness</span> <br />
						<span className="text-orange-600">Stylish</span>&nbsp;Comfort
					</h1>

					<p className="w-9/12 text-md">
						Experience unparalleled comfort and style with our handpicked
						selection, for those searching for unique and trendy hoodies.
					</p>

					<Button
						onClick={() => router.push("/hoodies")}
						className="bg-orange-600"
					>
						View our selection
					</Button>
				</div>

				<div className="relative grid h-fit w-full grid-cols-[1fr_max-content] grid-rows-2 gap-x-2 gap-y-4 overflow-hidden">
					<Image
						width={428}
						height={642}
						src="/images/hero-1.webp"
						alt="Person in plain background with a hoodie"
						className="z-10 row-span-2 h-[39rem] w-full animate-fade object-cover opacity-0"
					/>
					<Image
						width={305}
						height={305}
						src="/images/hero-2.webp"
						className="z-10 h-76 w-76 animate-fade object-cover object-top opacity-0 animation-delay-100"
						alt="Person in wood background with a hoodie"
					/>
					<Image
						width={305}
						height={305}
						src="/images/hero-3.webp"
						className="z-10 h-76 w-76 animate-fade object-cover object-top opacity-0 animation-delay-200"
						alt="Person with a white hoodie in gray background"
					/>

					<Image
						width={500}
						height={900}
						src="/images/hero-icon.webp"
						className="absolute -bottom-1/2 right-0"
						alt="background grid"
					/>
				</div>
			</section>

			<section id="body" className="h-full w-full">
				<h2 className="mb-3 text-center text-2xl font-bold">
					Check out our new acquisitions
				</h2>
				<ProductRow>
					{productsPreview.map((product, i) => (
						<ProductCard key={i} {...product} />
					))}
				</ProductRow>
			</section>
		</div>
	);
}
