import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //POST以外を許可しない
  if (req.method?.toLocaleLowerCase() !== "post") {
    return res.status(405).end();
  }
  try {
    const { price, quantity, items } = req.body
    const lineItems = items ? items.map(item => ({
        price: item.id,
        quantity: item.quantity,
        adjustable_quantity: {
            enabled: true,
        }
    })): [{
        price,
        quantity,
        adjustable_quantity: {
            enabled: true,
            minimum: 1,
            maximum: 10,
        }
    }]
    const stripe = new Stripe(`${process.env.STRIPE_API_KEY}`, {
      apiVersion: "2022-11-15",
      maxNetworkRetries: 3,
    });
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/stripe",
    });
    if (!items) return res.redirect(301, session.url!)
    res.status(200).json({
        url: session.url
    })
  } catch (err) {
    return res.status(400).json({ message: "アイテム所得失敗" });
  }
}
