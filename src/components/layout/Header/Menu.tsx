import { ArrowDownIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";

interface MenuProps {
	title: string;
	children: ReactElement | ReactElement[];
}
export default function Menu({ children, title }: MenuProps) {
	const [expanded, setExpanded] = useState(false);
	const router = useRouter();

	function onRouteChange() {
		setExpanded(false);
	}
	useEffect(() => {
		router.events.on("routeChangeComplete", onRouteChange);

		return () => router.events.off("routeChangeComplete", onRouteChange);
	}, [router.events]);
	return (
		<div className="relative">
			<button
				className="flex items-center gap-1 font-bold"
				onClick={() => setExpanded(!expanded)}
			>
				<p>{title}</p>
				<ChevronDownIcon className="h-4 w-4" strokeWidth={2} />
			</button>

			<div
				className={`absolute top-8 z-30 flex flex-col overflow-hidden rounded-lg bg-brand-white shadow-md shadow-gray-700 ${
					expanded ? "animate-fade-down" : "animate-fade-out"
				}`}
			>
				{children}
			</div>
		</div>
	);
}
