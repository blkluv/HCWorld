import { Purchase } from "@/lib/types";
import React, {
	ReactElement,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import { useLocalStorage } from "usehooks-ts";

type ICartContext = {
	purchases: Purchase[];
	addPurchase: (purchase: Purchase) => void;
	removePurchase: (id: string) => void;
};
const cartContext = createContext<ICartContext | null>(null);

export function useCart() {
	return useContext(cartContext);
}
export default function CartProvider({ children }: { children: ReactElement }) {
	const [localPurchases, setLocalPurchases] = useLocalStorage<Purchase[]>(
		"hw-purchases",
		[]
	);
	const [purchases, setPurchases] = useState<Purchase[]>([]);

	useEffect(() => {
		setPurchases(localPurchases);
	}, [localPurchases]);
	function addPurchase(purchase: Purchase) {
		setLocalPurchases((latest) => [...latest, purchase]);
	}
	function removePurchase(id: string) {
		setLocalPurchases((latest) =>
			latest.filter((purchase) => purchase.id !== id)
		);
	}

	return (
		<cartContext.Provider value={{ purchases, addPurchase, removePurchase }}>
			{children}
		</cartContext.Provider>
	);
}
