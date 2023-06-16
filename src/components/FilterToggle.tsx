import { Filter } from "@/lib/enums";
import {
	ArrowDownCircleIcon,
	ArrowUpCircleIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect } from "react";

interface FilterToggleProps {
	tag: string;
	value: Filter;
	setValue: React.Dispatch<Filter>;
}
export default function FilterToggle({
	tag,
	value,
	setValue,
}: FilterToggleProps) {
	function toggle(filter: Filter) {
		if (value == filter) {
			return;
		}
		setValue(filter);
	}

	return (
		<div className="flex gap-4 rounded-lg bg-gray-200 px-6 py-3">
			<p className="font-medium">{tag}</p>
			<span className="h-full w-px bg-gray-400"></span>
			<button
				onClick={() => toggle(Filter.ASC)}
				className={`flex items-center gap-1 ${
					value == Filter.ASC ? "text-orange-600" : ""
				}`}
			>
				<p>ASC</p> <ArrowUpCircleIcon className="h-5 w-5" />
			</button>
			<button
				onClick={() => toggle(Filter.DESC)}
				className={`flex items-center gap-1 ${
					value == Filter.DESC ? "text-orange-600" : ""
				}`}
			>
				<p>DESC</p> <ArrowDownCircleIcon className="h-5 w-5" />
			</button>
		</div>
	);
}
