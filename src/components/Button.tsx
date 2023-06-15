import React, { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	variant?: "normal" | "long";
	loading?: boolean;
}
export default function Button({
	children,
	variant = "normal",
	className,
	loading = false,
	...props
}: ButtonProps) {
	const defaultClass =
		"text-brand-white font-medium flex relative overflow-hidden button";

	const sizeClass =
		variant == "normal"
			? "px-10 py-2 w-fit h-fit"
			: "grid place-content-center w-full h-13";
	return (
		<button className={`${defaultClass} ${sizeClass} ${className}`} {...props}>
			{loading ? (
				<svg
					className="-ml-1 mr-3 h-6 w-6 animate-spin text-white"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						className="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						strokeWidth="4"
					></circle>
					<path
						className="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
			) : (
				children
			)}
		</button>
	);
}
