import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const BINANCE_API_KEY = process.env.BINANCE_API_KEY!;
const BINANCE_SECRET_KEY = process.env.BINANCE_SECRET_KEY!;
const BINANCE_BASE_URL = "https://fapi.binance.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      symbol,
      side,
      price,
      stopPrice,
      quantity,
      timeInForce = "GTC",
      workingType = "MARK_PRICE",
    } = body;

    const timestamp = Date.now();
    const params = new URLSearchParams({
      symbol,
      side,
      type: "STOP",
      price: price.toString(),
      stopPrice: stopPrice.toString(),
      quantity: quantity.toString(),
      timeInForce,
      workingType,
      timestamp: timestamp.toString(),
    });

    const signature = crypto
      .createHmac("sha256", BINANCE_SECRET_KEY)
      .update(params.toString())
      .digest("hex");

    const finalURL = `${BINANCE_BASE_URL}/fapi/v1/order?${params.toString()}&signature=${signature}`;

    const response = await fetch(finalURL, {
      method: "POST",
      headers: {
        "X-MBX-APIKEY": BINANCE_API_KEY,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: result }, { status: response.status });
    }

    return NextResponse.json({ success: true, result });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
