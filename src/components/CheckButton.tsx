import React, { ReactNode, ReactPropTypes } from "react";

interface CheckButtonProps extends React.HTMLProps<HTMLInputElement> {
	children: ReactNode;
	value: string;
	checked: boolean;
}
export default function CheckButton({
	children,
	value,
	checked,

	...props
}: CheckButtonProps) {
	const defaultClass =
		"cursor-pointer rounded-lg border-2 border-brand-black min-w-[3rem] px-3 py-1.5 text-base text-center font-medium justify-center items-center";
	const checkedClass = "border-orange-600 bg-orange-600 text-brand-white";
	return (
		<label className={`${defaultClass} ${checked ? checkedClass : ""}`}>
			<input
				className="hidden"
				type="checkbox"
				name=""
				id=""
				value={value}
				checked={checked}
				{...props}
			/>
			{children}
		</label>
	);
}
