import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    //GET以外のリクエストを許可しない
  if (req.method?.toLocaleLowerCase() !== "get") {
    return res.status(405).end();
  }
  const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
    apiVersion: "2022-11-15", // StripeのAPIバージョンを指定
    maxNetworkRetries: 3, // ネットワークエラーでStripe API呼び出しが失敗した時のリトライ回数を指定
  });
  const products = await stripe.products.list(); //listで商品データを全部取得
  if(!products.data || products.data.length < 1) {
    return res.status(200).json([])
  } 
  const response = await Promise.all(products.data.map(async(product,index) => {
    const prices = await stripe.prices.list({
        product:product.id
    })
    return {
        id: product.id,
        description: product.description,
        name: product.name,
        images: product.images,
        unit_label: product.unit_label,
        prices: prices.data.map(price => {
            return {
                id: price.id,
                currency: price.currency,
                transform_quantity: price.transform_quantity,
                unit_amount: price.unit_amount,
            }
        })
    }
}))
  res.status(200).json(response);　//jsonデータで返す
}
