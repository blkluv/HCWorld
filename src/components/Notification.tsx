import React, { useState } from "react";
import Button from "./Button";

export default function Notification() {
	const [showNotification, setShowNotification] = useState(true);
	return (
		<>
			{showNotification && (
				<div className="fixed bottom-5 right-5 z-30 flex h-56 w-96 flex-col items-center justify-center rounded-md bg-gray-100 px-3 py-6 text-center text-base shadow-xl shadow-gray-700">
					<p>This website is built with nextjs and shopify storefront api.</p>
					<p>
						This is <span className="font-bold">NOT</span> a real store, thus
						the payments are disabled.
					</p>
					<p>
						Go ahead and check out the{" "}
						<a
							href="https://github.com/OasuMainLine/HoodiesWorld"
							target="_blank"
							className="text-blue-500 underline"
						>
					
							Source code
						</a>
					</p>
					<Button
						className="mt-2 bg-indigo-600"
						onClick={() => setShowNotification(false)}
					>
						Understood!
					</Button>
				</div>
			)}
		</>
	);
}
