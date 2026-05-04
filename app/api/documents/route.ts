import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const guestId = req.nextUrl.searchParams.get("id");
  const apiKey = process.env.IACTA_API_KEY;

  if (!guestId || !apiKey) {
    return NextResponse.json({ documents: [] });
  }

  try {
    const res = await fetch(
      `https://iacta.qubixvirtual.in/api/v1/guests/${guestId}/documents`,
      { headers: { "X-IACTA-API-Key": apiKey } }
    );

    if (!res.ok) return NextResponse.json({ documents: [] });

    const data = await res.json();
    return NextResponse.json({ documents: data.documents || [] });

  } catch {
    return NextResponse.json({ documents: [] });
  }
}