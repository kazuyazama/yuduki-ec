import { useShoppingCart } from "use-shopping-cart";
import { IconDiscount2, IconTrash} from "@tabler/icons-react"

const Cart = () => {
  const { cartDetails, removeItem } = useShoppingCart();

  return (
    <div
      className="w-screen max-w-sm border border-gray-600 bg-gray-100 p-4 pt-4 sm:p-6 lg:p-8"
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
    >
      <button className="relative ml-auto -mr-4 block text-gray-600 transition hover:scale-110">
        <span className="sr-only">Close cart</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="mt-6 space-y-6">
        <ul className="space-y-4">
          {Object.entries(cartDetails).map(([priceId, detail]) => {
            return (
              <li key={priceId} className="flex items-center gap-4">
                <img
                  src={detail.image}
                  alt={detail.name}
                  className="h-16 w-16 rounded object-cover"
                />

                <div>
                  <h3 className="text-sm text-gray-900">{detail.name}</h3>

                  <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                    <div>
                      <dt className="inline">値段</dt>
                      <dd className="inline"> {detail.formattedValue}</dd>
                    </div>

                    <div>
                      <dt className="inline">Color:</dt>
                      <dd className="inline">White</dd>
                    </div>
                  </dl>
                </div>

                <div className="flex flex-1 items-center justify-end gap-2">
                  <form>
                    <label htmlFor="Line1Qty" className="sr-only">
                      {" "}
                      Quantity{" "}
                    </label>

                    <input
                      type="number"
                      min="1"
                      value={detail.quantity}
                      id="Line1Qty"
                      className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </form>

                  <button
                    onClick={() => removeItem(priceId)}
                    className="text-gray-600 transition hover:text-red-600"
                  >
                    <span className="sr-only">Remove item</span>

                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg> */}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="space-y-4 text-center">
          <a
            href="#"
            className="block rounded border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400"
          >
            View my cart (2)
          </a>

          <a
            href="#"
            className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
          >
            Checkout
          </a>

          <a
            href="#"
            className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
          >
            Continue shopping
          </a>
        </div>
      </div>
    </div>
  );
};

export default Cart;

export const CartDetail = () => {
  const {
    cartDetails,
    removeItem,
    formattedTotalPrice,
    clearCart,
    redirectToCheckout,
    cartCount,
  } = useShoppingCart();
  console.log(cartDetails);
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <header className="text-center">
            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Your Cart
            </h1>
          </header>

          <div className="mt-8">
            <ul className="space-y-4">
              {Object.entries(cartDetails).map(([priceId, detail]) => {
                return (
                  <li key={priceId} className="flex items-center gap-4">
                    <img
                      src={detail.image}
                      alt={detail.name}
                      className="h-16 w-16 rounded object-cover"
                    />

                    <div>
                      <h3 className="text-sm text-gray-900">{detail.name}</h3>

                      <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                        <div>
                          <dt className="inline">価格</dt>
                          <dd className="inline"> {detail.formattedValue}</dd>
                        </div>

                        <div>
                          <dt className="inline">Color:</dt>
                          <dd className="inline">White</dd>
                        </div>
                      </dl>
                    </div>

                    <div className="flex flex-1 items-center justify-end gap-5">
                      <form>
                        <label htmlFor="Line1Qty" className="sr-only">
                          {" "}
                          Quantity{" "}
                        </label>

                        <input
                          type="number"
                          min="1"
                          value={detail.quantity}
                          id="Line1Qty"
                          className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </form>

                      <button
                        onClick={() => removeItem(priceId)}
                        className="text-gray-600 transition hover:text-red-600"
                      >
                        <span className="sr-only">Remove item</span>

                        <IconTrash />
                   
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
              <div className="w-screen max-w-lg space-y-4">
                <dl className="space-y-0.5 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <dt>Subtotal</dt>
                    <dd>£250</dd>
                  </div>

                  <div className="flex justify-between">
                    <dt>VAT</dt>
                    <dd>£25</dd>
                  </div>

                  <div className="flex justify-between">
                    <dt>Discount</dt>
                    <dd>-£20</dd>
                  </div>

                  <div className="flex justify-between !text-base font-medium">
                    <dt>Total</dt>
                    <dd>{formattedTotalPrice}</dd>
                  </div>
                </dl>
{/* 
                <div className="flex justify-end">
                  <span className="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700">
                   <IconDiscount2 size={14} />

                    <p className="whitespace-nowrap text-xs">
                      2 Discounts Applied
                    </p>
                  </span>
                </div> */}

                <div className="flex justify-end gap-3">
                  <button
                    disabled={cartCount < 1}
                    onClick={async () => {
                      try {
                        // const result = await redirectToCheckout()
                        // if (result.error) throw new Error(result.error)
                        const session = await fetch(
                          "http://localhost:3000/api/checkout_session",
                          {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              items: Object.entries(cartDetails).map(
                                ([_id, detail]) => ({
                                  id: detail.id,
                                  quantity: detail.quantity,
                                })
                              ),
                            }),
                          }
                        );
                        const jsonData = await session.json();
                        window.open(jsonData.url);
                      } catch (err) {
                        alert("問題が発生しました。初めからやり直してください");
                      }
                    }}
                    className="block rounded bg-yellow-400 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                  >
                    Checkout
                  </button>
                  <button
                    onClick={() => clearCart()}
                    className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                  >
                    カートを空にする
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
