import CartProvider from "@/contexts/CartProvider";
import ToastProvider from "@/contexts/ToastProvider";
import Layout from "@/components/layout/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ToastProvider>
			<CartProvider>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</CartProvider>
		</ToastProvider>
	);
}
