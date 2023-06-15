import Image from "next/image";
import React from "react";
import Navlink from "./Navlink";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useCart } from "@/Context/CartProvider";
import Menu from "./Menu";
import MenuItem from "./MenuItem";

interface HeaderProps {
	setShowCart: React.Dispatch<boolean>;
}
export default function Header({ setShowCart }: HeaderProps) {
	const cartContext = useCart();
	return (
		<header className="flex w-full flex-col">
			<div className="flex items-center justify-between px-14 py-6">
				<Link href="/" className="h-13 w-13">
					<Image
						width={130}
						height={130}
						src="/logo.png"
						alt="Hoodies World logo"
					/>
				</Link>
				<nav className="flex gap-4">
					<Navlink href="/">Home</Navlink>
					<Navlink href="/hoodies">Hoodies</Navlink>
					<Menu title="Collections">
						<MenuItem href="">Vivid</MenuItem>
						<MenuItem href="">Bold</MenuItem>
						<MenuItem href="">Monochrome</MenuItem>
					</Menu>
					<Navlink href="/about">About</Navlink>
				</nav>
				<div
					className="relative h-fit w-fit cursor-pointer"
					onClick={() => setShowCart(true)}
				>
					<ShoppingBagIcon className="h-8 w-8" />
					<span className="absolute -bottom-2 -right-1 grid h-5 w-5 place-content-center rounded-full bg-red-600 text-xs text-brand-white">
						{cartContext?.purchases.length || 0}
					</span>
				</div>
			</div>
			<span className="before:contents-[''] h-px w-full px-14 before:block before:h-full before:w-full before:bg-gray-600"></span>
		</header>
	);
}
