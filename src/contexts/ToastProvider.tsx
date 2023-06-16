import Toast from "@/components/Toast";
import { ReactElement, createContext, useContext, useState } from "react";

interface ToastContextType {
	fire: (message: string) => void;
}
const ToastContext = createContext<ToastContextType | null>(null);

interface ToastProviderProps {
	children: ReactElement | ReactElement[];
}

export function useToast() {
	return useContext(ToastContext);
}
export default function ToastProvider({ children }: ToastProviderProps) {
	const [showToast, setShowToast] = useState(false);
	const [message, setMessage] = useState("");

	function fire(message: string) {
		setMessage(message);
		setShowToast(true);
	}

	return (
		<ToastContext.Provider value={{ fire }}>
			<Toast setShow={setShowToast} show={showToast} message={message} />
			{children}
		</ToastContext.Provider>
	);
}
