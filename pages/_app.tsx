import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { CartProvider, DebugCart } from "use-shopping-cart";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
     <CartProvider
      mode="payment"
      cartMode="client-only"
      stripe={`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_API_KEY}`}
      currency="JPY"
      successUrl="http://localhost:3000/success"
      cancelUrl="http://localhost:3000/stripe">
      <Header />
      <Component {...pageProps} />
      {process.env.NODE_ENV === "development" && ( //開発環境の時だけデバックカートを表示
      <div style={{
        width: '30%',
        position: 'fixed',
        bottom: 50,
        right: 50,
        overflowX: 'scroll',
        padding: 20,
        backgroundColor: '#fefefe',
        boxShadow: '0 0 8px gray',
        opacity:0.3,
        zIndex:-1
      }}>
       <DebugCart style={{}}/>
      </div>
      ) }
      <Footer />
      </CartProvider>
    </>
  );
}
