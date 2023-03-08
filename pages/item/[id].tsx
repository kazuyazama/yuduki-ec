import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
import { ReadSingleDataType } from "@/utils/types";
import Link from "next/link";
import { Options, Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "react-image-gallery/styles/css/image-gallery.css";
import { createRef, ReactNode, useEffect } from "react";
import { createClient } from "microcms-js-sdk";
import Stripe from "stripe";
import ImageGallery from "react-image-gallery";
import { useShoppingCart } from "use-shopping-cart";

const inter = Inter({ subsets: ["latin"] });

// export const getServerSideProps: GetServerSideProps<
//   ReadSingleDataType
// > = async ({ params }) => {
//   console.log(params);
//   const res = await fetch(`http://localhost:3000/api/item/${params?.id}`);
//   const singleItem = await res.json();
//   return {
//     props: singleItem,
//   };
// };

// const Product = ({ products }) => {
//   console.log(products);
//   return (
//     <div>
//       {products.map((product) => {
//         return (
//           <section key={product.id}>
//             <h2>{product.name}</h2>
//             {product.price ? (
//               <dl>
//                 <dt>価格</dt>
//                 <dd>{product.price.unit_amount}</dd>
//               </dl>
//             ) : null}
//             <div
//               dangerouslySetInnerHTML={{
//                 __html: product.description,
//               }}
//             />
//             {product.image.map((img) => (
//               <>
//               <img src={img.image1.url} alt="" />
//               {img.image2 && (
//                 <img src={img.image2.url} alt="" />
//               )}
//               </>
//             ))}

//           </section>
//         );
//       })}

//       {/* {price.map(() => (
//         <div>{price.}</div>
//       ))} */}
//     </div>
//   );
// };

// export const getServerSideProps: GetServerSideProps<
//   ReadSingleDataType
// > = async (context) => {

//   const id = context?.params?.id

//   // const res = await fetch(`http://localhost:3000/api/item/${params?.id}`);
//   // const singleItem = await res.json();

//   // microCMS　SDKを利用して、商品データを取得する
//   const client = createClient({
//     serviceDomain: "yuduki",
//     apiKey: process.env.MICROCMS_API_KEY!,
//   });
//   const { contents } = await client.get({ endpoint: "products" ,contentId:"prod_MnYXsCQot4ZqH4"});
//   const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
//     apiVersion: "2022-11-15", // StripeのAPIバージョンを指定
//     maxNetworkRetries: 3, // ネットワークエラーでStripe API呼び出しが失敗した時のリトライ回数を指定
//   });
//   /**
//    * Stripe　SDKを利用して、料金データを取得し、マージする
//    **/
//   const products = await Promise.all(
//     contents.map(async (content) => {
//       try {
//         //stripeのretrieveでmicrocmsで設定したAPIスキーマを取得
//         const product = await stripe.products.retrieve(
//           content.stripe_product_id
//         );

//         const price = await stripe.prices.retrieve(content.stripe_price_id);

//         return {
//           ...content, //スプレット構文がないと反映されない
//           product: {
//             description: product.description,
//             name: product.name,
//             image: product.images,
//             unit_label: product.unit_label,
//           },
//           price: {
//             unit_amount: price.unit_amount,
//             currency: price.currency,
//           },
//         };
//       } catch (e) {
//         return content;
//       }
//     })
//   );

//   return {
//     props: { products },
//   };
// };

// // export default ReadSingleItem;
// export default Product;

// const Product = ({ products }) => {
//     console.log(products);
//     return (
//       <div>
//         {products.map((product) => {
//           return (
//             <section key={product.id}>
//               <h2>{product.name}</h2>
//               {product.price ? (
//                 <dl>
//                   <dt>価格</dt>
//                   <dd>{product.price.unit_amount}</dd>
//                 </dl>
//               ) : null}
//               <div
//                 dangerouslySetInnerHTML={{
//                   __html: product.description,
//                 }}
//               />
//               {product.image.map((img) => (
//                 <>
//                 <img src={img.image1.url} alt="" />
//                 {img.image2 && (
//                   <img src={img.image2.url} alt="" />
//                 )}
//                 </>
//               ))}

//             </section>
//           );
//         })}

//         {/* {price.map(() => (
//           <div>{price.}</div>
//         ))} */}
//       </div>
//     );
//   };

// export const getServerSideProps: GetServerSideProps<
//   ReadSingleDataType
// > = async ({ params }) => {
//   console.log(params);
//   const res = await fetch(`http://localhost:3000/api/item/${params?.id}`);
//   const singleItem = await res.json();
//   return {
//     props: singleItem,
//   };
// };

const Product = ({ product, price }) => {
  console.log(product);
  console.log(price);

  const { checkoutSingleItem, addItem } = useShoppingCart();

  // const images = [
  //   {
  //     original: "https://picsum.photos/id/1018/1000/600/",
  //     thumbnail: "https://picsum.photos/id/1018/250/150/",
  //   },
  //   {
  //     original: "https://picsum.photos/id/1015/1000/600/",
  //     thumbnail: "https://picsum.photos/id/1015/250/150/",
  //   },
  //   {
  //     original: "https://picsum.photos/id/1019/1000/600/",
  //     thumbnail: "https://picsum.photos/id/1019/250/150/",
  //   },
  // ];

  return (
    <div>
      <section>
        <div className="relative mx-auto max-w-screen-xl px-4 py-8">
          <div>
            <h1 className="text-2xl font-bold lg:text-3xl">{product.name}</h1>

            <p className="mt-1 text-sm text-gray-500">SKU: #012345</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-4 lg:items-start">
            <div className="lg:col-span-3">
              <div className="relative mt-10">
                <div className=" w-full object-cover ">
                  {/* <ImageGallery
                    showPlayButton={false}
                    showNav={false}
                    items={images}
                  /> */}

                  <Image
                    alt={product.name}
                    src={product.images[0]}
                    width={800}
                    height={400}
                  />
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-0">
              <form
                action="/api/checkout_session"
                method="POST"
                className="space-y-4 lg:pt-8"
              >
                <fieldset>
                  <legend className="text-lg font-bold">Color</legend>

                  <div className="mt-2 flex flex-wrap gap-1">
                    <label htmlFor="color_green" className="cursor-pointer">
                      <input
                        type="radio"
                        id="color_green"
                        name="color"
                        className="peer sr-only"
                        checked
                      />

                      <span className="block h-6 w-6 rounded-full border border-gray-200 bg-green-700 ring-1 ring-transparent ring-offset-1 peer-checked:ring-gray-300"></span>
                    </label>

                    <label htmlFor="color_blue" className="cursor-pointer">
                      <input
                        type="radio"
                        id="color_blue"
                        name="color"
                        className="peer sr-only"
                      />

                      <span className="block h-6 w-6 rounded-full border border-gray-200 bg-blue-700 ring-1 ring-transparent ring-offset-1 peer-checked:ring-gray-300"></span>
                    </label>

                    <label htmlFor="color_pink" className="cursor-pointer">
                      <input
                        type="radio"
                        id="color_pink"
                        name="color"
                        className="peer sr-only"
                      />

                      <span className="block h-6 w-6 rounded-full border border-gray-200 bg-pink-700 ring-1 ring-transparent ring-offset-1 peer-checked:ring-gray-300"></span>
                    </label>

                    <label htmlFor="color_red" className="cursor-pointer">
                      <input
                        type="radio"
                        id="color_red"
                        name="color"
                        className="peer sr-only"
                      />

                      <span className="block h-6 w-6 rounded-full border border-gray-200 bg-red-700 ring-1 ring-transparent ring-offset-1 peer-checked:ring-gray-300"></span>
                    </label>

                    <label htmlFor="color_indigo" className="cursor-pointer">
                      <input
                        type="radio"
                        id="color_indigo"
                        name="color"
                        className="peer sr-only"
                      />

                      <span className="block h-6 w-6 rounded-full border border-gray-200 bg-indigo-700 ring-1 ring-transparent ring-offset-1 peer-checked:ring-gray-300"></span>
                    </label>
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="text-lg font-bold">Material</legend>

                  <div className="mt-2 flex flex-wrap gap-1">
                    <label htmlFor="material_cotton" className="cursor-pointer">
                      <input
                        type="radio"
                        id="material_cotton"
                        name="material"
                        className="peer sr-only"
                        checked
                      />

                      <span className="block rounded-full border border-gray-200 px-3 py-1 text-xs peer-checked:bg-gray-100">
                        Cotton
                      </span>
                    </label>

                    <label htmlFor="material_wool" className="cursor-pointer">
                      <input
                        type="radio"
                        id="material_wool"
                        name="material"
                        className="peer sr-only"
                        checked
                      />

                      <span className="block rounded-full border border-gray-200 px-3 py-1 text-xs peer-checked:bg-gray-100">
                        Wool
                      </span>
                    </label>
                  </div>
                </fieldset>

                <div className="rounded border bg-gray-100 p-4">
                  <p className="text-sm">
                    <span className="block">
                      {" "}
                      Pay as low as $3/mo with 0% APR.{" "}
                    </span>

                    <a href="" className="mt-1 inline-block underline">
                      {" "}
                      Find out more{" "}
                    </a>
                  </p>
                </div>

                <div>
                  <p className="text-xl font-bold">
                    ￥{Number(price.unit_amount_decimal).toLocaleString()}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    addItem({
                      id: price.id,
                      name: product.name,
                      price: price.unit_amount,
                      currency: price.currency,
                      image: product.images[0],
                    })
                  }
                  className="w-full rounded bg-red-700 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white"
                >
                  カートに入れる
                </button>

                <input type="hidden" name="price" value={price.id} />
                <input type="hidden" name="quantity" value={1} />
                <button
                  type="submit"
                  className="w-full rounded border border-gray-300 bg-gray-100 px-6 py-3 text-sm font-bold uppercase tracking-wide"
                >
                  今すぐ注文する
                </button>
              </form>
            </div>

            <div className="lg:col-span-3">
              <div className="prose max-w-none">
                <p>{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context?.query?.id;

  const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
    apiVersion: "2022-11-15", // StripeのAPIバージョンを指定
    maxNetworkRetries: 3, // ネットワークエラーでStripe API呼び出しが失敗した時のリトライ回数を指定
  });

  const product = await stripe.products.retrieve(id as string); //商品情報取得

  const { default_price } = product; //商品情報のデフォルトブライスを分割代入で取得
  const price = await stripe.prices.retrieve(default_price as string); //デフォルトブライスから値段の情報取得

  // microCMS　SDKを利用して、商品データを取得する
  const client = createClient({
    serviceDomain: "yuduki",
    apiKey: process.env.MICROCMS_API_KEY!,
  });

  /* 
  microCMSでproduct_idを指定して紐付けた画像をmicroCMSからとってくる
  */

  // const { contents } = await client.get({ endpoint: "products" });
  // const images = await Promise.all(
  //   contents.map(async (content) => {
  //     try {
  //       return {
  //         images: product.id === content.stripe_product_id && content.image, //microCMSに登録した商品idとstripeの商品IDが同じだったら

  //         // images: content.image, //microCMSのデータを展開
  //       };
  //     } catch (e) {
  //       return content;
  //     }
  //   })
  // );

  return {
    props: {
      product,
      price,
      // images,
    },
  };
};

export default Product;
