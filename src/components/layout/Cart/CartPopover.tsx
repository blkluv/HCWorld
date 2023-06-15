import { useCart } from "@/Context/CartProvider";
import React, { useState } from "react";
import CartCard from "./CartCard";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { _price } from "@/lib/client";
import Button from "@/components/Button";
import { useToast } from "@/Context/ToastProvider";

interface CartPopoverProps {
	show: boolean;
	setShow: (show: boolean) => void;
}
export default function CartPopover({ show, setShow }: CartPopoverProps) {
	const cartContext = useCart();
	const ToastContext = useToast();
	const [loading, setLoading] = useState(false);
	const total =
		cartContext && cartContext.purchases.length > 0
			? cartContext.purchases.reduce(
					(acc, current) => acc + parseFloat(current.price.toString()),
					0
			  )
			: 0;

	async function checkout() {
		setLoading(true);

		if (cartContext && cartContext.purchases.length > 0) {
			const variants = cartContext.purchases.map(
				(purchase) => purchase.variant.id
			);
			const res = await fetch("/api/checkout", {
				method: "POST",
				body: JSON.stringify({ variants }),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (res.ok) {
				const { webUrl, message } = (await res.json()) as {
					webUrl: string;
					message: string;
				};
				if (ToastContext) {
					ToastContext.fire("Redirecting to checkout...");
				}
				window.location.href = webUrl;
			}
		}
		setLoading(false);
	}
	return (
		<>
			<div
				className="fixed left-0 top-0 z-40 h-screen w-screen bg-black bg-opacity-70 transition-opacity"
				onClick={() => setShow(false)}
				style={{
					opacity: show ? 1 : 0,
					pointerEvents: show ? "all" : "none",
				}}
			></div>

			<div
				className="duration-400 fixed right-0 top-0 z-50 h-screen w-1/3 bg-brand-white px-5 pt-4 transition-transform ease-in-out"
				style={{
					transform: show ? "translateX(0)" : "translateX(100%)",
				}}
			>
				<div className="flex w-full items-center justify-between">
					<p className="text-lg font-bold">Shopping Cart</p>

					<XMarkIcon
						className="h-7 w-7 cursor-pointer font-bold"
						onClick={() => setShow(false)}
					/>
				</div>

				<div className="mt-8 flex h-3/5 w-full flex-col items-center gap-2 overflow-y-auto">
					{cartContext && cartContext.purchases.length > 0 ? (
						cartContext.purchases.map((purchase) => {
							return <CartCard key={purchase.id} purchase={purchase} />;
						})
					) : (
						<p className="my-auto block text-center text-lg font-bold text-gray-800">
							No hoodies yet
						</p>
					)}
				</div>

				{cartContext && cartContext.purchases.length > 0 && (
					<div className="">
						<div className="mb-7 flex w-full justify-between">
							<p className="text-xl font-bold">Subtotal:</p>
							<p className="text-xl font-bold">{_price(total)}</p>
						</div>
						<div className="flex w-full flex-col items-center gap-4">
							<Button
								className="rounded-lg bg-orange-600"
								variant="long"
								onClick={checkout}
								loading={loading}
								disabled={loading}
							>
								Continue to checkout
							</Button>
							<Button
								className="w-2/3 rounded-lg bg-indigo-600"
								variant="long"
								onClick={() => setShow(false)}
							>
								Keep shopping
							</Button>
						</div>
					</div>
				)}
			</div>
		</>
	);
}
