import { _price } from "@/lib/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProductCardProps {
	title: string;
	image: string;
	tags: string[];
	price: number;
	handle: string;
}

export default function ProductCard({
	title,
	image,
	tags,
	price,
	handle,
}: ProductCardProps) {
	return (
		<Link href={`/products/${handle}`} className="flex flex-col">
			<div className="h-fit w-fit overflow-hidden">
				<Image
					height={328}
					width={301}
					src={image}
					className="aspect-h-4 aspect-w-3 h-80 w-76 object-cover object-top p-0 transition-transform duration-200 hover:scale-110"
					alt={title}
				/>
			</div>
			<div>
				<p className="text-xl">{title}</p>
				<p className="text-base text-gray-700">
					{tags.map((tag) => tag[0].toUpperCase() + tag.slice(1)).join(", ")}
				</p>

				<p className="text-base font-medium text-orange-600">{_price(price)}</p>
			</div>
		</Link>
	);
}
