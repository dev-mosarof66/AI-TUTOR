// //REQUEST

// import { NextResponse } from "next/server";
// import { dataConfig, sslConfig } from "../../../../components/sslConfig";

// export async function GET() {
//   let transactionId = "TEST-xyz";
//   const data = dataConfig({
//     total_amount: 256,
//     tran_id: transactionId,
//     success_url: `http://localhost:3000/api/payment/success?tran_id=${transactionId}`,
//     fail_url: "http://localhost:3000/api/payment/fail",
//     cancel_url: "http://localhost:3000/api/payment/cancel",
//     product_name: "Samsung Galaxy S23 ultra",
//     product_category: "mobile",
//     cus_name: "Kajol Roy",
//     cus_email: "shrikajol@gmail.com",
//     cus_add1: "Lalmonirhat",
//     cus_phone: "01705956055",
//   });
//   try {
//     const result: SSLResponse = await sslConfig.init(data);
//     // console.log(result);
//     if (!result.GatewayPageURL || result.status === "FAILED") {
//       return NextResponse.json({ message: result.failedreason });
//     } else if (result.status === "SUCCESS") {
//       // const newData = {
//       //   paid: false,
//       //   totalAmount: 256,
//       //   name: "Kajol",
//       //   address: "Lalmoni",
//       //   trans_id: transactionId,
//       // };
//       // mongoDB.payment.create(newData)
//       // Add new payment but ( paid: false )
//       // if redirect to success route then change ( paid: true ) in success route

//       return NextResponse.redirect(result.GatewayPageURL);
//     } 

//     // return new NextResponse(JSON.stringify(result));
//   } catch (error) {
//     return new NextResponse(JSON.stringify("Error: " + error));
//   }
// }

// export async function POST() {
//   return new NextResponse(JSON.stringify("This is a POST request"));
// }




// //SUCCESS 


// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   // const trans_id = req.nextUrl.searchParams.get("trans_id")
//   try {
//     // const findPayment= await MongoDB.findOne({trans_id})
//     // if(findPayment){
//     //   await findOneAndUpdate.payment.updateOne({trans_id,{
//     //     $set:{paid:true},
//     //   }})
//     // }

//     return new NextResponse(
//       JSON.stringify({
//         message: "Payment Successfully",
//       })
//     );
//   } catch (error) {
//     return new NextResponse(JSON.stringify(error));
//   }
// }


// //FAIL

// import { NextResponse } from "next/server";

// export async function GET(req: Request) {
//   const data = await req.json();
//   console.log(data);
//   return new NextResponse(JSON.stringify("GET: " + data));
// }
// export async function POST(req: Request) {
//   return new NextResponse(
//     JSON.stringify({
//       message: "Payment Failed",
//     })
//   );
// }

// //CANCEL


// import { NextResponse } from "next/server";

// export async function GET(req: Request) {
//   const data = await req.json();
//   console.log(data);
//   return new NextResponse(JSON.stringify("GET: " + data));
// }
// export async function POST(req: Request) {
//   return new NextResponse(
//     JSON.stringify({
//       message: "Payment Cenceled",
//     })
//   );
// }


// //CONFIG FILE


// import { SslCommerzPayment } from "sslcommerz";

// const store_id = process.env.STORE_ID;
// const store_passwd = process.env.STORE_PASSWORD;
// const is_live = false; //true for live, false for sandbox

// export const sslConfig = new SslCommerzPayment(store_id, store_passwd, is_live);

// interface Props {
//   total_amount: Number;
//   tran_id: string;
//   success_url: string;
//   fail_url: string;
//   cancel_url: string;
//   product_name: string;
//   product_category: string;
//   cus_name: string;
//   cus_email: string;
//   cus_add1: string;
//   cus_phone: string;
// }
// export const dataConfig = ({
//   total_amount,
//   tran_id,
//   success_url,
//   fail_url,
//   cancel_url,
//   product_name,
//   product_category,
//   cus_name,
//   cus_email,
//   cus_add1,
//   cus_phone,
// }: Props) => {
//   const data = {
//     total_amount,
//     tran_id, // use unique tran_id for each api call
//     currency: "BDT",
//     success_url,
//     fail_url,
//     cancel_url,
//     ipn_url: "http://localhost:3030/ipn",
//     shipping_method: "Courier",
//     product_name,
//     product_category,
//     product_profile: "general",
//     cus_name,
//     cus_email,
//     cus_add1,
//     cus_add2: "Dhaka",
//     cus_city: "Dhaka",
//     cus_state: "Dhaka",
//     cus_postcode: "1000",
//     cus_country: "Bangladesh",
//     cus_phone,
//     cus_fax: "01711111111",
//     ship_name: "Customer Name",
//     ship_add1: "Dhaka",
//     ship_add2: "Dhaka",
//     ship_city: "Dhaka",
//     ship_state: "Dhaka",
//     ship_postcode: 1000,
//     ship_country: "Bangladesh",
//   };
//   return data;
// };