import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const guestId = req.nextUrl.searchParams.get("id");

    if (!guestId) {
      return NextResponse.json({ error: "Missing guest ID" }, { status: 400 });
    }

    const apiKey = process.env.IACTA_API_KEY;

    const res = await fetch(
      `https://iacta.qubixvirtual.in/api/v1/guests/${guestId}`,
      {
        method: "GET",
        headers: {
          "X-IACTA-API-Key": apiKey!,
        },
      }
    );

    // ✅ FIX: handle JSON properly
    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json({
        status: res.status,
        error: errText,
      });
    }

    const data = await res.json();

    return NextResponse.json(data);

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}