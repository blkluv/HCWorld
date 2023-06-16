import React, { ReactElement } from "react";
import BreadCrumbsSeparator from "./BreadCrumbsSeparator";
interface BreadCrumbsProps {
	children: ReactElement[];
	className?: string;
}
export default function BreadCrumbs({ className, children }: BreadCrumbsProps) {
	return (
		<div className={`flex items-center gap-2 text-gray-700 ${className}`}>
			{children.map((child, index) => {
				if (index == 0) return child;
				return (
					<React.Fragment key={`item<${index}>`}>
						<BreadCrumbsSeparator />
						{child}
					</React.Fragment>
				);
			})}
		</div>
	);
}
