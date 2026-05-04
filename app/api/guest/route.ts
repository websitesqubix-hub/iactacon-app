import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const guestId = req.nextUrl.searchParams.get("id");
    const apiKey = process.env.IACTA_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    if (!guestId) {
      return NextResponse.json({ error: "Missing guest ID" }, { status: 400 });
    }

    const res = await fetch(
      `https://iacta.qubixvirtual.in/api/v1/guests/${guestId}`,
      {
        method: "GET",
        headers: { "X-IACTA-API-Key": apiKey },
      }
    );

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: err }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}