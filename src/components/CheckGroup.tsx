import React, { ReactElement, useState } from "react";
import CheckButton from "./CheckButton";

export interface CheckItem {
	text: string;
	value?: string;
}

interface CheckGroupProps {
	items: CheckItem[];
	value: string;
	onChange: (val: string) => void;
}

export default function CheckGroup({
	items,
	value,
	onChange,
}: CheckGroupProps) {
	const onValueChange: React.FormEventHandler<HTMLInputElement> = (event) => {
		onChange(event.currentTarget.value);
	};

	let nullCheckItem: CheckItem = {
		text: "--",
		value: " ",
	};
	return (
		<fieldset className="flex gap-2">
			{[nullCheckItem, ...items].map((item) => {
				return (
					<CheckButton
						key={item.value}
						checked={value == item.value}
						value={item.value || item.text}
						onChange={onValueChange}
					>
						{item.text}
					</CheckButton>
				);
			})}
		</fieldset>
	);
}
