// import connectDB from "@/utils/database";
// import { ItemModel } from "@/utils/schemeModels";
// import type { NextApiRequest, NextApiResponse } from "next";
// import auth from "../../../utils/auth";
// import type {
//   ResReadSingleType,
//   savedItemDataType,
// } from "../../../utils/types";

// async function readSingle(
//   req: NextApiRequest,
//   res: NextApiResponse<ResReadSingleType>
// ) {
//   try {
//     await connectDB();
//     console.log(req.query.id);
//     //findbyidで一つだけ持ってくる  query
//     const singleItem: savedItemDataType | null = await ItemModel.findById(
//       req.query.id
//     );
//     if (!singleItem)
//       return res
//         .status(400)
//         .json({ message: "アイテムが存在していため読み取り失敗" });
//     return res
//       .status(200)
//       .json({ message: "取得に成功しました", singleItem: singleItem });
//   } catch (error) {
//     return res.status(400).json({ message: "取得できませんでした" });
//   }
// }

// export default auth(readSingle);

// import connectDB from "@/utils/database";
// import { ItemModel } from "@/utils/schemeModels";
// import type { NextApiRequest, NextApiResponse } from "next";
// import Stripe from "stripe";
// import auth from "../../../utils/auth";
// import type {
//   ResReadSingleType,
//   savedItemDataType,
// } from "../../../utils/types";

// async function readSingle(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method?.toLocaleLowerCase() !== "post") {
//     return res.status(405).end();
//   }
//   try {
//     const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
//       apiVersion: "2022-11-15", // StripeのAPIバージョンを指定
//       maxNetworkRetries: 3, // ネットワークエラーでStripe API呼び出しが失敗した時のリトライ回数を指定
//     });
//     // JSON リクエストボディをパースする
//     const { contents } = req.body;
//     const microCMSValue = contents?.new?.publishValue;

//     // 下書きの編集中は何もせずにスキップ
//     // see: https://document.microcms.io/manual/webhook-setting#h3e9a323374
//     if (!microCMSValue) {
//       return res.status(200).json({ status: "OK" });
//     }

//     // Stripe 上から商品を取得(未登録なら null)
//     const productOrNull = await stripe.products
//       .retrieve(microCMSValue.id)
//       .catch(() => null);

//     // Stripe 上に商品情報が登録されているか？
//     const existsProductOnStripe = Boolean(productOrNull);

//     if (existsProductOnStripe) {
//       // Stripe 上に既に商品情報が登録済みなら更新する
//       await updateStripeProduct(microCMSValue);
//     } else {
//       // Stripe 上に商品情報が存在しないなら新規登録する
//       await createStripeProduct(microCMSValue);
//     }

//     return res.status(200).json({ status: "OK" });
//   } catch (error) {
//     return res.status(400).json({ message: "取得できませんでした" });
//   }
// }

// async function createStripeProduct(microCMSValue) {
//   const { id, name, description, images, priceJPY } = microCMSValue;
//   const imageURLs = images.map(({ image }) => image.url);

//   // 名前、簡易説明文、画像を Product に同期
//   await stripe.products.create({
//     id,
//     name,
//     description,
//     images: imageURLs,
//   });

//   // 新しい Price を作って Product に紐付け。これによって金額が同期されたことになる。
//   await stripe.prices.create({
//     currency: "JPY",
//     product: id,
//     unit_amount: priceJPY,
//   });
// }

// async function updateStripeProduct(microCMSValue) {
//   const { id, name, description, images, priceJPY } = microCMSValue;
//   const imageURLs = images.map(({ image }) => image.url);

//   // 名前、簡易説明文、画像を Product に同期
//   const product = await stripe.products.update(id, {
//     name,
//     description,
//     images: imageURLs,
//   });

//   // 利用可能な Price (アーカイブされていない Price) の一覧を取得。通常は1件のみ。
//   const prices = await stripe.prices.list({ active: true, product: product.id });

//   // Stripe 上の金額
//   const priceStripe = prices.data[0].unit_amount;

//   // microCMS 上の金額
//   const priceMicroCMS = priceJPY;

//   // Stripe と microCMS 上の金額が異なる場合のみ Price を更新
//   if (priceStripe !== priceMicroCMS) {
//     // 既存の Price を全てアーカイブ
//     await Promise.all(
//       prices.data.map((price) => {
//         return stripe.prices.update(price.id, { active: false });
//       })
//     );

//     // 新しい Price を作って Product に紐付け。これによって金額が更新されたことになる。
//     await stripe.prices.create({
//       currency: "JPY",
//       product: product.id,
//       unit_amount: priceJPY,
//     });
//   }
// }

// export default auth(readSingle);



// import connectDB from "@/utils/database";
// import { ItemModel } from "@/utils/schemeModels";
// import type { NextApiRequest, NextApiResponse } from "next";
// import auth from "../../../utils/auth";
// import type {
//   ResReadSingleType,
//   savedItemDataType,
// } from "../../../utils/types";

// async function readSingle(
//   req: NextApiRequest,
//   res: NextApiResponse<ResReadSingleType>
// ) {
//   try {
//     await connectDB();
//     console.log(req.query.id);
//     //findbyidで一つだけ持ってくる  query
//     const singleItem: savedItemDataType | null = await ItemModel.findById(
//       req.query.id
//     );
//     if (!singleItem)
//       return res
//         .status(400)
//         .json({ message: "アイテムが存在していため読み取り失敗" });
//     return res
//       .status(200)
//       .json({ message: "取得に成功しました", singleItem: singleItem });
//   } catch (error) {
//     return res.status(400).json({ message: "取得できませんでした" });
//   }
// }

// export default auth(readSingle);