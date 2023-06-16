import { Rubik } from "next/font/google";
import Head from "next/head";
import React, { ReactElement, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import CartPopover from "./Cart/CartPopover";
import Notification from "../Notification";

interface LayoutProps {
	children: ReactElement[] | ReactElement;
}

const rubik = Rubik({
	subsets: ["latin", "latin-ext"],
	weight: ["300", "400", "500", "600", "700", "800"],
});
export default function Layout({ children }: LayoutProps) {
	const [showCart, setShowCart] = useState(false);
	return (
		<div
			className={`${rubik.className} grid grid-cols-1 grid-rows-[max-content_minmax(1fr_max_content)_max-content] bg-brand-white text-brand-black`}
		>
			<Head>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/favicons/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicons/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicons/favicon-16x16.png"
				/>
				<link rel="manifest" href="/favicons/site.webmanifest" />
			</Head>
			<Header setShowCart={setShowCart} />
			<CartPopover show={showCart} setShow={setShowCart} />
			<Notification />
			<main id="content" className="my-10 min-h-screen w-full">
				{children}
			</main>
			<Footer />
		</div>
	);
}
