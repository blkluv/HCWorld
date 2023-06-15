import Link from "next/link";
import React, { ReactNode } from "react";

interface MenuItemProps {
	children: ReactNode;
	href: string;
}
export default function MenuItem({ children, href }: MenuItemProps) {
	return (
		<Link
			className="w-full px-2 py-3 text-base font-medium hover:bg-gray-100"
			href={href}
		>
			{children}
		</Link>
	);
}
