import Link from "next/link";
import React, { ReactElement, ReactNode } from "react";

interface NavlinkProps {
	children: ReactNode;
	href: string;
}
export default function Navlink({ children, href }: NavlinkProps) {
	return <Link className="font-semibold text-base" href={href}>{children}</Link>;
}
