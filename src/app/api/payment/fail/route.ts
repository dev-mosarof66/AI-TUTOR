import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.formData();
    const tranId = body.get("tran_id");

    // Optionally, store in DB for record keeping
    // await Payment.update({ status: "FAILED" }, { where: { tranId } });

    return NextResponse.redirect(
      new URL(`${process.env.NEXT_PUBLIC_APP_URL}/pricing/failed/${tranId}`, req.url),
      303
    );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}
