import React, { ReactElement } from "react";

interface ProductRowProps {
	title?: string;
	children: ReactElement | ReactElement[];
}
export default function ProductRow({ title, children }: ProductRowProps) {
	return (
		<div className="flex flex-col gap-3 px-14">
			{title && (
				<>
					<h2 className="text-3xl font-bold">{title}</h2>
					<span className="block h-px w-full bg-gray-300"></span>
				</>
			)}
			<div className="grid grid-cols-4 grid-rows-1">{children}</div>
		</div>
	);
}
