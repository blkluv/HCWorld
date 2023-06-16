import Image from "next/image";
import React from "react";

export default function About() {
	return (
		<section id="about" className="px-14 pt-4">
			<h1 className="text-center text-4xl font-bold">About us</h1>
			<div className="mt-5 flex flex-col items-center gap-5">
				<p className="flex-[0_0_50%] text-xl">
					At Hoodie World, we understand that a hoodie is more than just a piece
					of clothing; it&apos;s a symbol of self-expression and personal style.
					That&apos;s why we curate our collection to cater to diverse tastes
					and preferences, ensuring that there&apos;s something for everyone.
				</p>

				<div className="relative grid h-full w-full flex-[0_0_50%] grid-cols-[repeat(3,33%)] grid-rows-1">
					<Image
						width={500}
						height={500}
						src="/images/about_image1.webp"
						className="h-full flex-[0_0_25%] object-cover"
						alt="A man with an orange hoodie in a snowy place"
					/>
					<Image
						width={500}
						height={500}
						src="/images/about_image2.webp"
						className="h-full flex-[0_0_25%] object-cover"
						alt="A man with a hoodie that says king"
					/>

					<Image
						width={500}
						height={500}
						src="/images/about_image3.webp"
						className="h-full flex-[0_0_25%] object-cover"
						alt="A man with a hoodie that says we come in peace"
					/>
				</div>
			</div>
		</section>
	);
}
