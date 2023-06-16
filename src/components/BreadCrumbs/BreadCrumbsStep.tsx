import Link from "next/link";
import React, { ReactNode } from "react";
interface BreadCrumbsStepProps {
	children: ReactNode;
	href?: string;
}
export default function BreadCrumbsStep({
	children,
	href,
}: BreadCrumbsStepProps) {
	const breadCrumbsClass = "last:font-medium hover:text-brand-black";
	if (href == undefined) {
		return <p className={breadCrumbsClass}>{children}</p>;
	}
	return (
		<Link href={href} className={breadCrumbsClass}>
			{children}
		</Link>
	);
}
