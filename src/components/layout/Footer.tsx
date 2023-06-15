import Link from "next/link";
import React from "react";

export default function Footer() {
	return (
		<footer className="flex justify-between bg-orange-600 px-14 py-5">
			<p className="text-brand-white">@2023 Hoodie World</p>
			<p className="text-brand-white">
				All the images used are from{" "}
				<a
					className="font-bold underline"
					target="_blank"
					href="https://www.pexels.com/"
				>
					Pexels
				</a>
			</p>
			<div className="flex gap-4 text-base font-semibold text-brand-white">
				<Link href="/">Home</Link>
				<Link href="/hoodies">Hoodies</Link>
				<Link href="/about">About</Link>
			</div>
		</footer>
	);
}
