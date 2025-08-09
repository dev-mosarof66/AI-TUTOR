
import { NextRequest, NextResponse } from "next/server";
import axios from 'axios'
export async function POST(req: NextRequest) {
  try {
    const body = await req.formData();
    const tranId = body.get("tran_id");
    const valId = body.get("val_id");

    const storeId = process.env.STORE_ID;
    const storePasswd = process.env.STORE_PASSWORD;
    const validationUrl = `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${valId}&store_id=${storeId}&store_passwd=${storePasswd}&format=json`


    const res = (await axios.get(validationUrl)).data;



    if (res.status !== 'VALID') {
      return NextResponse.redirect(
        new URL(`${process.env.NEXT_PUBLIC_APP_URL}/pricing/failed/${tranId}`, req.url),
        303
      );

    }

    const planName = res.tran_id.split('-')[0];



    const data = {
      date: res.tran_date,
      tran_id: res.tran_id,
      status: res.status,
      amount: res.amount,
      account: res.card_issuer,
      currentPlan: planName
    }

    console.log(data)



    return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_APP_URL}/pricing/success/${tranId}`, req.url), 303)


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ status: "error", message: error.message }, { status: 500 });
  }
}
