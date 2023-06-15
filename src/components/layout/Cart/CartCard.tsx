import { useCart } from "@/Context/CartProvider";
import Button from "@/components/Button";
import { _price } from "@/lib/client";
import { Purchase } from "@/lib/types";
import Image from "next/image";
import React from "react";

interface CardCartProps {
	purchase: Purchase;
}
export default function CartCard({ purchase }: CardCartProps) {
	const cartContext = useCart();
	return (
		<div className="flex h-fit w-full gap-2 border-b-[1px] border-b-gray-500 pb-4">
			<Image
				width={153}
				height={153}
				src={purchase.image}
				className="aspect-1 h-28 w-28 object-cover"
				alt={purchase.title}
			/>

			<div className="flex h-full w-full flex-col justify-between">
				<p className="text-lg font-medium leading-5">{purchase.title}</p>
				<p className="text-lg font-medium text-gray-500">
					Size: {purchase.variant.text}
				</p>
				<div className="flex w-full items-center justify-between">
					<p className="text-lg font-bold text-orange-600">
						{_price(purchase.price)}
					</p>

					<Button
						className="bg-gray-600"
						onClick={() => cartContext?.removePurchase(purchase.handle)}
					>
						Remove
					</Button>
				</div>
			</div>
		</div>
	);
}
