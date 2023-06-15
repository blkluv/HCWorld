export function generateProduct() {
	function shuffle(array: any[]) {
		return array[Math.floor(Math.random() * array.length)];
	}
	const images = [
		"https://images.pexels.com/photos/2932748/pexels-photo-2932748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
		"https://images.pexels.com/photos/3210714/pexels-photo-3210714.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
		"https://images.pexels.com/photos/960837/pexels-photo-960837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
		"https://images.pexels.com/photos/2048434/pexels-photo-2048434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
	];

	const titles = [
		"Casual coolness",
		"Yellow Feeling",
		"Broken Heart Hoodie",
		"New York Aesthetic",
	];

	const prices = [30, 24, 22, 32];

	const tags = [
		"vivid",
		"monochrome",
		"lettering",
		"icons",
		"bold",
		"awesome",
		"meaningful",
	];
	return {
		image: shuffle(images),
		title: shuffle(titles),
		tags: [shuffle(tags), shuffle(tags)],
		price: shuffle(prices),
		handle: "",
	};
}

export function _price(price: number) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(price);
}
