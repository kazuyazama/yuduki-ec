import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { useShoppingCart } from "use-shopping-cart";
import { createClient } from "microcms-js-sdk";

const inter = Inter({ subsets: ["latin"] });

const StripeHome: NextPage = ({ products }: any) => {
  console.log(products);

  const { checkoutSingleItem, addItem } = useShoppingCart();

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section>
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
          <header className="flex justify-between ">
            <div className="grow">
              <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
                Product Collection
              </h2>

              <p className="max-w-xl mt-4 text-gray-500">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
                praesentium cumque iure dicta incidunt est ipsam, officia dolor
                fugit natus?
              </p>
            </div>
          </header>

          <ul className="grid gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((item: any) => (
              <Link key={item.id} href={`item/${item.id}`}>
                <li>
                  <Image
                    src={item.images[0]}
                    alt={item.name}
                    width={750}
                    height={500}
                    className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                  />

                  <div className="relative pt-3 bg-white">
                    <h3 className=" text-gray-700 group-hover:underline group-hover:underline-offset-4">
                      {item.name}
                    </h3>

                    <p className="mt-5">
                      <span className="sr-only"> Regular Price </span>

                      {item.prices.map((price: any) => (
                        <>
                          <div
                            key={price.id}
                            className="tracking-wider text-gray-900 flex gap-5 items-center justify-around"
                          >
                            <h4 className=" text-xl text-red-500">
                              {price.unit_amount.toLocaleString("ja-JP", {
                                style: "currency",
                                currency: "JPY",
                              })}{" "}
                              {price.transform_quantity ? (
                                <small className="block text-xs ">
                                  ({price.transform_quantity.divide_by}
                                  アイテム毎)
                                </small>
                              ) : null}
                            </h4>

                            {/* <form action="/api/checkout_session" method="POST">
                            <input
                              type="hidden"
                              name="price"
                              value={price.id}
                            />
                            <input type="hidden" name="quantity" value={1} />
                            <button type="submit">いますぐ注文する</button>
                          </form> */}
                            <button
                              className="rounded-lg bg-yellow-500 h-10 px-3 py-2 text-sm font-medium text-white"
                              onClick={() =>
                                addItem({
                                  id: price.id,
                                  name: item.name,
                                  price: price.unit_amount,
                                  currency: price.currency,
                                  image: item.images[0],
                                })
                              }
                            >
                              カートに追加
                            </button>
                          </div>
                        </>
                      ))}
                    </p>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/products");
  const products = await res.json();

  // microCMS　SDKを利用して、商品データを取得する
  // const client = createClient({
  //   serviceDomain: 'yuduki',
  //   apiKey: process.env.MICROCMS_API_KEY!,
  // });
  // const { contents } = await client.get({ endpoint: 'products'  });

  return {
    props: {
      products,
      //  contents
    },
  };
};

export default StripeHome;
