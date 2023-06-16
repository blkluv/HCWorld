import { CheckCircleIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef } from "react";

interface ToastProps {
	message: string;
	show: boolean;
	setShow: React.Dispatch<boolean>;
	time?: number;
}
export default function Toast({
	message,
	setShow,
	show = true,
	time = 2000,
}: ToastProps) {
	const timeoutRef = useRef<null | number>();
	/* eslint-disable */
	useEffect(() => {
		if (timeoutRef.current != null) {
			clearTimeout(timeoutRef.current);
		}

		timeoutRef.current = window.setTimeout(() => {
			setShow(false);
		}, time);

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [show]);

	return (
		<div
			style={{
				transform: show ? "translate(-50%, 0)" : "translate(-50%, 200%)",
			}}
			className="fixed bottom-10 left-1/2 z-50 flex min-w-fit items-center justify-center gap-2 bg-brand-white px-5 py-2 text-center text-lg font-bold text-brand-black shadow-md shadow-brand-black transition-transform"
		>
			<CheckCircleIcon className="h-6 w-6 text-green-500" />
			<p>{message}</p>
		</div>
	);
}
